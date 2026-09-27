package jaider.jeyavila.agenda;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

/** Datos que entran y salen de la API de la agenda. */
public final class AgendaDtos {

	private AgendaDtos() {
	}

	public record FechaRespuesta(Long id, LocalDate fecha, String municipio) {
		static FechaRespuesta de(FechaAgenda f) {
			return new FechaRespuesta(f.getId(), f.getFecha(), f.getMunicipio());
		}
	}

	public record AgendaRespuesta(String titulo, String subtitulo, String imagen, List<FechaRespuesta> fechas) {
	}

	public record FechaSolicitud(
			@NotNull(message = "La fecha es obligatoria") LocalDate fecha,
			@NotBlank(message = "El lugar es obligatorio") @Size(max = 80, message = "El lugar es muy largo") String municipio) {
	}

	public record TextosSolicitud(
			@NotBlank(message = "El título es obligatorio") @Size(max = 40, message = "El título es muy largo") String titulo,
			@NotBlank(message = "El subtítulo es obligatorio") @Size(max = 60, message = "El subtítulo es muy largo") String subtitulo) {
	}
}
