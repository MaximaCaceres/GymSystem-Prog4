import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createRutina } from '../services/rutinas';

function CrearRutina() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
        setError("El nombre es obligatorio");
        return;
    }

    try {
      await createRutina(formData);
      navigate('/'); // Volver al inicio tras guardar
    } catch (err) {
      setError("Error al crear la rutina. Intenta con otro nombre.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Cancelar
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
            Nueva Rutina
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Crea un nuevo plan de entrenamiento
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre de la Rutina"
            name="nombre"
            variant="outlined"
            margin="normal"
            value={formData.nombre}
            onChange={handleChange}
            required
            autoFocus
          />
          
          <TextField
            fullWidth
            label="Descripción (Opcional)"
            name="descripcion"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            value={formData.descripcion}
            onChange={handleChange}
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
              Guardar Rutina
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CrearRutina;