const router = require("express").Router();
const controller = require("../controllers/truckData.controller");
const auth = require('../middleware/auth');

// /api/trucksData/areas
router.get(
    "/areas",
    auth,
    controller.getAreas  
);

// /api/trucksData
router.post(
    "/",
    auth,
    controller.getAllData
);

// /api/trucksData/upload
router.post(
    "/upload",
    auth,
    controller.uploadData
);

module.exports = router;