const router = require("express").Router();
const controller = require("../controllers/truck.controller");

// /api/trucks
router.get(
    "/",
    controller.getTrucks
);

// /api/trucks/upload
router.post(
    "/upload",
    controller.uploadTrucks
);

// /api/trucks/delete/:id
router.delete(
    "/delete/:id",
    controller.deleteTruck
);

module.exports = router;