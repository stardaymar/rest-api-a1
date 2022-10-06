const { data: dataEquipos } = require("../models/equipos.json");
const { data: dataTrabajos } = require("../models/trabajos.json");
class EquipoController {
  async get(req, res) {
    if (dataEquipos.length) {
      res.status(200).json({ equipos: dataEquipos });
    } else {
      res.status(404).json({ mensaje: "No se encontraron equipos." });
    }
  }
  async getById(req, res) {
    const { id } = req.params;
    const equipo = dataEquipos.find((equipo) => equipo.id === id);
    if (!equipo) {
      res.status(404).json({ mensaje: "No se encontró el equipo." });
    } else {
      res.status(200).json({ equipo });
    }
  }
  async post(req, res) {
    const {
      nombre,
      descripcion,
      serial,
      fechaInicioPuestaMarcha,
      ultimaFechaPuestaMarcha,
      ultimaFechaMantenimiento,
      idTrabajo,
    } = req.body;
    if (
      !nombre ||
      !descripcion ||
      !serial ||
      !fechaInicioPuestaMarcha ||
      !ultimaFechaPuestaMarcha ||
      !ultimaFechaMantenimiento ||
      !idTrabajo
    ) {
      return res.status(400).json({
        mensaje:
          "No se puede crear el equipo, ya que no se enviaron todos los datos. ",
      });
    }
    //Valida que el idTrabajo exista en el json de datosTrabajo
    const trabajo = dataTrabajos.find((trabajo) => trabajo.id === idTrabajo);
    if (!trabajo) {
      return res.status(400).json({
        mensaje:
          "No se puede crear el equipo, ya que el idTrabajo no pertenece a ningun trabajo.",
      });
    }
    const idEquipo = dataEquipos.length + 1;
    const equipo = {
      id: JSON.stringify(idEquipo),
      nombre,
      descripcion,
      serial,
      fechaInicioPuestaMarcha,
      ultimaFechaPuestaMarcha,
      ultimaFechaMantenimiento,
    };
    dataEquipos.push(equipo);
    res.status(201).json({
      mensaje: "Equipo creado correctamente.",
      equipo,
    });
  }

  async put(req, res) {
    const { id } = req.params;
    const equipo = dataEquipos.find((equipo) => equipo.id === id);
    if (!equipo) {
      return res.status(404).json({
        mensaje: "No se puede actualizar el equipo, ya que no existe. ",
      });
    }
    const {
      nombre,
      descripcion,
      serial,
      fechaInicioPuestaMarcha,
      ultimaFechaPuestaMarcha,
      ultimaFechaMantenimiento,
    } = req.body;

    if (nombre) equipo.nombre = nombre;
    if (descripcion) equipo.descripcion = descripcion;
    if (serial) equipo.serial = serial;
    if (fechaInicioPuestaMarcha)
      equipo.fechaInicioPuestaMarcha = fechaInicioPuestaMarcha;
    if (ultimaFechaPuestaMarcha)
      equipo.ultimaFechaPuestaMarcha = ultimaFechaPuestaMarcha;
    if (ultimaFechaMantenimiento)
      equipo.ultimaFechaMantenimiento = ultimaFechaMantenimiento;
    res.status(200).json({
      mensaje: "Equipo actualizado correctamente.",
      equipo,
    });

    res.status(200).json({
      mensaje: "Se actualizó el equipo correctamente.",
      equipo,
    });
  }
  async delete(req, res) {
    const { id } = req.params;
    const equipo = dataEquipos.find((equipo) => equipo.id === id);
    if (!equipo) {
      res.status(404).json({
        mensaje: "No se puede eliminar el equipo, ya que no existe. ",
      });
    } else {
      const index = dataEquipos.indexOf(equipo);
      dataEquipos.splice(index, 1);
      res.status(200).json({
        mensaje: "Equipo eliminado correctamente.",
        equipos: dataEquipos,
      });
    }
  }
}

module.exports = new EquipoController();
