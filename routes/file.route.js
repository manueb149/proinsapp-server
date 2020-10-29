const router = require("express").Router();
const controller = require("../controllers/file.controller");

router.get(
    "/",
    controller.getFiles
);

router.post(
    "/upload",
    controller.uploadFile
);

router.delete(
    "/delete/:id",
    controller.deleteFile
);

module.exports = router;