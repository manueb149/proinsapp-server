const router = require("express").Router();
const controller = require("../controllers/truck.controller");

router.get(
    "/",
    controller.getTrucks
);

router.post(
    "/upload",
    controller.uploadTrucks
);

router.delete(
    "/delete/:id",
    controller.deleteTruck
);

module.exports = router;