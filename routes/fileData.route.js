const router = require("express").Router();
const controller = require("../controllers/fileData.controller");

// /api/data/:type/:id
router.get(
    "/:type/:id",
    controller.getOneFromData
);

// /api/data/upload
router.post(
    "/upload",
    controller.uploadData
);

module.exports = router;