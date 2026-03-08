require("dotenv").config();

require("./jobs/liberarReservasJob");
require("./jobs/limpiarCanciones");

const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");
const errorMiddleware = require("./middlewares/errorMiddleware");

const http = require("http");
const { Server } = require("socket.io");

const rolRoutes = require("./routes/rolRoutes");
const authRoutes = require("./routes/authRoutes");
const horarioRoutes = require("./routes/horarioRoutes");
const parqueaderoRoutes = require("./routes/parqueaderoRoutes");
const mesaRoutes = require("./routes/mesaRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const cancionRoutes = require("./routes/cancionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/horarios", horarioRoutes);
app.use("/api/mesas", mesaRoutes);
app.use("/api/parqueaderos", parqueaderoRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/canciones", cancionRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});

app.use(errorMiddleware);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

global.io = io;

io.on("connection", (socket) => {
  logger.info("Cliente conectado " + socket.id);

  socket.on("disconnect", () => {
    logger.info("Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
});