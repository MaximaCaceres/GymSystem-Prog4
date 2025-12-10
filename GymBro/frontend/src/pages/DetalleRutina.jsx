import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Divider, List, ListItem, ListItemText, Chip, CircularProgress, Alert, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // <--- Importamos el ícono
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { getRutinaById } from '../services/rutinas';
// Importamos updateEjercicio
import { addEjercicio, deleteEjercicio, getEjercicios, updateEjercicio } from '../services/ejercicios';

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const formInicial = { nombre: '', dia_semana: 'Lunes', series: 4, repeticiones: 12, peso: 0, notas: '' };

function DetalleRutina() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [rutina, setRutina] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados del Modal
  const [openModal, setOpenModal] = useState(false);
  const [nuevoEj, setNuevoEj] = useState(formInicial);
  const [editingId, setEditingId] = useState(null); // <--- null = creando, número = editando

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const dataRutina = await getRutinaById(id);
      setRutina(dataRutina);

      const todos = await getEjercicios();
      const misEjercicios = todos.filter(e => e.rutina_id === Number(id));
      setEjercicios(misEjercicios);

    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { cargarDatos(); }, [id]);

  // Abrir modal para CREAR
  const handleOpenCrear = () => {
    setNuevoEj(formInicial); // Limpiamos form
    setEditingId(null);      // Modo creación
    setOpenModal(true);
  };

  // Abrir modal para EDITAR
  const handleOpenEditar = (ejercicio) => {
    setNuevoEj({
        nombre: ejercicio.nombre,
        dia_semana: ejercicio.dia_semana,
        series: ejercicio.series,
        repeticiones: ejercicio.repeticiones,
        peso: ejercicio.peso || 0,
        notas: ejercicio.notas || ''
    });
    setEditingId(ejercicio.id); // Modo edición (guardamos el ID)
    setOpenModal(true);
  };

  // Guardar (Decide si es Crear o Actualizar)
  const handleGuardar = async () => {
    try {
        if (editingId) {
            // Estamos editando (PUT)
            await updateEjercicio(editingId, nuevoEj);
        } else {
            // Estamos creando (POST)
            await addEjercicio(id, nuevoEj);
        }
        setOpenModal(false);
        cargarDatos(); 
    } catch (error) { alert("Error al guardar"); }
  };

  const handleBorrar = async (ejID) => {
    if(window.confirm("¿Borrar ejercicio?")) {
        try { await deleteEjercicio(ejID); cargarDatos(); } catch (e) { alert("Error al borrar"); }
    }
  };

  if (loading) return <Box mt={5} display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (!rutina) return <Container sx={{mt:5}}><Alert severity="error">Rutina no encontrada</Alert></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>Volver</Button>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
            <FitnessCenterIcon color="primary" sx={{ fontSize: 35 }} />
            <Typography variant="h4" fontWeight="bold" color="#1a237e">{rutina.nombre}</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">{rutina.descripcion}</Typography>
      </Paper>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Ejercicios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCrear} sx={{ borderRadius: 20 }}>
            Agregar Ejercicio
        </Button>
      </Box>

      {ejercicios.length > 0 ? (
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <List>
                {ejercicios.map((ej, i) => (
                    <div key={ej.id}>
                        <ListItem 
                            secondaryAction={
                                <Box>
                                    {/* Botón EDITAR */}
                                    <IconButton color="primary" onClick={() => handleOpenEditar(ej)}>
                                        <EditIcon />
                                    </IconButton>
                                    {/* Botón BORRAR */}
                                    <IconButton color="error" onClick={() => handleBorrar(ej.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText 
                                primary={<Box display="flex" gap={1} alignItems="center"><Typography fontWeight="bold">{ej.nombre}</Typography><Chip label={ej.dia_semana} size="small" color="primary" variant="outlined"/></Box>}
                                secondary={`${ej.series} series x ${ej.repeticiones} reps ${ej.peso > 0 ? `| ${ej.peso}kg` : ''}`}
                            />
                        </ListItem>
                        {i < ejercicios.length - 1 && <Divider />}
                    </div>
                ))}
            </List>
        </Paper>
      ) : (
        <Alert severity="info">No hay ejercicios aún.</Alert>
      )}

      {/* Modal Reutilizable */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Editar Ejercicio" : "Nuevo Ejercicio"}</DialogTitle>
        <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <TextField label="Nombre" fullWidth value={nuevoEj.nombre} onChange={(e) => setNuevoEj({...nuevoEj, nombre: e.target.value})} />
                <TextField select label="Día" fullWidth value={nuevoEj.dia_semana} onChange={(e) => setNuevoEj({...nuevoEj, dia_semana: e.target.value})}>
                    {diasSemana.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </TextField>
                <Box display="flex" gap={2}>
                    <TextField type="number" label="Series" fullWidth value={nuevoEj.series} onChange={(e) => setNuevoEj({...nuevoEj, series: e.target.value})} />
                    <TextField type="number" label="Reps" fullWidth value={nuevoEj.repeticiones} onChange={(e) => setNuevoEj({...nuevoEj, repeticiones: e.target.value})} />
                </Box>
                <TextField type="number" label="Peso (kg)" fullWidth value={nuevoEj.peso} onChange={(e) => setNuevoEj({...nuevoEj, peso: e.target.value})} />
                <TextField label="Notas" fullWidth multiline rows={2} value={nuevoEj.notas} onChange={(e) => setNuevoEj({...nuevoEj, notas: e.target.value})} />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DetalleRutina;