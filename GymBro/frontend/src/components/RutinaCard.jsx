import { Card, CardContent, Typography, CardActions, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';

function RutinaCard({ rutina, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card 
      elevation={5} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: '20px', 
        overflow: 'hidden',
        transition: '0.3s',
        // ARREGLO VISUAL: Fondo oscuro semitransparente (vidrio ahumado)
        background: 'rgba(30, 30, 30, 0.7)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }
      }}
    >
      {/* Encabezado Dorado */}
      <Box sx={{ background: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <FitnessCenterIcon sx={{ fontSize: 40, color: '#000', opacity: 0.7 }} />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ textTransform: 'capitalize', mb: 1, color: 'white' }}>
            {rutina.nombre}
        </Typography>
        
        <Box display="flex" alignItems="center" gap={0.5} mb={2} color="text.secondary">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption">
                {new Date(rutina.fecha_creacion).toLocaleDateString()}
            </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ 
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3, 
        }}>
          {rutina.descripcion || "Sin descripción."}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button 
          variant="contained" 
          size="small" 
          color="primary"
          sx={{ borderRadius: '50px', px: 3, fontWeight: 'bold' }}
          onClick={() => navigate(`/rutina/${rutina.id}`)}
        >
          Ver
        </Button>
        <Box>
            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)' }} onClick={() => navigate(`/editar/${rutina.id}`)}>
                <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => onDelete(rutina.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default RutinaCard;