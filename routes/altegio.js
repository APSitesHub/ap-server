const express = require("express");
const authMiddleware = require("../middlewares/streams/authTEST");
const {GetListAvailableServices, getAvailableDateForBooking, getAvailableEmployeesForBooking,
    GetSessionsAvailableForBooking, GetConfigForBooking
} = require("../controllers/altegio/altegio");
const router = express.Router();


router.get("/book_services",authMiddleware, GetListAvailableServices);
router.get("/book_dates",authMiddleware, getAvailableDateForBooking);
router.get("/book_staff",authMiddleware, getAvailableEmployeesForBooking);
router.get("/book_times",authMiddleware, GetSessionsAvailableForBooking);
router.get("/book_config",authMiddleware,  GetConfigForBooking);

router.post("/book", authMiddleware, )
// router.get("/book_services", auth, (req, res) => {
//     res.status(200).json({ status: "success" });
// })

module.exports = router;