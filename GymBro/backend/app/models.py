from datetime import datetime
from enum import Enum
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String

class DiaSemana(str, Enum):
    Lunes = "Lunes"
    Martes = "Martes"
    Miércoles = "Miércoles"
    Jueves = "Jueves"
    Viernes = "Viernes"
    Sábado = "Sábado"
    Domingo = "Domingo"

class Rutina(SQLModel, table=True):
    __tablename__ = "rutina"
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(sa_column=Column(String, unique=True, nullable=False))
    descripcion: Optional[str] = None
    fecha_creacion: datetime = Field(default_factory=datetime.utcnow)
    
    ejercicios: List["Ejercicio"] = Relationship(
        back_populates="rutina", 
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )

class Ejercicio(SQLModel, table=True):
    __tablename__ = "ejercicio"
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    dia_semana: DiaSemana
    series: int
    repeticiones: int
    peso: Optional[float] = None
    notas: Optional[str] = None
    orden: int = 1
    
    rutina_id: int = Field(foreign_key="rutina.id")
    rutina: Optional[Rutina] = Relationship(back_populates="ejercicios")

# Schemas
class RutinaCreate(SQLModel):
    nombre: str
    descripcion: Optional[str] = None

class RutinaUpdate(SQLModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None

class EjercicioCreate(SQLModel):
    nombre: str
    dia_semana: DiaSemana
    series: int
    repeticiones: int
    peso: Optional[float] = None
    notas: Optional[str] = None
    orden: Optional[int] = 1

class EjercicioUpdate(SQLModel):
    nombre: Optional[str] = None
    dia_semana: Optional[DiaSemana] = None
    series: Optional[int] = None
    repeticiones: Optional[int] = None
    peso: Optional[float] = None
    notas: Optional[str] = None
    orden: Optional[int] = None

# --- CORRECCIÓN AQUÍ ---
# Ya no hereda de 'Rutina' para evitar conflictos con la base de datos.
# Definimos los campos manualmente para que sea un esquema puro de lectura.
class RutinaReadWithEjercicios(SQLModel):
    id: int
    nombre: str
    descripcion: Optional[str] = None
    fecha_creacion: datetime
    # Aquí definimos explícitamente que queremos la lista de ejercicios
    ejercicios: List[Ejercicio] = []