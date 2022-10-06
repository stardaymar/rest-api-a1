const { Router } = require("express");
const {
  get,
  getById,
  put,
  delete: deleteEquipo,
  post,
} = require("../controller/equipos.controller");
const {
  get: getTrabajos,
  getTrabajosById,
  getTrabajoByTipo,
  deleteTrabajo,
  putTrabajo,
  postTrabajo,
} = require("../controller/trabajos.controller");
const router = Router();

router.get("/equipos", get);
router.get("/equipos/:id", getById);
router.post("/equipos", post);
router.put("/equipos/:id", put);
router.delete("/equipos/:id", deleteEquipo);

router.get("/trabajos", getTrabajos);
router.get("/trabajos/:id", getTrabajosById);
router.get("/trabajos/tipo/:tipo", getTrabajoByTipo);
router.post("/trabajos", postTrabajo);
router.put("/trabajos/:id", putTrabajo);
router.delete("/trabajos/:id", deleteTrabajo);
module.exports = {
  router,
};
