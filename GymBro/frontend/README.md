# GymBro - Frontend

Interfaz de usuario moderna y reactiva para el sistema de gestión de rutinas **GymBro**. Desarrollada con **React**, **Vite** y **Material UI**, implementando un diseño profesional "Dark & Gold".

## 📋 Descripción
Aplicación web SPA (Single Page Application) que consume la API REST del backend. Permite a los usuarios crear, visualizar y gestionar sus planes de entrenamiento de manera intuitiva, con feedback visual y validaciones en tiempo real.

## 🛠️ Tecnologías Utilizadas
* **React 18:** Librería principal de UI.
* **Vite:** Herramienta de construcción rápida y ligera.
* **Material UI:** Componentes de interfaz y sistema de diseño.
* **Axios:** Cliente HTTP para comunicación con el backend.
* **React Router Dom:** Gestión de rutas y navegación.

## 🚀 Requisitos Previos
* **Node.js** (v14 o superior).
* Gestor de paquetes **npm** o **yarn**.

## ⚙️ Instalación
1.  **Navegar a la carpeta del frontend:**
    ```bash
    cd frontend
    ```
2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

## 🔧 Configuración
La aplicación asume que el backend está corriendo en el puerto `8000`.
Si necesita cambiar la URL de la API, edite la propiedad `baseURL` en:
`src/api/axios.js`

## ▶️ Ejecución
### Modo Desarrollo
Para iniciar la aplicación localmente:
```bash
npm run dev
```

La aplicación se abrirá automáticamente en: http://localhost:5173

## Compilación (Producción)
Para generar los archivos estáticos optimizados en la carpeta dist:

```bash

npm run build

```

## 📂 Estructura del Proyecto
frontend/
├── src/
│   ├── api/             # Configuración de Axios
│   ├── components/      # Componentes reutilizables (Cards, Modales)
│   ├── pages/           # Vistas principales:
│   │   ├── Dashboard.jsx
│   │   ├── CrearRutina.jsx
│   │   ├── EditarRutina.jsx
│   │   ├── DetalleRutina.jsx
│   │   └── ListaEjercicios.jsx
│   ├── services/        # Lógica de llamadas a la API
│   ├── theme.js         # Configuración del tema Material UI (Dark Mode)
│   ├── App.jsx          # Componente raíz y rutas
│   └── main.jsx         # Punto de entrada
├── index.html
└── vite.config.js