package jaider.jeyavila.admin;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/** Frena los intentos de adivinar la contraseña: tras varios fallos seguidos, la IP y el correo
 *  quedan bloqueados un tiempo. Se lleva en memoria (basta para un solo contenedor). */
@Component
public class LimitadorIntentos {

	private static final int MAX_FALLOS_IP = 5;
	private static final int MAX_FALLOS_EMAIL = 10;
	private static final Duration BLOQUEO = Duration.ofMinutes(15);

	private record Registro(int fallos, Instant ultimo) {
	}

	private final Map<String, Registro> registros = new ConcurrentHashMap<>();

	/** Minutos que faltan de bloqueo, o 0 si puede intentar. */
	public long minutosBloqueado(String ip, String email) {
		return Math.max(restante("ip:" + ip, MAX_FALLOS_IP), restante("email:" + normalizar(email), MAX_FALLOS_EMAIL));
	}

	public void fallo(String ip, String email) {
		sumar("ip:" + ip);
		sumar("email:" + normalizar(email));
	}

	public void exito(String ip, String email) {
		registros.remove("ip:" + ip);
		registros.remove("email:" + normalizar(email));
	}

	private long restante(String clave, int maximo) {
		Registro r = registros.get(clave);
		if (r == null || r.fallos() < maximo) return 0;
		Duration falta = Duration.between(Instant.now(), r.ultimo().plus(BLOQUEO));
		if (falta.isNegative() || falta.isZero()) {
			registros.remove(clave);
			return 0;
		}
		return Math.max(1, (falta.toSeconds() + 59) / 60);
	}

	private void sumar(String clave) {
		Instant ahora = Instant.now();
		// Limpieza para que el mapa no crezca sin fin con registros viejos
		if (registros.size() > 10_000) registros.values().removeIf(r -> r.ultimo().plus(BLOQUEO).isBefore(ahora));
		registros.merge(clave, new Registro(1, ahora), (a, b) ->
				// Un fallo después de un bloqueo ya vencido vuelve a empezar la cuenta
				a.ultimo().plus(BLOQUEO).isBefore(ahora) ? new Registro(1, ahora) : new Registro(a.fallos() + 1, ahora));
	}

	private static String normalizar(String email) {
		return email == null ? "" : email.trim().toLowerCase();
	}
}
