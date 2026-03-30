require("dotenv").config();

/* ---------------- DEPENDENCIAS ---------------- */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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

/* ---------------- SEGURIDAD: HELMET ---------------- */

app.use(helmet());

/* ---------------- RATE LIMITING ---------------- */

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Demasiadas peticiones, intenta más tarde." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Demasiados intentos de acceso, intenta más tarde." },
});

app.use(globalLimiter);

/* ---------------- CORS (antes de json y rutas) ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:80",
  "http://localhost",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("No permitido por CORS"));
    },
    credentials: true,
  })
);

/* ---------------- MIDDLEWARE GLOBAL ---------------- */

app.use(express.json());

/* LOG AUTOMÁTICO DE REQUESTS */

app.use(httpLogger);

/* ---------------- ROUTES ---------------- */

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/auth", authLimiter, authRoutes);
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