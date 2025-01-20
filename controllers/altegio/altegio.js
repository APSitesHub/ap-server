const { GetAvailableServices } = require("../../services/altegio/GetAvailableServices");
const GetAvailableDate = require("../../services/altegio/GetAvailableDate");
const {GetAvailableEmployees} = require("../../services/altegio/GetAvailableEmployees");
const GetAvailableSessions = require("../../services/altegio/GetAvailableSessions");
const {DateTime} = require("luxon");

/**
 * Controller to fetch and return a list of available services.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} Responds with a list of available services or an error message.
 */
async  function GetListAvailableServices (req, res) {
    try {
        const lang = req.query.lang;
        const services = await GetAvailableServices(lang)
        console.log(lang);
        return res.status(200).json({ status: "success", services});
    } catch (error) {
        return res.status(400).json({ status: "error", message: error.message });
    }
}

/**
 * Controller to fetch and return a list of available dates for booking based on filters.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} Responds with a list of available dates or an error message.
 */
async function getAvailableDateForBooking(req, res) {
    try {
        // Filters based on query parameters

        const filters = {
            service_ids: req.query.service_ids || [], // Parse service_ids as an array
            staff_id: req.query.staff_id || undefined,
            date: req.query.date || undefined,
            date_from: req.query.date_from || undefined,
            date_to: req.query.date_to || undefined,
        };

        console.log(filters);
        console.log(req.query);

        // Call the GetAvailableDate function
        const availableDates = await GetAvailableDate(filters);

        if (availableDates) {
            return res.status(200).json({
                status: 'success',
                data: availableDates
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'No available dates found.'
            });
        }
    } catch (error) {
        console.error('Error fetching available dates:', error);
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controller to fetch and return a list of employees available for booking.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function getAvailableEmployeesForBooking(req, res) {
    try {
        const user = req.body.user;
        const serviceIds = req.query.service_ids; // Extract service IDs from query (array)
        const datetime = req.query.datetime; // Extract datetime from query

        // Fetch available employees using the service
        const employees = await GetAvailableEmployees(
            serviceIds ? (Array.isArray(serviceIds) ? serviceIds : [serviceIds]) : [],
            datetime, 
            user
        );

        return res.status(200).json({ status: 'success', employees });
    } catch (error) {
        console.error('Error fetching available employees:', error.message);
        return res.status(500).json({ status: 'error', message: error.message });
    }
}

async function GetSessionsAvailableForBooking (req, res) {
    try {
        const filters = {
            staffId: req.query.staff_id || 0,
            datetime: req.query.date || DateTime.now()
                .setZone('Europe/Kyiv').toISODate(),
            service_ids:  req.query.service_ids
        }

        const sessions =  await GetAvailableSessions(filters)

        return res.status(200).json({ status: 'success', sessions });
    } catch (error) {
        console.error('Error fetching available sessions:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
}

async function GetConfigForBooking (req, res) {
    try {
        const response = {
            allowOnlineBooking: req.body.user.allow_online_booking,
            availableOnlineBooking: req.body.user.available_online_booking,
            onlineBookingCount: req.body.user.online_booking_count,
            onlineBookingVisitedCount: req.body.user.onlineBookingHistory.length ?? 0,
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching available sessions:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
}

// TODO Implement CreateBookingSessionEntry
async function CreateBooking(req, res) {
    try{
        // const requestBody = req.body;
        // const response = await CreateBookingSessionEntry(requestBody);
        return res.status(201).json('response');
    }catch (error) {
        console.error('Error Create Booking Session entry:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
    
}


module.exports = {
    GetListAvailableServices,
    getAvailableDateForBooking,
    getAvailableEmployeesForBooking,
    GetSessionsAvailableForBooking,
    GetConfigForBooking,
    CreateBooking
}
