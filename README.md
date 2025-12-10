# 🏋️ Proyecto Final: Sistema de Gestión de Rutinas de Gimnasio (GymBro)

## 📌 Descripción General
**GymBro** es un sistema web completo desarrollado para la gestión integral de rutinas de entrenamiento. Permite a los usuarios crear, visualizar, modificar y eliminar planes de entrenamiento, organizando ejercicios por día de la semana.

El proyecto implementa una arquitectura **Cliente-Servidor (Full-Stack)** con clara separación de responsabilidades:

* **Frontend (Cliente):** Interfaz de usuario reactiva, diseñada con estética "Dark & Gold" moderna.
* **Backend (API):** Servicio RESTful que maneja la lógica de negocio y persistencia de datos.

## 🚀 Tecnologías Clave

### Frontend
| Tecnología | Propósito |
| :--- | :--- |
| **React + Vite** | Framework principal y build tool. |
| **Material UI** | Sistema de diseño y componentes (Temas oscuros). |
| **Axios** | Comunicación asíncrona con la API. |

### Backend
| Tecnología | Propósito |
| :--- | :--- |
| **FastAPI** | Framework web (API RESTful). |
| **SQLModel** | ORM para mapeo de datos y validación. |
| **Python 3.10+** | Lenguaje de programación. |

## ⚙️ Instrucciones de Ejecución Rápida

Para poner el sistema en funcionamiento, se deben iniciar el backend y el frontend de forma independiente.

### Paso 1: Iniciar el Backend (API)

1.  Navegar a la carpeta `backend/`.
2.  Crear y activar el entorno virtual (`venv`).
3.  Instalar dependencias: `pip install -r requirements.txt`.
4.  Ejecutar el servidor: `uvicorn app.main:app --reload`.
    * **URL de la API:** `http://127.0.0.1:8000`

### Paso 2: Iniciar el Frontend (Web)

1.  Navegar a la carpeta `frontend/`.
2.  Instalar dependencias: `npm install`.
3.  Ejecutar la aplicación: `npm run dev`.
    * **URL de la Aplicación:** `http://localhost:5173`

> **Nota:** El sistema está configurado para usar SQLite por defecto para facilitar el desarrollo. La documentación completa sobre la migración a **PostgreSQL** se encuentra en `backend/README.md`.

## 📚 Documentación Detallada

Para la estructura de archivos, endpoints disponibles y criterios de validación, consulte los README específicos:

* [**Backend Documentation**](./backend/README.md)
* [**Frontend Documentation**](./frontend/README.md)
