const cron = require("node-cron");
const cancionRepository = require("../repositories/cancionRepository");

cron.schedule("0 6 * * *", async () => {

  await cancionRepository.deleteAll();

  if (global.io) {
    global.io.emit("colaCanciones", []);
  }

  console.log("Lista de canciones limpiada 6 AM");

});