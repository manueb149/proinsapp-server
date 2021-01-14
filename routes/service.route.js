const router = require("express").Router();
const controller = require("../controllers/service.controller");
const auth = require('../middleware/auth');

// /api/service
router.get(
    "/",
    auth,
    controller.getReports
);

// /api/service/create
router.post(
    "/create",
    auth,
    controller.createReport
);

// /api/service/delete/:serviceNo
router.delete(
    "/delete/:serviceNo",
    auth,
    controller.deleteReport
);

// /api/service/update/:serviceNo
router.put(
    "/update/:serviceNo",
    auth,
    controller.updateReport
)

module.exports = router;