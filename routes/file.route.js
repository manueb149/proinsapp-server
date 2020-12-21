const router = require("express").Router();
const controller = require("../controllers/file.controller");
const auth = require('../middleware/auth');

// /api/files
router.get(
    "/",
    auth,
    controller.getFiles
);

// /api/files/upload
router.post(
    "/upload",
    auth,
    controller.uploadFile
);

// /api/files/delete/:id
router.delete(
    "/delete/:id",
    auth,
    controller.deleteFile
);

module.exports = router;