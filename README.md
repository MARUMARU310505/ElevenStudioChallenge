# **Eleven Studio Challenge** by Marcos Pacheco



**Epic Gaming** es una aplicación web que permite a los usuarios buscar videojuegos y explorar sus características, como fecha de lanzamiento, género, clasificación, entre otros. Los usuarios pueden guardar sus juegos favoritos y acceder a ellos desde cualquier dispositivo, sin necesidad de una cuenta.

---

## **Índice**

1. [Introducción](#introducción)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Código](#Estructura-del-Código)
5. [Lógica de la Aplicación](#Lógica-de-la-Aplicación)
6. [Funciones de cada página](#Funciones-de-cada-página)
7. [Descripción del Código](#Descripción-del-Código)
8. [Instalación y Configuración](#instalación-y-configuración)


---

## **Introducción**

Esta aplicación web permite a los usuarios buscar y organizar videojuegos de manera eficiente utilizando la **API de IGDB**. Accede a detalles completos de los juegos, incluyendo fechas de lanzamiento, puntuaciones, géneros y mucho más. La funcionalidad de almacenamiento local permite que los usuarios guarden sus juegos favoritos y los consulten en cualquier momento y desde diferentes dispositivos.

---

## **Características**

- **🔍 Búsqueda Avanzada:** Encuentra videojuegos mediante la API de IGDB con detalles completos.

- **💾 Almacenamiento Local:** Guarda tus juegos favoritos sin necesidad de iniciar sesión.

- **🎨 Interfaz Intuitiva:** Navegación sencilla y amigable para una mejor experiencia de usuario.

- **🚀 Optimización SEO:** Mejora del posicionamiento en motores de búsqueda con buenas prácticas.

- **📱 Diseño Responsivo:** Adaptado para dispositivos móviles y de escritorio.

- **🔗 URLs Amigables:** Uso de slugs para mejorar la legibilidad de las rutas.

---

## **Tecnologías Utilizadas**

- **Next.js**: Framework para crear aplicaciones web escalables y optimizadas.
- **React**: Librería de JavaScript para interfaces dinámicas.
- **JavaScript**: Lenguaje principal para el desarrollo frontend.
- **Tailwind CSS**: Framework CSS para un diseño responsivo y personalizado.
- **API de IGDB**: Proporciona datos de videojuegos, como fechas de lanzamiento, calificaciones y géneros.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Shadcn**: Componentes UI para una interfaz limpia y moderna.
- **Lucide**: Conjunto de iconos utilizados en la interfaz.

---

## **Estructura del Código**

La estructura del proyecto está organizada en las siguientes carpetas principales:

- **`/app`**: Rutas y vistas principales de la aplicación.
- **`/components`**: Componentes reutilizables de la interfaz de usuario.
- **`/app/api`**: Lógica para las solicitudes a la API.
- **`/utils`**: Componentes reutilizables del backend.

---

## **Lógica de la Aplicación**

La aplicación se divide en dos funcionalidades clave:

- **Búsqueda de videojuegos**: Realiza solicitudes HTTP a la API de IGDB utilizando el método `POST` para obtener datos que luego se procesan y renderizan.
- **Gestión de favoritos**: Los usuarios pueden guardar y eliminar juegos de su lista de favoritos utilizando el almacenamiento local del navegador.

---

## **Funciones de cada página**

- **Barra de navegación**: Los usuarios pueden realizar búsquedas o ser redirigidos a la página principal.
- **Página principal**: Visualización de los juegos guardados, con la posibilidad de eliminarlos o filtrarlos.
- **Detalles del juego**: Muestra información detallada del juego, como nombre, compañías, género, rating, lanzamiento, descripción, imágenes y juegos relacionados. Los usuarios pueden guardar o eliminar el juego de su biblioteca.

---

## **Descripción del Código**

- **`route.jsx`** (`./app/api/`): Lógica para realizar solicitudes a la API en el servidor.
- **`page.jsx`** (`./app/game/[slug]/`): Frontend donde se muestran los detalles de los juegos.
- **`globals.css`** (`./app/`): Hoja de estilos globales para el proyecto.
- **`page.jsx`** (`./app/`): Manejo de la biblioteca de videojuegos y la carga de los componentes necesarios.
- **`layout.tsx`** (`./app/`): Componente que maneja la estructura general de la página.
- **`Overview.jsx`** (`./components/GameOverviewComponents/`): Lógica que maneja la descripción del juego y la solicitud a la API.
- **`Screenshots.jsx`** (`./components/GameOverviewComponents/`): Muestra las capturas de pantalla del juego en un carrusel con posibilidad de zoom.
- **`SimilarGames.jsx`** (`./components/GameOverviewComponents/`): Muestra juegos similares a los visualizados.
- **`Alert.jsx`** (`./components/`): Maneja alertas para guardar o eliminar juegos de la biblioteca.
- **`Navbar.jsx`** (`./components/`): Gestiona el fondo dinámico, el logo y la redirección a la página principal.
- **`Searchbar.jsx`** (`./components/`): Lógica de la barra de búsqueda y la solicitud en tiempo real de los resultados.
- **`FetchData.jsx`** (`./utils/`): Lógica de las peticiones del lado del cliente.
- **`LocalStorage.jsx`** (`./utils/`): Maneja la lógica de guardar, eliminar, solicitar y verificar juegos en el LocalStorage.

---

## **Instalación y Configuración**

### **Requisitos previos**

Asegúrate de tener instalado **Node.js**. Si no lo tienes, puedes descargarlo desde [aquí](https://nodejs.org/).

### **Clonación del Repositorio**

Clona el repositorio a tu máquina local:

```bash
git clone https://github.com/MARUMARU310505/ElevenStudioChallenge.git
