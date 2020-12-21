const router = require("express").Router();
const controller = require("../controllers/truck.controller");
const auth = require('../middleware/auth');

// /api/trucks
router.get(
    "/",
    auth,
    controller.getTrucks
);

// /api/trucks/upload
router.post(
    "/upload",
    auth,
    controller.uploadTrucks
);

// /api/trucks/delete/:id
router.delete(
    "/delete/:id",
    auth,
    controller.deleteTruck
);

module.exports = router;