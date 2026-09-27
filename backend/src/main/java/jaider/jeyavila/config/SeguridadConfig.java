package jaider.jeyavila.config;

import jaider.jeyavila.admin.AdminDetallesServicio;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/** Seguridad: el sitio y GET /api/agenda son públicos; todo /api/admin/** exige sesión de
 *  administrador. Sesión por cookie HttpOnly y protección CSRF (cookie JEY-XSRF + cabecera
 *  X-JEY-XSRF que envía el panel). */
@Configuration
public class SeguridadConfig {

	@Bean
	public SecurityFilterChain filtros(HttpSecurity http, SecurityContextRepository contextRepository) throws Exception {
		CookieCsrfTokenRepository csrfRepositorio = CookieCsrfTokenRepository.withHttpOnlyFalse();
		// Nombres propios: en un mismo dominio (o en localhost) otra aplicación puede tener su propia
		// cookie XSRF-TOKEN y el panel terminaría enviando la equivocada
		csrfRepositorio.setCookieName("JEY-XSRF");
		csrfRepositorio.setHeaderName("X-JEY-XSRF");
		csrfRepositorio.setCookieCustomizer(c -> c.path("/").sameSite("Lax"));
		CsrfTokenRequestAttributeHandler csrfManejador = new CsrfTokenRequestAttributeHandler();

		http
				.csrf(csrf -> csrf.csrfTokenRepository(csrfRepositorio).csrfTokenRequestHandler(csrfManejador))
				.addFilterAfter(new CookieCsrfFiltro(), BasicAuthenticationFilter.class)
				.securityContext(c -> c.securityContextRepository(contextRepository))
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/admin/login", "/api/admin/sesion").permitAll()
						.requestMatchers("/api/admin/**").hasRole("ADMIN")
						.anyRequest().permitAll())
				.exceptionHandling(e -> e
						.authenticationEntryPoint((req, res, ex) -> json(res, HttpStatus.UNAUTHORIZED, "Tu sesión terminó. Vuelve a entrar."))
						.accessDeniedHandler((req, res, ex) -> json(res, HttpStatus.FORBIDDEN, "La página se actualizó. Recarga e intenta de nuevo.")))
				.logout(l -> l
						.logoutUrl("/api/admin/logout")
						.deleteCookies("JEYSESION")
						.logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpStatus.NO_CONTENT.value())));
		return http.build();
	}

	@Bean
	public SecurityContextRepository securityContextRepository() {
		return new HttpSessionSecurityContextRepository();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}

	@Bean
	public AuthenticationManager authenticationManager(AdminDetallesServicio detalles, PasswordEncoder encoder) {
		DaoAuthenticationProvider proveedor = new DaoAuthenticationProvider(detalles);
		proveedor.setPasswordEncoder(encoder);
		return new ProviderManager(proveedor);
	}

	private static void json(HttpServletResponse res, HttpStatus estado, String mensaje) throws IOException {
		res.setStatus(estado.value());
		res.setContentType(MediaType.APPLICATION_JSON_VALUE);
		res.setCharacterEncoding("UTF-8");
		res.getWriter().write("{\"mensaje\":\"" + mensaje + "\"}");
	}

	/** Genera la cookie JEY-XSRF en cada respuesta (el token es diferido por defecto). */
	private static final class CookieCsrfFiltro extends OncePerRequestFilter {
		@Override
		protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
				throws ServletException, IOException {
			CsrfToken token = (CsrfToken) req.getAttribute(CsrfToken.class.getName());
			if (token != null) token.getToken();
			chain.doFilter(req, res);
		}
	}
}
