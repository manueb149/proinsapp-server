const router = require("express").Router();
const controller = require("../controllers/defaultValues.controller");

// /api/values
router.get(
    "/",
    controller.getValues
);

// /api/values/upload
router.post(
    "/upload",
    controller.uploadValues
);

module.exports = router;