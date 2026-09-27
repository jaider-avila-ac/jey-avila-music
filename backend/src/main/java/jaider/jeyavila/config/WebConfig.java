package jaider.jeyavila.config;

import jaider.jeyavila.agenda.AlmacenImagenes;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.time.Duration;

/** Sirve el frontend compilado (React) desde el mismo proyecto y las imágenes subidas. */
@Configuration
public class WebConfig implements WebMvcConfigurer {

	private static final Resource INDEX = new ClassPathResource("/static/index.html");

	private final AlmacenImagenes imagenes;

	public WebConfig(AlmacenImagenes imagenes) {
		this.imagenes = imagenes;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// Imágenes subidas desde el panel: nombre único, nunca cambian
		registry.addResourceHandler(AlmacenImagenes.PREFIJO_PUBLICO + "**")
				.addResourceLocations(imagenes.getCarpeta().toUri().toString())
				.setCacheControl(CacheControl.maxAge(Duration.ofDays(365)).cachePublic());

		// JS y CSS con hash en el nombre: caché larga
		registry.addResourceHandler("/assets/**")
				.addResourceLocations("classpath:/static/assets/")
				.setCacheControl(CacheControl.maxAge(Duration.ofDays(365)).cachePublic());

		// Fotos y videos del sitio
		registry.addResourceHandler("/img/**", "/video/**")
				.addResourceLocations("classpath:/static/img/", "classpath:/static/video/")
				.setCacheControl(CacheControl.maxAge(Duration.ofDays(7)).cachePublic());

		// Resto: archivos de la raíz y, para las rutas de React (/musica, /jeyadmin...), index.html
		registry.addResourceHandler("/**")
				.addResourceLocations("classpath:/static/")
				.setCacheControl(CacheControl.noCache())
				.resourceChain(true)
				.addResolver(new PathResourceResolver() {
					@Override
					protected Resource getResource(String ruta, Resource ubicacion) throws IOException {
						Resource archivo = ubicacion.createRelative(ruta);
						if (archivo.exists() && archivo.isReadable()) return archivo;
						// Una API o un archivo que no existe responde 404 (no la página del sitio)
						if (ruta.startsWith("api/") || ruta.contains(".")) return null;
						return INDEX.exists() ? INDEX : null;
					}
				});
	}
}
