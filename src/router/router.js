const { Router } = require("express");
const {
  get,
  getById,
  put,
  delete: deleteEquipo,
  post,
} = require("../controller/equipos.controller");
const router = Router();

router.get("/equipos", get);

router.get("/equipos/:id", getById);

router.post("/equipos", post);

router.put("/equipos/:id", put);

router.delete("/equipos/:id", deleteEquipo);

module.exports = {
  router,
};
