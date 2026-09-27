package jaider.jeyavila.agenda;

import jaider.jeyavila.agenda.AgendaDtos.AgendaRespuesta;
import jaider.jeyavila.agenda.AgendaDtos.FechaRespuesta;
import jaider.jeyavila.agenda.AgendaDtos.FechaSolicitud;
import jaider.jeyavila.agenda.AgendaDtos.TextosSolicitud;
import jaider.jeyavila.comun.NoEncontradoException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AgendaServicio {

	private final FechaAgendaRepositorio fechas;
	private final ConfigAgendaRepositorio configs;
	private final AlmacenImagenes imagenes;

	public AgendaServicio(FechaAgendaRepositorio fechas, ConfigAgendaRepositorio configs, AlmacenImagenes imagenes) {
		this.fechas = fechas;
		this.configs = configs;
		this.imagenes = imagenes;
	}

	@Transactional(readOnly = true)
	public AgendaRespuesta obtener() {
		ConfigAgenda c = config();
		return new AgendaRespuesta(c.getTitulo(), c.getSubtitulo(), c.getImagen(),
				fechas.findAllByOrderByFechaAscIdAsc().stream().map(FechaRespuesta::de).toList());
	}

	@Transactional
	public FechaRespuesta crearFecha(FechaSolicitud s) {
		return FechaRespuesta.de(fechas.save(new FechaAgenda(s.fecha(), s.municipio())));
	}

	@Transactional
	public FechaRespuesta actualizarFecha(Long id, FechaSolicitud s) {
		FechaAgenda f = fechas.findById(id).orElseThrow(() -> new NoEncontradoException("La fecha no existe"));
		f.actualizar(s.fecha(), s.municipio());
		return FechaRespuesta.de(f);
	}

	@Transactional
	public void borrarFecha(Long id) {
		if (!fechas.existsById(id)) throw new NoEncontradoException("La fecha no existe");
		fechas.deleteById(id);
	}

	@Transactional
	public AgendaRespuesta cambiarTextos(TextosSolicitud s) {
		config().cambiarTextos(s.titulo(), s.subtitulo());
		return obtener();
	}

	@Transactional
	public AgendaRespuesta cambiarImagen(MultipartFile archivo) {
		ConfigAgenda c = config();
		String anterior = c.getImagen();
		c.cambiarImagen(imagenes.guardar(archivo));
		// La imagen anterior se borra solo cuando el cambio ya quedó guardado
		TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
			@Override
			public void afterCommit() {
				imagenes.borrar(anterior);
			}
		});
		return obtener();
	}

	private ConfigAgenda config() {
		return configs.findById(ConfigAgenda.ID)
				.orElseThrow(() -> new IllegalStateException("Falta la configuración de la agenda"));
	}
}
