require('dotenv').config();
const express = require('express');
const app = express();
const horarioRoutes = require('./routes/horarioRoutes');

app.use(express.json());
app.use('/api/horarios', horarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});