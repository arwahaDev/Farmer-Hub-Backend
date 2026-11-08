const express = require("express");
const crudFactory = require("./crudFactory");
const { protect, authorize } = require("../middleware/authMiddleware");

const crudRoutes = (Model) => {
  const router = express.Router();

  const { getAll, getOne, create, update, remove } =
    crudFactory(Model);

  router.get("/", protect, getAll);

  router.get("/:id", protect, getOne);

  router.post("/", protect, create);

  router.put("/:id", protect, authorize("admin"), update);

  router.delete("/:id", protect, authorize("admin"), remove);

  return router;
};

module.exports = crudRoutes;