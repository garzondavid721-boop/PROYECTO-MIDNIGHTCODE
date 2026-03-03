const horarioService = require('../services/horarioService');
const horarioSchema = require('../validators/horarioSchema');

class HorarioController {

  async getAll(req, res, next) {
    try {
      const horarios = await horarioService.getAll();
      res.json(horarios);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const horario = await horarioService.getById(
        parseInt(req.params.id),
        req.user
      );
      res.json(horario);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {

      const parsed = horarioSchema.safeParse(req.body);

      if (!parsed.success)
        return res.status(400).json(parsed.error);

      const horario = await horarioService.create(parsed.data);
      res.status(201).json(horario);

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HorarioController();