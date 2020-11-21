const router = require("express").Router();
const controller = require("../controllers/fileData.controller");

// router.get(
//     "/",
//     controller.getAllData
// );

router.get(
    "/:type/:id",
    controller.getOneFromData
);

router.post(
    "/upload",
    controller.uploadData
);

module.exports = router;