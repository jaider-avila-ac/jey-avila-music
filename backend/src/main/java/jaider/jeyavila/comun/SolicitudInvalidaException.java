package jaider.jeyavila.comun;

/** Datos enviados que no se pueden aceptar (400). El mensaje se muestra tal cual en el panel. */
public class SolicitudInvalidaException extends RuntimeException {

	public SolicitudInvalidaException(String mensaje) {
		super(mensaje);
	}
}
