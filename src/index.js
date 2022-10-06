const express = require("express");
const morgan = require("morgan");
const { router } = require("./router/router");
const { notFoundRouter } = require("./controller/middleware.controller");
const app = express();

// Set
app.set("port", 5000);

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

app.use(notFoundRouter);
app.listen(app.get("port"), () => {
  console.log("Server on port " + app.get("port"));
});
