package jaider.jeyavila.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** Inicio de sesión del panel. No hay registro ni cambio de contraseña: el acceso se define en
 *  las variables ADMIN_EMAIL y ADMIN_PASSWORD del servidor. El cierre de sesión lo atiende
 *  Spring Security en POST /api/admin/logout. */
@RestController
public class AuthControlador {

	public record LoginSolicitud(
			@NotBlank(message = "Escribe tu correo") @Size(max = 120) String email,
			@NotBlank(message = "Escribe tu contraseña") @Size(max = 200) String password) {
	}

	private final AuthenticationManager authenticationManager;
	private final SecurityContextRepository contextRepository;
	private final LimitadorIntentos limitador;

	public AuthControlador(AuthenticationManager authenticationManager, SecurityContextRepository contextRepository,
			LimitadorIntentos limitador) {
		this.authenticationManager = authenticationManager;
		this.contextRepository = contextRepository;
		this.limitador = limitador;
	}

	/** Estado de la sesión. De paso deja lista la cookie XSRF-TOKEN que el panel envía en cada cambio. */
	@GetMapping("/api/admin/sesion")
	public Map<String, Object> sesion(Authentication auth) {
		boolean dentro = auth != null && auth.isAuthenticated() && auth.getAuthorities().stream()
				.anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
		return dentro ? Map.of("autenticado", true, "email", auth.getName()) : Map.of("autenticado", false);
	}

	@PostMapping("/api/admin/login")
	public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginSolicitud s,
			HttpServletRequest request, HttpServletResponse response) {
		String ip = request.getRemoteAddr();
		long espera = limitador.minutosBloqueado(ip, s.email());
		if (espera > 0) {
			return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
					.body(Map.of("mensaje", "Demasiados intentos. Espera " + espera + " min y vuelve a intentar."));
		}

		Authentication auth;
		try {
			auth = authenticationManager.authenticate(
					UsernamePasswordAuthenticationToken.unauthenticated(s.email().trim(), s.password()));
		} catch (AuthenticationException e) {
			limitador.fallo(ip, s.email());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("mensaje", "Correo o contraseña incorrectos"));
		}
		limitador.exito(ip, s.email());

		// Sesión nueva al entrar (evita reutilizar un identificador de sesión anterior)
		HttpSession anterior = request.getSession(false);
		if (anterior != null) anterior.invalidate();
		request.getSession(true);

		SecurityContext contexto = SecurityContextHolder.createEmptyContext();
		contexto.setAuthentication(auth);
		SecurityContextHolder.setContext(contexto);
		contextRepository.saveContext(contexto, request, response);

		return ResponseEntity.ok(Map.of("autenticado", true, "email", auth.getName()));
	}
}
