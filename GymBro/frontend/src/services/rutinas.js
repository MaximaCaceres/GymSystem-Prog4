import api from '../api/axios';

// Obtener todas
export const getRutinas = async () => {
    const response = await api.get('/api/rutinas');
    return response.data;
};

// Crear una
export const createRutina = async (data) => {
    const response = await api.post('/api/rutinas', data);
    return response.data;
};

// Buscar
export const searchRutinas = async (texto) => {
    const response = await api.get(`/api/rutinas/buscar?nombre=${texto}`);
    return response.data;
};

// Borrar
export const deleteRutina = async (id) => {
    await api.delete(`/api/rutinas/${id}`);
};

// Obtener una por ID
export const getRutinaById = async (id) => {
    const response = await api.get(`/api/rutinas/${id}`);
    return response.data;
};

// Actualizar (Editar)
export const updateRutina = async (id, data) => {
    const response = await api.put(`/api/rutinas/${id}`, data);
    return response.data;
};