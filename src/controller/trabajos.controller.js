const { data: dataTrabajos } = require("../models/trabajos.json");
const { data: dataEquipos } = require("../models/equipos.json");
class TrabajoController {
  async get(req, res) {
    if (dataTrabajos.length) {
      res.status(200).json({ trabajos: dataTrabajos });
    } else {
      res.status(404).json({ mensaje: "No se encontraron trabajos." });
    }
  }
  async getTrabajosById(req, res) {
    const { id } = req.params;
    const trabajo = dataTrabajos.find((trabajo) => trabajo.id === id);
    if (!trabajo) {
      res.status(404).json({ mensaje: "No se encontró el trabajo." });
    } else {
      res.status(200).json({ trabajo });
    }
  }
  async getTrabajoByTipo(req, res) {
    const trabajos = dataTrabajos.filter((trabajo) =>
      trabajo.tipo.toLowerCase().includes(req.params.tipo.toLowerCase())
    );
    if (trabajos.length) {
      res.status(200).json({ trabajos });
    } else {
      res.status(404).json({
        mensaje: "No se encontraron trabajos co el tipo especificado.",
      });
    }
  }
  async postTrabajo(req, res) {
    const {
      idEquipo,
      fechaMantenimiento,
      fechaInicio,
      fechaFinal,
      estatus,
      observacion,
      tipo,
      reparado,
    } = req.body;
    if (
      !idEquipo ||
      !fechaMantenimiento ||
      !fechaInicio ||
      !fechaFinal ||
      !estatus ||
      !observacion ||
      !tipo ||
      !reparado
    ) {
      return res.status(400).json({
        mensaje:
          "No se puede crear el trabajo, ya que no se enviaron todos los datos. ",
      });
    }
    if (
      tipo &&
      tipo.length &&
      tipo?.toLowerCase() !== "preventivo" &&
      tipo?.toLowerCase() !== "correctivo"
    ) {
      return res.status(400).json({
        mensaje: "El tipo de trabajo debe ser correctivo o preventivo.",
      });
    }
    const equipo = dataEquipos.find((e) => e.id === idEquipo);
    if (!equipo) {
      return res.status(400).json({
        mensaje:
          "No se puede crear el trabajo, ya que el idEquipo no pertenece a ningun equipo.",
      });
    }
    const idTrabajo = dataTrabajos.length + 1;
    const trabajo = {
      id: JSON.stringify(idTrabajo),
      idEquipo,
      fechaMantenimiento,
      fechaInicio,
      fechaFinal,
      estatus,
      observacion,
      tipo,
      reparado,
    };
    dataTrabajos.push(trabajo);
    equipo.ultimaFechaMantenimiento = new Date().toISOString();

    res.status(201).json({
      mensaje: "Trabajo creado correctamente.",
      trabajo,
    });
  }

  async putTrabajo(req, res) {
    const { id } = req.params;
    const trabajo = dataTrabajos.find((trabajo) => trabajo.id === id);
    if (!trabajo) {
      return res.status(404).json({
        mensaje: "No se puede actualizar el trabajo, ya que no existe. ",
      });
    }

    const {
      fechaMantenimiento,
      fechaInicio,
      fechaFinal,
      estatus,
      observacion,
      tipo,
      reparado,
    } = req.body;

    if (
      tipo &&
      tipo.length &&
      tipo?.toLowerCase() !== "preventivo" &&
      tipo?.toLowerCase() !== "correctivo"
    ) {
      return res.status(400).json({
        mensaje: "El tipo de trabajo debe ser correctivo o preventivo.",
      });
    }

    if (fechaMantenimiento) trabajo.fechaMantenimiento = fechaMantenimiento;
    if (fechaInicio) trabajo.fechaInicio = fechaInicio;
    if (fechaFinal) trabajo.fechaFinal = fechaFinal;
    if (estatus) trabajo.estatus = estatus;
    if (observacion) trabajo.observacion = observacion;
    if (tipo) trabajo.tipo = tipo;
    if (reparado) trabajo.reparado = reparado;

    res.status(200).json({
      mensaje: "Trabajo actualizado correctamente.",
      trabajo,
    });
  }
  async deleteTrabajo(req, res) {
    const { id } = req.params;
    const trabajo = dataTrabajos.find((trabajo) => trabajo.id === id);
    if (!trabajo) {
      res.status(404).json({
        mensaje: "No se puede eliminar el trabajo, ya que no existe. ",
      });
    } else {
      const index = dataTrabajos.indexOf(trabajo);
      dataTrabajos.splice(index, 1);
      res.status(200).json({
        mensaje: "Trabajo eliminado correctamente.",
        trabajos: dataTrabajos,
      });
    }
  }
}

module.exports = new TrabajoController();
