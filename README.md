# CRUD de Usuarios con React y JSONPlaceholder

Este es un sistema de gestión de usuarios que permite listar, crear, editar y eliminar usuarios utilizando la API de JSONPlaceholder. También incluye una funcionalidad de autenticación para restringir acciones según el usuario autenticado.

## Características principales

- **Listar usuarios:** Obtiene y muestra una lista de usuarios desde la API de JSONPlaceholder.
- **Crear usuarios:** Permite agregar nuevos usuarios mediante un formulario con validaciones.
- **Editar usuarios:** Opción para modificar información de usuarios existentes con datos precargados en un formulario.
- **Eliminar usuarios:** Posibilidad de eliminar usuarios con confirmación previa.
- **Login y autenticación:** Implementación de una pantalla de inicio de sesión para acceder al sistema.
- **Búsqueda y filtrado:** Permite buscar usuarios por nombre o correo electrónico.
- **Validaciones:** Se verifica la validez de los datos ingresados en los formularios.
- **Control de permisos:** Los usuarios solo pueden editar y eliminar los registros que ellos mismos han creado.

---

## Instalación y configuración

### Prerrequisitos

Asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (Versión recomendada: 16+)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir la aplicación en el navegador:**
   Normalmente se ejecutará en `http://localhost:5173/`.

---

## Uso del sistema

### 1. Autenticación
- Al abrir la aplicación, se presentará una pantalla de inicio de sesión.
- Se debe ingresar un correo electrónico y una contraseña válidos (simulados en el sistema).
- Una vez autenticado, el usuario podrá acceder a la lista de usuarios.

Para acceder al sistema, puedes utilizar los siguientes usuarios de prueba:

| Usuario  | Email           | Contraseña |
|----------|-----------------|------------|
| user     | user@gmail.com  | 123        |
| user2    | user2@gmail.com | abc        |

### 2. Gestión de usuarios
- **Listado:** Se muestran los usuarios obtenidos de la API en una tabla con opciones para editar y eliminar.
- **Creación:** Al hacer clic en "Crear usuario", se abre un formulario para ingresar los datos del nuevo usuario.
- **Edición:** Al hacer clic en "Editar", se abre un formulario con los datos precargados para su modificación.
- **Eliminación:** Al hacer clic en "Eliminar", se muestra un cuadro de confirmación antes de proceder.
- **Búsqueda:** Se puede buscar usuarios por nombre o correo electrónico.

---

## API Utilizada

Base URL: `https://jsonplaceholder.typicode.com/users`

- **Obtener usuarios:** `GET /users`
- **Crear usuario:** `POST /users`
- **Actualizar usuario:** `PUT /users/:id`
- **Eliminar usuario:** `DELETE /users/:id`

---

## Funcionalidades implementadas

### Listar
- [✅] Obtener y mostrar una lista de usuarios desde el API.
- [✅] Presentar los datos en una tabla o lista.

### Crear
- [✅] Diseñar un formulario para agregar un nuevo usuario.
- [✅] Los campos deben incluir al menos: nombre y correo electrónico.
- [✅] Enviar los datos al API para crear un nuevo usuario.

### Editar
- [✅] Agregar un botón para editar un usuario existente.
- [✅] Mostrar los datos actuales en un formulario editable.
- [✅] Enviar los cambios al API para actualizar el usuario.

### Eliminar
- [✅] Agregar un botón para eliminar usuarios.
- [✅] Mostrar una confirmación antes de eliminar.
- [✅] Enviar la solicitud de eliminación al API.

### Login
- [✅] Crear una pantalla de inicio de sesión.
- [✅] Solicitar correo electrónico y contraseña para autenticar al usuario.
- [✅] Utilizar un endpoint de autenticación (puedes simularlo o usar un API real como Firebase).
- [✅] Al iniciar sesión correctamente, mostrar la pantalla principal con las funcionalidades del CRUD.
- [✅] Implementar un control básico de permisos (por ejemplo, un usuario solo puede editar y eliminar sus propios datos).

### Extras
- [✅] Validaciones en el formulario (por ejemplo, campos obligatorios, correo electrónico válido).
- [✅] Barra de búsqueda para filtrar usuarios por nombre o correo.
- [✅] Mostrar mensajes de error si falla alguna llamada al API.
- [ ] Diseñar la interfaz para que sea responsiva.

