package jaider.jeyavila.agenda;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FechaAgendaRepositorio extends JpaRepository<FechaAgenda, Long> {

	List<FechaAgenda> findAllByOrderByFechaAscIdAsc();
}
