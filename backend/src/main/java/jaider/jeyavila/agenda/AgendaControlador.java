package jaider.jeyavila.agenda;

import jaider.jeyavila.agenda.AgendaDtos.AgendaRespuesta;
import jaider.jeyavila.agenda.AgendaDtos.FechaRespuesta;
import jaider.jeyavila.agenda.AgendaDtos.FechaSolicitud;
import jaider.jeyavila.agenda.AgendaDtos.TextosSolicitud;
import jakarta.validation.Valid;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/** API de la agenda: lectura pública y edición solo con sesión de administrador (/api/admin/**). */
@RestController
public class AgendaControlador {

	private final AgendaServicio servicio;

	public AgendaControlador(AgendaServicio servicio) {
		this.servicio = servicio;
	}

	@GetMapping("/api/agenda")
	public ResponseEntity<AgendaRespuesta> publica() {
		// Sin caché: un cambio hecho en el panel se ve de inmediato en el sitio
		return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(servicio.obtener());
	}

	@GetMapping("/api/admin/agenda")
	public AgendaRespuesta admin() {
		return servicio.obtener();
	}

	@PostMapping("/api/admin/agenda/fechas")
	@ResponseStatus(HttpStatus.CREATED)
	public FechaRespuesta crear(@Valid @RequestBody FechaSolicitud s) {
		return servicio.crearFecha(s);
	}

	@PutMapping("/api/admin/agenda/fechas/{id}")
	public FechaRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody FechaSolicitud s) {
		return servicio.actualizarFecha(id, s);
	}

	@DeleteMapping("/api/admin/agenda/fechas/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void borrar(@PathVariable Long id) {
		servicio.borrarFecha(id);
	}

	@PutMapping("/api/admin/agenda/textos")
	public AgendaRespuesta textos(@Valid @RequestBody TextosSolicitud s) {
		return servicio.cambiarTextos(s);
	}

	@PostMapping("/api/admin/agenda/imagen")
	public AgendaRespuesta imagen(@RequestParam("imagen") MultipartFile imagen) {
		return servicio.cambiarImagen(imagen);
	}
}
