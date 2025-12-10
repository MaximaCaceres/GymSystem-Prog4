from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from app.db import get_session
from app.models import Ejercicio, EjercicioUpdate

router = APIRouter(prefix="/api/ejercicios", tags=["ejercicios"])

@router.get("", response_model=List[Ejercicio])
def listar_ejercicios(session: Session = Depends(get_session)):
    """Listar todos los ejercicios de todas las rutinas"""
    ejercicios = session.exec(
        select(Ejercicio).options(selectinload(Ejercicio.rutina))
    ).all()
    return ejercicios

@router.get("/{ejercicio_id}", response_model=Ejercicio)
def obtener_ejercicio(ejercicio_id: int, session: Session = Depends(get_session)):
    """Obtener un ejercicio específico con su rutina"""
    ejercicio = session.exec(
        select(Ejercicio).where(Ejercicio.id == ejercicio_id).options(selectinload(Ejercicio.rutina))
    ).first()
    if not ejercicio:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return ejercicio

@router.put("/{ejercicio_id}", response_model=Ejercicio)
def actualizar_ejercicio(ejercicio_id: int, payload: EjercicioUpdate, session: Session = Depends(get_session)):
    ejercicio = session.get(Ejercicio, ejercicio_id)
    if not ejercicio:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
        
    hero_data = payload.dict(exclude_unset=True)
    for key, value in hero_data.items():
        setattr(ejercicio, key, value)
        
    session.add(ejercicio)
    session.commit()
    session.refresh(ejercicio)
    return ejercicio

@router.delete("/{ejercicio_id}", status_code=204)
def eliminar_ejercicio(ejercicio_id: int, session: Session = Depends(get_session)):
    ejercicio = session.get(Ejercicio, ejercicio_id)
    if not ejercicio:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    session.delete(ejercicio)
    session.commit()
