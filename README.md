¡Perfecto! Aquí tienes una guía para el archivo README que incluye instrucciones de instalación, configuración y ejecución para que cualquier persona pueda ejecutar tu proyecto localmente. 

---

# Proyecto de Notas

Este proyecto es una aplicación de notas que permite a los usuarios registrarse, iniciar sesión, crear, buscar, editar y eliminar notas. La aplicación está dividida en un frontend y un backend que se ejecutan de forma independiente.

## Requisitos

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (v14 o superior)
- **NPM** o **Yarn**

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 2. Instalar dependencias

Instala las dependencias tanto para el frontend como para el backend.

```bash
npm install
```

### 3. Crear el archivo `.env`

En la raíz del proyecto, crea un archivo `.env` y configura las siguientes variables de entorno:

```plaintext
PORT=5000
MONGO_URI=mongodb://mongo:qyPZYleOnSgQUWIYSDwMAUKDPJCdcEsd@autorack.proxy.rlwy.net:33016
JWT_SECRET=f6342acb75f
```

- **PORT**: El puerto en el que se ejecutará el backend.
- **MONGO_URI**: La URI de conexión para la base de datos MongoDB.
- **JWT_SECRET**: La clave secreta utilizada para firmar y verificar los tokens de autenticación JWT.

### 4. Iniciar la aplicación

Para ejecutar el frontend y el backend, abre dos terminales y ejecuta los siguientes comandos:

#### Terminal 1 - Backend

```bash
npm run dev
```

Este comando ejecutará el backend utilizando `nodemon`, lo que permite una recarga automática cuando se realizan cambios en el código del servidor.

#### Terminal 2 - Frontend

```bash
npm run dev:src
```

Este comando ejecutará el frontend en modo de desarrollo, utilizando React.

### 5. Uso de la aplicación

Una vez que el frontend y el backend están ejecutándose:

- **Frontend**: Accede a `http://localhost:5173` en tu navegador para ver la interfaz de la aplicación.
- **Backend**: El backend estará corriendo en `http://localhost:5000`.

## Funcionalidades

- **Registro e inicio de sesión de usuario**.
- **Crear, editar y eliminar notas**.
- **Buscar notas**.
- **Autenticación y autorización** mediante tokens JWT.
  
## Endpoints del backend

Los principales endpoints de la API están disponibles en `http://localhost:5000` y se documentan brevemente a continuación:

- **POST** `/auth/register`: Crear un nuevo usuario.
- **POST** `/auth/login`: Iniciar sesión y obtener un token JWT.
- **GET** `/notes`: Obtener todas las notas del usuario autenticado.
- **POST** `/notes`: Crear una nueva nota.
- **PUT** `/notes/:id`: Actualizar una nota existente.
- **DELETE** `/notes/:id`: Eliminar una nota existente.

## Dependencias principales

### Backend
- **Express**: Para crear la API REST.
- **Mongoose**: Para interactuar con MongoDB.
- **jsonwebtoken**: Para la generación y verificación de tokens de autenticación.
- **JS**: Como lenguaje principal de la aplicacion.

### Frontend
- **React**: Para la creación de la interfaz de usuario.
- **React Router**: Para manejar la navegación de la aplicación.

---

