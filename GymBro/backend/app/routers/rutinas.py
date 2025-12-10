from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import select, Session
from sqlalchemy.orm import selectinload

from app.db import get_session
# CAMBIO 1: Agregamos RutinaReadWithEjercicios al import
from app.models import Rutina, RutinaCreate, RutinaUpdate, Ejercicio, EjercicioCreate, RutinaReadWithEjercicios

router = APIRouter(prefix="/api/rutinas", tags=["rutinas"])

@router.get("", response_model=List[Rutina])
def listar_rutinas(session: Session = Depends(get_session)):
    return session.exec(select(Rutina)).all()

@router.get("/buscar", response_model=List[Rutina])
def buscar_rutinas(nombre: str = "", session: Session = Depends(get_session)):
    stmt = select(Rutina)
    if nombre:
        stmt = stmt.where(Rutina.nombre.contains(nombre))
    return session.exec(stmt).all()

# CAMBIO 2: Usamos RutinaReadWithEjercicios aqui para que incluya la lista en el JSON
@router.get("/{rutina_id}", response_model=RutinaReadWithEjercicios)
def obtener_rutina(rutina_id: int, session: Session = Depends(get_session)):
    rutina = session.exec(
        select(Rutina).where(Rutina.id == rutina_id).options(selectinload(Rutina.ejercicios))
    ).first()
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    return rutina

@router.post("", response_model=Rutina, status_code=201)
def crear_rutina(payload: RutinaCreate, session: Session = Depends(get_session)):
    if not payload.nombre.strip():
        raise HTTPException(status_code=400, detail="El nombre es requerido")
        
    existe = session.exec(select(Rutina).where(Rutina.nombre == payload.nombre)).first()
    if existe:
        raise HTTPException(status_code=400, detail="Ya existe una rutina con ese nombre")
        
    rutina = Rutina(nombre=payload.nombre.strip(), descripcion=payload.descripcion)
    session.add(rutina)
    session.commit()
    session.refresh(rutina)
    return rutina

@router.put("/{rutina_id}", response_model=Rutina)
def actualizar_rutina(rutina_id: int, payload: RutinaUpdate, session: Session = Depends(get_session)):
    rutina = session.get(Rutina, rutina_id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
        
    if payload.nombre is not None:
        if not payload.nombre.strip():
            raise HTTPException(status_code=400, detail="El nombre no puede estar vacío")
        if payload.nombre != rutina.nombre:
            existe = session.exec(select(Rutina).where(Rutina.nombre == payload.nombre)).first()
            if existe:
                raise HTTPException(status_code=400, detail="Ya existe una rutina con ese nombre")
        rutina.nombre = payload.nombre.strip()
        
    if payload.descripcion is not None:
        rutina.descripcion = payload.descripcion
        
    session.add(rutina)
    session.commit()
    session.refresh(rutina)
    return rutina

@router.delete("/{rutina_id}", status_code=204)
def eliminar_rutina(rutina_id: int, session: Session = Depends(get_session)):
    rutina = session.get(Rutina, rutina_id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    session.delete(rutina)
    session.commit()

@router.post("/{rutina_id}/ejercicios", response_model=Ejercicio, status_code=201)
def agregar_ejercicio(rutina_id: int, payload: EjercicioCreate, session: Session = Depends(get_session)):
    rutina = session.get(Rutina, rutina_id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
        
    # .dict() es de Pydantic v1, SQLModel a veces usa .model_dump() en v2, 
    # pero .dict() suele funcionar en ambas versiones de SQLModel por compatibilidad.
    ejercicio = Ejercicio(**payload.dict(), rutina_id=rutina_id)
    session.add(ejercicio)
    session.commit()
    session.refresh(ejercicio)
    return ejercicio
