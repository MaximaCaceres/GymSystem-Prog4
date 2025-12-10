# Sistema de Gestión de Rutinas de Gimnasio (Backend)

Backend RESTful desarrollado para el Trabajo Final de Programación 4 (UTN). Provee una API completa para la gestión de rutinas, ejercicios y validaciones de negocio.

## 📋 Descripción del Proyecto
Este sistema permite administrar rutinas de entrenamiento mediante una arquitectura cliente-servidor. El backend se encarga de la persistencia de datos, la lógica de negocio y la exposición de endpoints seguros y documentados.

## 🛠️ Tecnologías Utilizadas
* **Lenguaje:** Python 3.10+
* **Framework Web:** FastAPI
* **ORM:** SQLModel (SQLAlchemy + Pydantic)
* **Servidor:** Uvicorn
* **Base de Datos:** SQLite (Configuración por defecto) / PostgreSQL (Compatible)

## 🚀 Requisitos Previos
* Python 3.10 o superior instalado.
* Git (opcional).

## ⚙️ Instalación y Configuración

1.  **Navegar a la carpeta del backend:**
    ```bash
    cd backend
    ```

2.  **Crear un entorno virtual:**
    * En Windows:
        ```bash
        python -m venv venv
        venv\Scripts\activate
        ```
    * En macOS/Linux:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

3.  **Instalar dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

## 🗄️ Configuración de la Base de Datos

### SQLite (Por defecto)
El proyecto viene preconfigurado para usar **SQLite** y generar automáticamente el archivo `gym_database.db`. No requiere configuración extra.

### PostgreSQL (Opcional)
Para conectar con una base de datos PostgreSQL real:
1.  Asegúrese de tener el servidor PostgreSQL corriendo.
2.  Cree una base de datos vacía (ej: `gymbro_db`).
3.  Modifique la variable `DATABASE_URL` en el archivo `app/db.py` o cree un archivo `.env` con:
    ```env
    DATABASE_URL="postgresql://usuario:password@localhost:5432/gymbro_db"
    ```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo con recarga automática:

```bash
uvicorn app.main:app --reload
```

## ▶️ Notas

Puerto de la aplicación: 8000

URL Base: http://127.0.0.1:8000

📚 Documentación de la API

FastAPI genera documentación automática e interactiva. Una vez iniciado el servidor, puede acceder a:

Swagger UI: http://127.0.0.1:8000/docs (Recomendado para probar endpoints)

ReDoc: http://127.0.0.1:8000/redoc

## 📡 Endpoints Principales

## Rutinas
GET /api/rutinas: Listado general de rutinas.

GET /api/rutinas/{id}: Detalle de una rutina con sus ejercicios.

GET /api/rutinas/buscar?nombre={texto}: Búsqueda parcial por nombre.

POST /api/rutinas: Alta de nueva rutina (valida nombre único).

PUT /api/rutinas/{id}: Modificación de datos de rutina.

DELETE /api/rutinas/{id}: Baja de rutina (borrado en cascada de ejercicios).

## Ejercicios
GET /api/ejercicios: Listado maestro de ejercicios.

POST /api/rutinas/{id}/ejercicios: Agregar ejercicio a una rutina.

PUT /api/ejercicios/{id}: Modificar un ejercicio existente.

DELETE /api/ejercicios/{id}: Eliminar un ejercicio.

## 📂 Estructura del Proyecto

backend/
├── app/
│   ├── main.py          # Configuración principal de FastAPI
│   ├── models.py        # Modelos SQLModel (Tablas y Schemas Pydantic)
│   ├── db.py            # Motor de base de datos y sesiones
│   └── routers/         # Endpoints modulares
│       ├── rutinas.py
│       └── ejercicios.py
├── requirements.txt     # Lista de dependencias
└── gym_database.db      # Archivo de BD (SQLite)

## Base de Datos

Se utiliza **SQLite** por defecto para facilitar la ejecución y corrección local sin instalaciones adicionales. El sistema es nativamente compatible con **PostgreSQL** cambiando únicamente la variable de entorno `DATABASE_URL`.