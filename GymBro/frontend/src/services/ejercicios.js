import api from '../api/axios';

// Agregar ejercicio
export const addEjercicio = async (rutinaId, ejercicioData) => {
    // Enviamos rutina_id manual para asegurar
    const dataToSend = { ...ejercicioData, rutina_id: rutinaId };
    const response = await api.post(`/api/rutinas/${rutinaId}/ejercicios`, dataToSend);
    return response.data;
};

// Borrar ejercicio
export const deleteEjercicio = async (ejercicioId) => {
    await api.delete(`/api/ejercicios/${ejercicioId}`); 
};

// Traer TODOS los ejercicios (Para poder filtrarlos en el front)
export const getEjercicios = async () => {
    const response = await api.get('/api/ejercicios');
    return response.data;
};

// --- editar ejercicio ---
export const updateEjercicio = async (ejercicioId, ejercicioData) => {
    // PUT /api/ejercicios/{id}
    const response = await api.put(`/api/ejercicios/${ejercicioId}`, ejercicioData);
    return response.data;
};