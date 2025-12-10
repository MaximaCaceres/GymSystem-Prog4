import { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Chip, CircularProgress, TextField, InputAdornment, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { getEjercicios } from '../services/ejercicios';

function ListaEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const data = await getEjercicios();
        setEjercicios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    cargarTodo();
  }, []);

  // Filtramos localmente por nombre
  const ejerciciosFiltrados = ejercicios.filter(e => 
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return <Box mt={5} display="flex" justifyContent="center"><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      
      {/* Encabezado y Buscador */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
                <FitnessCenterIcon color="secondary" sx={{ fontSize: 35 }} />
                <Box>
                    <Typography variant="h5" fontWeight="bold" color="#d32f2f">
                        Inventario de Ejercicios
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Viendo {ejerciciosFiltrados.length} ejercicios
                    </Typography>
                </Box>
            </Box>
            
            <TextField 
                placeholder="Buscar ejercicio..." 
                size="small" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                    sx: { borderRadius: 5 }
                }}
            />
        </Box>
      </Paper>

      {/* Lista */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <List sx={{ p: 0 }}>
            {ejerciciosFiltrados.length > 0 ? (
                ejerciciosFiltrados.map((ej, index) => (
                    <div key={ej.id}>
                        <ListItem sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                            <ListItemText 
                                primary={
                                    <Box display="flex" gap={1} alignItems="center">
                                        <Typography fontWeight="bold" fontSize="1.1rem">{ej.nombre}</Typography>
                                        <Chip label={ej.dia_semana} size="small" variant="outlined" color="primary" />
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                                        {ej.series} series x {ej.repeticiones} repeticiones 
                                        {ej.peso > 0 && ` | ${ej.peso} kg`}
                                        {ej.notas && <span style={{ fontStyle: 'italic' }}> — Nota: {ej.notas}</span>}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < ejerciciosFiltrados.length - 1 && <Divider />}
                    </div>
                ))
            ) : (
                <Box p={3} textAlign="center">
                    <Typography color="text.secondary">No se encontraron ejercicios.</Typography>
                </Box>
            )}
        </List>
      </Paper>
    </Container>
  );
}

export default ListaEjercicios;