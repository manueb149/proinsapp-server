const router = require("express").Router();
const controller = require("../controllers/truckData.controller");

router.get(
    "/areas",
    controller.getAreas  
);

router.post(
    "/",
    controller.getAllData
);

router.post(
    "/upload",
    controller.uploadData
);

module.exports = router;