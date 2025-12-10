import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getRutinaById, updateRutina } from '../services/rutinas';

function EditarRutina() {
  const { id } = useParams(); // Sacamos el ID de la URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Al entrar, buscamos los datos viejos de la rutina
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getRutinaById(id);
        // Llenamos el formulario con lo que vino del backend
        setFormData({
            nombre: data.nombre,
            descripcion: data.descripcion || ''
        });
      } catch (err) {
        setError("No se pudo cargar la rutina.");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Al guardar, mandamos el UPDATE (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return;

    try {
      await updateRutina(id, formData);
      navigate('/'); // Volvemos al inicio
    } catch (err) {
      setError("Error al actualizar. Quizás el nombre ya está usado.");
    }
  };

  if (loading) return <Box mt={5} display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error && !formData.nombre) return <Container sx={{ mt: 5 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Cancelar
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
            Editar Rutina
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <Box mt={3}>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                startIcon={<SaveIcon />}
                sx={{ borderRadius: 2 }}
            >
              Guardar Cambios
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default EditarRutina;