package jaider.jeyavila.agenda;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

/** Una presentación confirmada (fecha ocupada) de la agenda. */
@Entity
@Table(name = "fecha_agenda")
public class FechaAgenda {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDate fecha;

	@Column(nullable = false, length = 80)
	private String municipio;

	protected FechaAgenda() {
	}

	public FechaAgenda(LocalDate fecha, String municipio) {
		actualizar(fecha, municipio);
	}

	public void actualizar(LocalDate fecha, String municipio) {
		this.fecha = fecha;
		this.municipio = municipio.trim();
	}

	public Long getId() { return id; }
	public LocalDate getFecha() { return fecha; }
	public String getMunicipio() { return municipio; }
}
