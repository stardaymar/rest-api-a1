class MiddlewareNotFound {
  notFoundRouter(req, res, next) {
    res.status(404).json({
      mensaje: "La ruta que intentas acceder no se encuentra definida.",
    });
  }
}

module.exports = new MiddlewareNotFound();
