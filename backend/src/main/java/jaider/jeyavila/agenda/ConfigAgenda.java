package jaider.jeyavila.agenda;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Textos e imagen del afiche de la agenda. Es una sola fila (id = 1). */
@Entity
@Table(name = "config_agenda")
public class ConfigAgenda {

	public static final long ID = 1L;

	@Id
	private Long id = ID;

	/** Palabra grande del afiche ("Agenda"); el año se agrega solo en el frontend. */
	@Column(nullable = false, length = 40)
	private String titulo;

	/** Línea sobre las fechas ("Champeta cristiana"). */
	@Column(nullable = false, length = 60)
	private String subtitulo;

	/** Ruta pública de la imagen: /img/... (la inicial) o /uploads/... (subida desde el panel). */
	@Column(nullable = false, length = 200)
	private String imagen;

	protected ConfigAgenda() {
	}

	public ConfigAgenda(String titulo, String subtitulo, String imagen) {
		this.titulo = titulo;
		this.subtitulo = subtitulo;
		this.imagen = imagen;
	}

	public void cambiarTextos(String titulo, String subtitulo) {
		this.titulo = titulo.trim();
		this.subtitulo = subtitulo.trim();
	}

	public void cambiarImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getTitulo() { return titulo; }
	public String getSubtitulo() { return subtitulo; }
	public String getImagen() { return imagen; }
}
