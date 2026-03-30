require("dotenv").config();

/* ---------------- DEPENDENCIAS ---------------- */

const express = require("express");
const cors = require("cors");

/* ---------------- LOGGER ---------------- */

const logger = require("./config/logger");

/* ---------------- HTTP LOGGER ---------------- */
const httpLogger = require("./middlewares/loggerMiddleware");


/* ---------------- ERROR HANDLER ---------------- */

const errorHandler = require("./middlewares/errorMiddleware");

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

// app.use(cors());

app.use(express.json());

/* LOG AUTOMÁTICO DE REQUESTS */

app.use(httpLogger);

/* ---------------- CORS DE CONEXION CON EL FRONTEND ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://016f18qb-5173.use2.devtunnels.ms"
];

app.use(
  cors({
    origin: function(origin, callback) {
      // permitir requests sin origin (como Postman o backend a backend)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");
      const isAllowedDevTunnel = /^https:\/\/[a-z0-9-]+\.use2\.devtunnels\.ms$/i.test(normalizedOrigin);

      if (allowedOrigins.includes(normalizedOrigin) || isAllowedDevTunnel) {
        callback(null, true); // dominio permitido
      } else {
        callback(new Error(`No permitido por CORS: ${origin}`));
      }
    },
    credentials: true
  })
);

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

module.exports = app;