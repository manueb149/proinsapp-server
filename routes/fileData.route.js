const router = require("express").Router();
const controller = require("../controllers/fileData.controller");
const auth = require('../middleware/auth');

// /api/data/:type/:id
router.get(
    "/:type/:id",
    auth,
    controller.getOneFromData
);

// /api/data/upload
router.post(
    "/upload",
    auth,
    controller.uploadData
);

module.exports = router;