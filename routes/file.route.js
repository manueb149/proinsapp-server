const router = require("express").Router();
const controller = require("../controllers/file.controller");

// /api/files
router.get(
    "/",
    controller.getFiles
);

// /api/files/upload
router.post(
    "/upload",
    controller.uploadFile
);

// /api/files/delete/:id
router.delete(
    "/delete/:id",
    controller.deleteFile
);

module.exports = router;