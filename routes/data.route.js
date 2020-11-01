const router = require("express").Router();
const controller = require("../controllers/data.controller");

router.get(
    "/",
    controller.getAllData
);

router.get(
    "/:id",
    controller.getOneFromData
);

router.post(
    "/upload",
    controller.uploadData
);

module.exports = router;