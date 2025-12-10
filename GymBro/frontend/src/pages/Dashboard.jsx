import { useEffect, useState } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RutinaCard from '../components/RutinaCard';
import { getRutinas, deleteRutina, searchRutinas } from '../services/rutinas';

function Dashboard() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const fetchRutinas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRutinas();
      setRutinas(data);
    } catch (err) {
      console.error(err);
      // Mensaje de error amigable para saber qué pasa
      setError("No se pudo conectar con el Backend (127.0.0.1:8000). Revisa que la terminal negra esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRutinas(); }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!busqueda.trim()) { if (!loading) fetchRutinas(); } 
      else {
        try { const resultados = await searchRutinas(busqueda); setRutinas(resultados); } catch (e) { console.error(e); }
      }
    }, 500); 
    return () => clearTimeout(delayDebounceFn);
  }, [busqueda]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar rutina?")) {
      try { await deleteRutina(id); setRutinas(rutinas.filter(r => r.id !== id)); } catch (err) { alert("Error al eliminar"); }
    }
  };

  return (
    <Box sx={{ pb: 5 }}>
      {/* Encabezado del Dashboard MODIFICADO */}
      <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 2, 
          mb: 4, 
          p: 3, 
          // FONDO OSCURO SÓLIDO (95% opacidad) para máximo contraste
          background: 'rgba(18, 18, 18, 0.95)', 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)', 
          border: '1px solid rgba(255, 255, 255, 0.1)' 
      }}>
        <Box>
            <Typography variant="h4" fontWeight="800" sx={{ color: '#ffffff', letterSpacing: 1 }}>
            Mis Rutinas
            </Typography>
            <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                Gestiona tus entrenamientos de forma inteligente
            </Typography>
        </Box>
        
        <TextField
          placeholder="Buscar rutina..."
          size="small"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: '#fff' }} /></InputAdornment>),
            sx: { 
                borderRadius: '50px', 
                // BUSCADOR GRIS OSCURO (No transparente)
                bgcolor: '#333333', 
                color: 'white',
                '& fieldset': { border: '1px solid #444' }, 
                '&:hover': { bgcolor: '#424242' }, 
                '& input::placeholder': { color: '#aaaaaa', opacity: 1 } 
            }
          }}
          sx={{ width: { xs: '100%', sm: '300px' } }}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={3}>
          {rutinas.length > 0 ? (
            rutinas.map((rutina) => (
              <Grid item xs={12} sm={6} md={4} key={rutina.id}>
                <RutinaCard rutina={rutina} onDelete={handleDelete} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              {/* Caja de "No hay rutinas" también oscura para que combine */}
              <Box textAlign="center" py={5} sx={{ bgcolor: 'rgba(30,30,30,0.8)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
                <Typography color="text.secondary">No hay rutinas creadas.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}
export default Dashboard;