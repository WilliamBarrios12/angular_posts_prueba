
# Prueba Tecnica Angular - Posts

Este proyecto es una aplicación Angular que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre posts. Utiliza la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para obtener datos de ejemplo y maneja posts creados localmente en memoria.

## Funcionalidades

- Listar los 10 primeros posts.
- Crear un nuevo post con ID único en memoria.
- Ver detalles de un post.
- Editar un post existente.
- Eliminar un post.
- Validación de formularios para título, cuerpo y usuario.

## Tecnologías

- Angular (standalone components)
- TypeScript
- HTML / CSS
- JSONPlaceholder API
- RxJS

## Cómo ejecutar

1. Clonar el repositorio:
   git clone https://github.com/usuario/nombre-repo.git
   cd nombre-repo

2. Instalar dependencias:
    npm install

3. Ejecutar la app:
    ng serve

4. Abrir en el navegador: http://localhost:4200/

Estructura principal
app.component.* → Contenedor principal y navegación.

list.component.* → Lista de posts con opciones Ver, Editar y Eliminar.

form.component.* → Formulario para crear o editar posts.

posts.service.ts → Servicio para manejar posts locales y de la API.

👨‍💻 Desarrollado por

William Barrios Rivera
Estudiante de Ingeniería de Sistemas