const horarioService = require('../services/horarioService');

class HorarioController {
  async getAll(req, res) {
    try {
      const horarios = await horarioService.getAll();
      res.json(horarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const horario = await horarioService.getById(parseInt(req.params.id));
      if (!horario) return res.status(404).json({ error: 'Horario no encontrado' });
      res.json(horario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const horario = await horarioService.create(req.body);
      res.status(201).json(horario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const horario = await horarioService.update(parseInt(req.params.id), req.body);
      res.json(horario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await horarioService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new HorarioController();