# Proyecto Vue.js + Node.js

Este proyecto es una aplicación de administración de clientes utilizando Vue.js para el frontend y Node.js para el backend con MySQL como base de datos. 

## Requisitos

- Node.js (version 16 o superior recomendada)
- MySQL (o compatible)

## Instalación

### Backend (Node.js)

1. Navega a la carpeta del backend (`API`):

    ```bash
    cd API
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea la base de datos:

    Asegúrate de tener una base de datos MySQL creada. Puedes usar el siguiente comando para crear una base de datos llamada `customer_db` (ajusta el nombre según sea necesario):

    ```sql
    CREATE DATABASE customer_db;
    ```

4. Aplica las migraciones para crear las tablas necesarias. Ejecuta el siguiente comando:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Inicia el servidor:

    ```bash
    node app.js
    ```

    El servidor debería estar corriendo en `http://localhost:3000`.

### Frontend (Vue.js)

1. Navega a la carpeta del frontend (`Vue`):

    ```bash
    cd Vue
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia la aplicación Vue.js:

    ```bash
    npm run serve
    ```

    La aplicación debería estar corriendo en `http://localhost:8080`.

## Estructura del Proyecto

- `API/`: Contiene el código para el backend (Node.js) y la API.
  - `config/`: Configuración de la base de datos.
  - `middleware/`: Autenticación con JWT.
  - `migrations/`: Migraciones de la base de datos.
  - `models/`: Modelos de Sequelize.
  - `routes/`: Definición de rutas de la API.
  - `app.js`: Archivo principal para iniciar el servidor.

- `Vue/`: Contiene el código para el frontend (Vue.js).
  - `src/components/`: Componentes Vue.js.
  - `src/services/`: Servicios para manejar la comunicación con la API.
  - `src/router/`: Configuración de rutas para Vue Router.
  - `src/App.vue`: Componente raíz de la aplicación Vue.js.
  - `src/main.js`: Archivo principal para crear la aplicación Vue.js.

## Notas

- Asegúrate de que el servidor de la API y la aplicación Vue.js estén corriendo simultáneamente para que el frontend pueda comunicarse con el backend.
- No se utiliza un archivo `.env` para la configuración del proyecto. En lugar de ello, la configuración de la base de datos debe ser realizada directamente en el código del backend.


