const router = require("express").Router();
const controller = require("../controllers/defaultValues.controller");
const auth = require('../middleware/auth');

// /api/values
router.get(
    "/",
    auth,
    controller.getValues
);

// /api/values/upload
router.post(
    "/upload",
    auth,
    controller.uploadValues
);

module.exports = router;