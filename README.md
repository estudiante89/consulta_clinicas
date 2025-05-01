
# Proyecto de Gestión Clínica con Docker

Este proyecto incluye dos aplicaciones:
- **Backend (Nest.js)**: Servidor que maneja la lógica de negocio.
- **Frontend (Angular)**: Aplicación cliente para interactuar con el sistema.

## Requisitos

- Docker
- Docker Compose

## Instrucciones para ejecutar el proyecto

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. Construye y ejecuta ambos contenedores:
   ```bash
   docker-compose -f backend/docker-compose.yml up --build
   docker-compose -f frontend/docker-compose.yml up --build
   ```

3. Accede a:
   - **Backend**: http://localhost:3000
   - **Frontend**: http://localhost:4200
   