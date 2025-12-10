import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import theme from './theme';

import Dashboard from './pages/Dashboard';
import CrearRutina from './pages/CrearRutina';
import DetalleRutina from './pages/DetalleRutina';
import EditarRutina from './pages/EditarRutina';
import ListaEjercicios from './pages/ListaEjercicios';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* BARRA DE NAVEGACIÓN */}
        <AppBar position="static" sx={{ py: 1 }}>
          <Toolbar>
            {/* Logo e Ícono */}
            <FitnessCenterIcon sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
            
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <Box component="span" sx={{ color: 'white' }}>Gym</Box>
              <Box component="span" sx={{ color: '#FFC107' }}>Bro</Box>
            </Typography>
            
            {/* Botones del Menú */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button color="inherit" component={Link} to="/">Mis Rutinas</Button>
                <Button color="inherit" component={Link} to="/ejercicios">Ejercicios</Button>
                <Button variant="contained" color="primary" component={Link} to="/crear">
                    + Nueva Rutina
                </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* CONTENIDO PRINCIPAL */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crear" element={<CrearRutina />} />
            <Route path="/rutina/:id" element={<DetalleRutina />} />
            <Route path="/editar/:id" element={<EditarRutina />} />
            <Route path="/ejercicios" element={<ListaEjercicios />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;