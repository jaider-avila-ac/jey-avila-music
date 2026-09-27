package jaider.jeyavila.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdminUsuarioRepositorio extends JpaRepository<AdminUsuario, Long> {

	Optional<AdminUsuario> findByEmailIgnoreCase(String email);

	List<AdminUsuario> findAllByEmailNotIgnoreCase(String email);
}
