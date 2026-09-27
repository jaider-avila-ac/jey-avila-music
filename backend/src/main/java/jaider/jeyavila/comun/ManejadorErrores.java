package jaider.jeyavila.comun;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Map;

/** Errores de la API en formato { "mensaje": "..." }, listos para mostrarse en el panel. */
@RestControllerAdvice
public class ManejadorErrores {

	private static final Logger log = LoggerFactory.getLogger(ManejadorErrores.class);

	@ExceptionHandler(SolicitudInvalidaException.class)
	public ResponseEntity<Map<String, String>> invalida(SolicitudInvalidaException e) {
		return respuesta(HttpStatus.BAD_REQUEST, e.getMessage());
	}

	@ExceptionHandler(NoEncontradoException.class)
	public ResponseEntity<Map<String, String>> noEncontrado(NoEncontradoException e) {
		return respuesta(HttpStatus.NOT_FOUND, e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> validacion(MethodArgumentNotValidException e) {
		String mensaje = e.getBindingResult().getFieldErrors().stream()
				.findFirst().map(f -> f.getDefaultMessage()).orElse("Datos inválidos");
		return respuesta(HttpStatus.BAD_REQUEST, mensaje);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<Map<String, String>> ilegible(HttpMessageNotReadableException e) {
		return respuesta(HttpStatus.BAD_REQUEST, "Revisa los datos: hay un valor con formato incorrecto");
	}

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<Map<String, String>> muyGrande(MaxUploadSizeExceededException e) {
		return respuesta(HttpStatus.PAYLOAD_TOO_LARGE, "La imagen pesa demasiado (máximo 8 MB)");
	}

	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<Map<String, String>> sinRecurso(NoResourceFoundException e) {
		return respuesta(HttpStatus.NOT_FOUND, "No encontrado");
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<Map<String, String>> metodo(HttpRequestMethodNotSupportedException e) {
		return respuesta(HttpStatus.METHOD_NOT_ALLOWED, "Operación no permitida");
	}

	@ExceptionHandler({MissingServletRequestPartException.class, MissingServletRequestParameterException.class,
			MethodArgumentTypeMismatchException.class})
	public ResponseEntity<Map<String, String>> incompleta(Exception e) {
		return respuesta(HttpStatus.BAD_REQUEST, "Faltan datos o tienen un formato incorrecto");
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, String>> inesperado(Exception e) {
		log.error("Error inesperado", e);
		return respuesta(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrió un error. Intenta de nuevo.");
	}

	private static ResponseEntity<Map<String, String>> respuesta(HttpStatus estado, String mensaje) {
		return ResponseEntity.status(estado).body(Map.of("mensaje", mensaje));
	}
}
