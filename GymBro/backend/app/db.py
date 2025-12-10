from sqlmodel import SQLModel, Session, create_engine
import os
from dotenv import load_dotenv

# 1. Cargar variables de entorno
load_dotenv()

# 2. Obtener la URL
DATABASE_URL = os.getenv("DATABASE_URL")

# 3. Crear el motor
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    from app.models import Rutina, Ejercicio
    SQLModel.metadata.create_all(engine)

# CORRECCIÓN AQUÍ: Renombramos 'get_db' a 'get_session'
def get_session():
    with Session(engine) as session:
        yield session