const express = require("express");
const auth = require("../middlewares/streams/auth");
const {GetListAvailableServices, getAvailableDateForBooking, getAvailableEmployeesForBooking,
    GetSessionsAvailableForBooking
} = require("../controllers/altegio/altegio");
const router = express.Router();

router.get("/book_services", GetListAvailableServices);
router.get("/book_dates", getAvailableDateForBooking);
router.get("/book_staff", getAvailableEmployeesForBooking);
router.get("/book_times", GetSessionsAvailableForBooking)

router.get("/book_services", auth, (req, res) => {
    res.status(200).json({ status: "success" });
});

router.get("/book_services", auth, (req, res) => {
    res.status(200).json({ status: "success" });
})

module.exports = router;