# Una sola imagen con todo el sitio: el frontend (React) compilado dentro de Spring Boot,
# que además atiende la API de la agenda y el panel /jeyadmin.

# ── Etapa 1: frontend ─────────────────────────────────────────────────────────
FROM node:20-alpine AS web
WORKDIR /web
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.js tailwind.config.js postcss.config.js tema.js ./
COPY public ./public
COPY src ./src
RUN npm run build

# ── Etapa 2: backend (con el frontend como archivos estáticos) ───────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn -B dependency:go-offline -q
COPY backend/src ./src
COPY --from=web /web/dist ./src/main/resources/static
RUN mvn -B package -DskipTests -q

# ── Etapa 3: ejecución ────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre
WORKDIR /app
RUN useradd --system --uid 1001 jey && mkdir -p /data && chown jey /data
COPY --from=build /app/target/*.jar app.jar
USER jey
ENV APP_DATOS=/data
VOLUME /data
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
