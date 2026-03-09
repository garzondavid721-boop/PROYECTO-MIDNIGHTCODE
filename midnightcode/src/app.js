require("dotenv").config();

require("./jobs/liberarReservasJob");
require("./jobs/limpiarCanciones");
const cron = require("node-cron");
const liberarReservas = require("./jobs/reservaExpirationJob");

const express = require("express");
const cors = require("cors");
import cors from "cors";
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

// CORS personalizado Y DEFINO por cual dominio se va a conectar
//  para permitir solo el frontend específico
const allowedOrigins = [
  "http://localhost:5173",
  "CUANDO SE PUBLIQUE: URL_DEL_FRONTEND"
];

app.use(
  cors({
    origin: function(origin, callback) {
      // permitir requests sin origin (como Postman o backend a backend)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // dominio permitido
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true
  })
);

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

// cada 1 minuto revisa reservas expiradas
cron.schedule("* * * * *", async () => {
  await liberarReservas();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
});