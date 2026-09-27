package jaider.jeyavila.admin;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/** Carga el administrador desde la base de datos para que Spring Security valide la contraseña. */
@Service
public class AdminDetallesServicio implements UserDetailsService {

	private final AdminUsuarioRepositorio repositorio;

	public AdminDetallesServicio(AdminUsuarioRepositorio repositorio) {
		this.repositorio = repositorio;
	}

	@Override
	public UserDetails loadUserByUsername(String email) {
		AdminUsuario admin = repositorio.findByEmailIgnoreCase(email.trim())
				.orElseThrow(() -> new UsernameNotFoundException("Credenciales inválidas"));
		return User.withUsername(admin.getEmail()).password(admin.getPasswordHash()).roles("ADMIN").build();
	}
}
