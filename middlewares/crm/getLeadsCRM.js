const { getToken } = require("../../services/tokensServices");
const axios = require("axios");
const AltegioAppointments = require("../../db/models/altegioAppointments");

// Функція для оновлення останнього пробного уроку як "лід купив курс"
const updateLastTrialLesson = async (leadId) => {
  try {
    // Знаходимо всі пробні уроки для цього ліда
    const trialLessons = await AltegioAppointments.find({
      leadId: leadId.toString(),
      status: 2,
      IsTrial: true,
      isDeleted: false
    })
    .sort({ startDateTime: -1 })
    .limit(1);

    if (trialLessons.length === 0) {
      console.log(`No trial lessons found for leadId: ${leadId}`);
      return null;
    }

    const lastTrialLesson = trialLessons[0];
    
    const kyivDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" })
    );

    const updatedLesson = await AltegioAppointments.findByIdAndUpdate(
      lastTrialLesson._id,
      { 
      $set: { 
        leadPurchasedCourse: true,
        courseePurchaseDate: kyivDate
      }
      },
      { new: true }
    );

    console.log(`Updated trial lesson ${lastTrialLesson.appointmentId} for lead ${leadId} - marked as purchased course`);
    return updatedLesson;

  } catch (error) {
    console.error(`Error updating trial lesson for leadId ${leadId}:`, error.message);
    throw error;
  }
};

const getLeadsForGoogleSheets = async (req, res, next) => {
  console.log("me log from google middleware", req.body.crmId);

  try {
    const SERVICE_PIPELINE_ID = 7001587;
    const STATUS_WAIT_PAYMENT_ID = 71921048;

    const currentToken = await getToken();
    const { crmId } = req.body;

    if (!crmId) {
      return res.status(400).json({ error: "crmId is required" });
    }

    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

    const crmLead = await axios.get(
      `https://apeducation.kommo.com/api/v4/leads/${crmId}`
    );

    if (
      crmLead.data &&
      crmLead.data.pipeline_id === SERVICE_PIPELINE_ID &&
      crmLead.data.status_id === STATUS_WAIT_PAYMENT_ID
    ) {
      // Оновлюємо останній пробний урок для цього ліда
      try {
        await updateLastTrialLesson(crmId);
        console.log(`Successfully updated trial lesson for lead ${crmId}`);
      } catch (updateError) {
        console.error(`Failed to update trial lesson for lead ${crmId}:`, updateError.message);
        // Продовжуємо виконання навіть якщо оновлення не вдалося
      }
      return next();
    }
    return res.status(422).json({
      error: `Lead with crmId ${crmId} does not have the allowed status`,
    });
  } catch (err) {
    console.error("Error fetching lead:", err); // Логування помилки для дебагу
    return res
      .status(500)
      .json({ error: `Error with updating lead status: ${err.message}` });
  }
};

// Функція для отримання інформації про останній пробний урок ліда
const getLastTrialLessonInfo = async (leadId) => {
  try {
    const lastTrialLesson = await AltegioAppointments.findOne({
      leadId: leadId.toString(),
      IsTrial: true,
      isDeleted: false
    })
    .sort({ startDateTime: -1 }); // Останній за датою

    return lastTrialLesson;
  } catch (error) {
    console.error(`Error getting trial lesson info for leadId ${leadId}:`, error.message);
    throw error;
  }
};

module.exports = { 
  getLeadsForGoogleSheets, 
  updateLastTrialLesson, 
  getLastTrialLessonInfo 
};
