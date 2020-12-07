const router = require("express").Router();
const controller = require("../controllers/truckData.controller");

// /api/trucksData/areas
router.get(
    "/areas",
    controller.getAreas  
);

// /api/trucksData
router.post(
    "/",
    controller.getAllData
);

// /api/trucksData/upload
router.post(
    "/upload",
    controller.uploadData
);

module.exports = router;