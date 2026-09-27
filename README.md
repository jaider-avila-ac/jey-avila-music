# Jey Avila — Sitio web del artista

Sitio del cantante y compositor Jey Avila. Proyecto independiente, pensado para publicarse en su
propio subdominio. Desarrollado por Jaider Avila Studio (el sitio del estudio tiene la sección
`/artistas` con el enlace a este proyecto).

Todo es **un solo proyecto y una sola imagen Docker**: el frontend (React) se compila dentro de
Spring Boot, que además atiende la API de la agenda y el panel **`/jeyadmin`**.

- **Frontend**: React 18 + Vite · Tailwind CSS v3 · iconos `lucide-react` (raíz del proyecto)
- **Backend**: Spring Boot 3.5 · Java 21 · Spring Security · H2 en archivo (`backend/`)
- **Colores**: se definen solo en `tema.js`

## Panel de la agenda (`/jeyadmin`)

- No aparece en el menú ni en buscadores. Solo sirve para la agenda: agregar, editar y borrar
  fechas (fecha y lugar), y cambiar el título, el subtítulo y la imagen del afiche.
- Sin registro ni cambio de contraseña: el acceso se define con `ADMIN_EMAIL` y `ADMIN_PASSWORD`
  en el `.env` del servidor. La contraseña se guarda encriptada (BCrypt) en la base de datos.
  Cambiar cualquiera de los dos y reiniciar el contenedor actualiza el acceso (el correo anterior
  deja de funcionar).
- Seguridad: sesión por cookie HttpOnly (8 h), protección CSRF y bloqueo de 15 minutos tras 5
  intentos fallidos desde la misma IP (o 10 con el mismo correo).
- Las fotos se reducen en el navegador antes de subirse (máx. 1600 px) y el servidor solo acepta
  JPG, PNG o WebP verificando su contenido.
- La primera vez que arranca, la base de datos se carga con las 18 fechas del afiche
  "Agenda 2026". Después, todo se maneja desde el panel.

## Publicar en el VPS

Primera vez:

```bash
git clone <repositorio> jey-avila && cd jey-avila
cp .env.example .env        # y poner ADMIN_EMAIL, ADMIN_PASSWORD (mín. 10 caracteres), COOKIE_SEGURA=true
docker compose up -d --build
```

El contenedor queda en `127.0.0.1:8090` (variable `PUERTO`). En nginx, el subdominio apunta ahí:

```nginx
server {
    server_name jey.ejemplo.com;
    client_max_body_size 10m;
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Cada actualización: `git pull && docker compose up -d --build`.

La base de datos y las imágenes subidas viven en el volumen `jey-datos` (`/data` en el
contenedor), así que no se pierden al actualizar. Copia de seguridad:

```bash
docker run --rm -v jey-avila_jey-datos:/data -v "$PWD":/copia alpine tar czf /copia/jey-datos.tgz -C /data .
```

## Desarrollo local

```bash
# Backend (API en :8080; guarda los datos en backend/datos)
cd backend
ADMIN_EMAIL=correo@ejemplo.com ADMIN_PASSWORD=unaclavelarga ./mvnw spring-boot:run

# Frontend (en otra terminal; :5178 reenvía /api y /uploads al backend)
npm install && npm run dev
```

## Estructura

```
src/                 frontend
  components/        layout (Navbar, Footer, Cursor, BotonArriba) y ui (secciones reutilizables)
  data/              contenido del sitio: artista.js, musica.js, contenido.js
  hooks/             useVisible, useParalaje, useFocoTactil, useAgenda
  utils/             seo, api (cliente de la API con CSRF), redimensionar
  modules/           inicio, musica, videos, historia, agenda, contrataciones, admin, error
backend/             Spring Boot
  agenda/            fechas y afiche (entidades, servicio, API, imágenes subidas)
  admin/             usuario del panel, inicio de sesión, límite de intentos
  config/            seguridad, archivos estáticos, carga inicial
public/              img/ y video/ del sitio
Dockerfile           compila frontend + backend en una sola imagen
docker-compose.yml   servicio y volumen de datos
```

## Pendiente

- Más colaboraciones en `COLABORACIONES` (`src/data/contenido.js`).
- Contacto de Guachy Records (`PRODUCTOR.contacto`) para el botón "Contáctanos hoy".
- Confirmar la cifra de reproducciones de "Hijo de mi vida" (el texto original dice
  "900 mil millones", que no es posible; por eso el sitio solo menciona los 41 países).
