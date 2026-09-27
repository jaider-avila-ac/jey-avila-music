package jaider.jeyavila.config;

import jaider.jeyavila.admin.AdminUsuario;
import jaider.jeyavila.admin.AdminUsuarioRepositorio;
import jaider.jeyavila.agenda.ConfigAgenda;
import jaider.jeyavila.agenda.ConfigAgendaRepositorio;
import jaider.jeyavila.agenda.FechaAgenda;
import jaider.jeyavila.agenda.FechaAgendaRepositorio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/** Al arrancar: deja el administrador igual a ADMIN_EMAIL / ADMIN_PASSWORD y, la primera vez,
 *  carga la agenda con sus textos, su imagen y las fechas del afiche "Agenda 2026". */
@Component
public class InicializadorDatos implements ApplicationRunner {

	private static final Logger log = LoggerFactory.getLogger(InicializadorDatos.class);
	private static final int PASSWORD_MINIMO = 10;

	private final AdminUsuarioRepositorio admins;
	private final ConfigAgendaRepositorio configs;
	private final FechaAgendaRepositorio fechas;
	private final PasswordEncoder encoder;
	private final String adminEmail;
	private final String adminPassword;

	public InicializadorDatos(AdminUsuarioRepositorio admins, ConfigAgendaRepositorio configs, FechaAgendaRepositorio fechas,
			PasswordEncoder encoder, @Value("${app.admin.email}") String adminEmail, @Value("${app.admin.password}") String adminPassword) {
		this.admins = admins;
		this.configs = configs;
		this.fechas = fechas;
		this.encoder = encoder;
		this.adminEmail = adminEmail.trim();
		this.adminPassword = adminPassword;
	}

	@Override
	@Transactional
	public void run(ApplicationArguments args) {
		prepararAdmin();
		prepararAgenda();
	}

	/** Un solo administrador: el de las variables de entorno. Si el correo cambia, el anterior deja de tener acceso. */
	private void prepararAdmin() {
		if (adminEmail.isEmpty() || adminPassword.isEmpty()) {
			if (admins.count() == 0) log.warn("Panel /jeyadmin sin usuario: define ADMIN_EMAIL y ADMIN_PASSWORD.");
			return;
		}
		if (adminPassword.length() < PASSWORD_MINIMO) {
			throw new IllegalStateException("ADMIN_PASSWORD debe tener al menos " + PASSWORD_MINIMO + " caracteres");
		}
		admins.deleteAll(admins.findAllByEmailNotIgnoreCase(adminEmail));
		admins.findByEmailIgnoreCase(adminEmail).ifPresentOrElse(
				admin -> {
					if (!encoder.matches(adminPassword, admin.getPasswordHash())) {
						admin.cambiarPasswordHash(encoder.encode(adminPassword));
						log.info("Contraseña del panel actualizada");
					}
				},
				() -> {
					admins.save(new AdminUsuario(adminEmail, encoder.encode(adminPassword)));
					log.info("Usuario del panel creado: {}", adminEmail);
				});
	}

	/** Solo la primera vez (base de datos vacía). Después, todo se maneja desde el panel. */
	private void prepararAgenda() {
		if (configs.existsById(ConfigAgenda.ID)) return;
		configs.save(new ConfigAgenda("Agenda", "Champeta cristiana", "/img/tarima-brazo-arriba.webp"));
		fechas.saveAll(List.of(
				fecha("2026-01-16", "Sincelejo"),
				fecha("2026-01-24", "Sincelejo"),
				fecha("2026-01-31", "Urabá"),
				fecha("2026-02-21", "Santander"),
				fecha("2026-03-14", "Sincelejo"),
				fecha("2026-04-18", "Lorica"),
				fecha("2026-04-25", "Cartagena"),
				fecha("2026-05-01", "Cispatá"),
				fecha("2026-05-03", "Mirian Pardo"),
				fecha("2026-05-16", "San Isidro"),
				fecha("2026-06-11", "San Onofre"),
				fecha("2026-06-27", "Puerto Libertador"),
				fecha("2026-06-29", "Porvenir"),
				fecha("2026-07-26", "Montería"),
				fecha("2026-08-08", "Montería"),
				fecha("2026-09-13", "Montería"),
				fecha("2026-10-18", "Lorica"),
				fecha("2026-11-29", "Gallera")));
		log.info("Agenda inicial cargada");
	}

	private static FechaAgenda fecha(String dia, String municipio) {
		return new FechaAgenda(LocalDate.parse(dia), municipio);
	}
}
