require('dotenv').config();
require('./jobs/liberarReservasJob');
const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const horarioRoutes = require('./routes/horarioRoutes');

const parqueaderoRoutes = require('./routes/parqueaderoRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');



const app = express();

const usuarioRoutes = require('./routes/usuarioRoutes');

const rolRoutes = require('./routes/rolRoutes');
app.use('/api/roles', rolRoutes);

app.use('/api/usuarios', usuarioRoutes);   


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/horarios', horarioRoutes);

app.use('/api/mesas', mesaRoutes);
app.use('/api/parqueaderos', parqueaderoRoutes);
app.use('/api/reservas', reservaRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
});
