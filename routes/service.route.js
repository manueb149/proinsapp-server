const router = require("express").Router();
const controller = require("../controllers/service.controller");

// /api/service
router.get(
    "/",
    controller.getReports
);

// /api/service/create
router.post(
    "/create",
    controller.createReport
);

// /api/service/delete/:id
router.delete(
    "/delete/:id",
    controller.deleteReport
);

// /api/service/update/:id
router.put(
    "/update/:id",
    controller.updateReport
)

module.exports = router;