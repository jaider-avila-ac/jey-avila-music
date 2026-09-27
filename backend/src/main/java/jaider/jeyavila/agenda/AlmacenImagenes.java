package jaider.jeyavila.agenda;

import jaider.jeyavila.comun.SolicitudInvalidaException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.UUID;

/** Guarda las imágenes subidas desde el panel en {app.datos}/uploads y las publica en /uploads/. */
@Component
public class AlmacenImagenes {

	public static final String PREFIJO_PUBLICO = "/uploads/";

	private final Path carpeta;

	public AlmacenImagenes(@Value("${app.datos}") String datos) {
		this.carpeta = Path.of(datos, "uploads").toAbsolutePath().normalize();
		try {
			Files.createDirectories(carpeta);
		} catch (IOException e) {
			throw new UncheckedIOException("No se pudo crear la carpeta de imágenes " + carpeta, e);
		}
	}

	public Path getCarpeta() {
		return carpeta;
	}

	/** Guarda la imagen (solo JPG, PNG o WebP, verificado por su contenido) y devuelve su ruta pública. */
	public String guardar(MultipartFile archivo) {
		if (archivo == null || archivo.isEmpty()) {
			throw new SolicitudInvalidaException("Selecciona una imagen");
		}
		String extension;
		try (InputStream in = archivo.getInputStream()) {
			extension = extensionPorContenido(in.readNBytes(12));
		} catch (IOException e) {
			throw new SolicitudInvalidaException("No se pudo leer la imagen");
		}
		if (extension == null) {
			throw new SolicitudInvalidaException("La imagen debe ser JPG, PNG o WebP");
		}
		String nombre = UUID.randomUUID() + "." + extension;
		try {
			archivo.transferTo(carpeta.resolve(nombre));
		} catch (IOException e) {
			throw new UncheckedIOException("No se pudo guardar la imagen", e);
		}
		return PREFIJO_PUBLICO + nombre;
	}

	/** Borra una imagen subida antes (las iniciales de /img/ no se tocan). */
	public void borrar(String rutaPublica) {
		if (rutaPublica == null || !rutaPublica.startsWith(PREFIJO_PUBLICO)) return;
		Path archivo = carpeta.resolve(rutaPublica.substring(PREFIJO_PUBLICO.length())).normalize();
		if (!archivo.startsWith(carpeta)) return; // nunca fuera de la carpeta
		try {
			Files.deleteIfExists(archivo);
		} catch (IOException ignorada) {
			// Si no se puede borrar solo queda un archivo huérfano; no afecta al sitio
		}
	}

	private static String extensionPorContenido(byte[] b) {
		if (b.length >= 3 && (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 && (b[2] & 0xFF) == 0xFF) return "jpg";
		if (b.length >= 8 && Arrays.equals(Arrays.copyOf(b, 8), new byte[] {(byte) 0x89, 'P', 'N', 'G', '\r', '\n', 0x1A, '\n'})) return "png";
		if (b.length >= 12 && b[0] == 'R' && b[1] == 'I' && b[2] == 'F' && b[3] == 'F'
				&& b[8] == 'W' && b[9] == 'E' && b[10] == 'B' && b[11] == 'P') return "webp";
		return null;
	}
}
