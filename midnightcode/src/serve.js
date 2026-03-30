/* ---------------- DEPENDENCIAS ---------------- */

const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");

/* ---------------- LOGGER ---------------- */

const logger = require("./config/logger");

/* ---------------- JOBS ---------------- */

require("./jobs/liberarReservasJob");
require("./jobs/limpiarCanciones");

const liberarReservas = require("./jobs/reservaExpirationJob");

/* ---------------- APP ---------------- */

const app = require("./app");

/* ---------------- SERVER ---------------- */

const server = http.createServer(app);

/* ---------------- SOCKET.IO ---------------- */

const allowedSocketOrigins = [
  "http://localhost:5173",
  "http://localhost:80",
  "http://localhost",
  process.env.FRONTEND_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedSocketOrigins,
    credentials: true,
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

if (process.env.NODE_ENV !== "test") {
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
}