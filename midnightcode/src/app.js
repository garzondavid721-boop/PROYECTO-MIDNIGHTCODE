require("dotenv").config();

/* ---------------- DEPENDENCIAS ---------------- */

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");

/* ---------------- LOGGER ---------------- */


const logger = require("./config/logger");

/* ---------------- HTTP LOGGER ---------------- */
const httpLogger = require("./middlewares/loggerMiddleware");

/* ---------------- ERROR HANDLER ---------------- */

const errorHandler = require("./middlewares/errorMiddleware");

/* ---------------- JOBS ---------------- */

require("./jobs/liberarReservasJob");
require("./jobs/limpiarCanciones");

const liberarReservas = require("./jobs/reservaExpirationJob");

/* ---------------- ROUTES ---------------- */

const rolRoutes = require("./routes/rolRoutes");
const authRoutes = require("./routes/authRoutes");
const horarioRoutes = require("./routes/horarioRoutes");
const parqueaderoRoutes = require("./routes/parqueaderoRoutes");
const mesaRoutes = require("./routes/mesaRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const cancionRoutes = require("./routes/cancionRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const cajaRoutes = require("./routes/cajaRoutes");

/* ---------------- APP ---------------- */

const app = express();

/* ---------------- MIDDLEWARE GLOBAL ---------------- */

app.use(cors());

app.use(express.json());

/* LOG AUTOMÁTICO DE REQUESTS */

app.use(httpLogger);

/* ---------------- ROUTES ---------------- */

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/horarios", horarioRoutes);
app.use("/api/mesas", mesaRoutes);
app.use("/api/parqueaderos", parqueaderoRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/canciones", cancionRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/caja", cajaRoutes);

/* ---------------- 404 ---------------- */

app.use((req, res) => {

  logger.warn({
    event: "RUTA_NO_ENCONTRADA",
    method: req.method,
    url: req.originalUrl
  });

  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });

});

/* ---------------- ERROR HANDLER ---------------- */

app.use(errorHandler);

/* ---------------- SERVER ---------------- */

const server = http.createServer(app);

/* ---------------- CORS DE CONNECCION CON EL FRONTED---------------- */
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


/* ---------------- SOCKET.IO ---------------- */

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

global.io = io;

io.on("connection", (socket) => {

  logger.info({
    event: "SOCKET_CONECTADO",
    socket: socket.id
  });

  socket.on("disconnect", () => {

    logger.info({
      event: "SOCKET_DESCONECTADO",
      socket: socket.id
    });

  });

});

/* ---------------- CRON JOB ---------------- */

/* revisa reservas expiradas cada minuto */

cron.schedule("* * * * *", async () => {

  try {

    logger.info({
      event: "CRON_VERIFICAR_RESERVAS"
    });

    await liberarReservas();

  } catch (error) {

    logger.error({
      event: "ERROR_CRON_RESERVAS",
      error: error.message
    });

  }

});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info({
    event: "SERVER_START",
    port: PORT
  });
}).on("error", (err) => {

  if (err.code === "EADDRINUSE") {

    logger.error({
      event: "PUERTO_OCUPADO",
      port: PORT
    });

    process.exit(1);

  }

});