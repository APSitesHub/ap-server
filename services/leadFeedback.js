const getCRMLead = require("./crmGetLead");
const { LEAD_CUSTOM_FIELDS } = require("../utils/crm/constants");
const getCRMUser = require("./crmGetUser");
const formatDate = require("../utils/dateUtils");

const leadFeedback = async (leadId, answers) => {
  const lead = await getCRMLead(leadId);

  const managerId = lead.responsible_user_id;
  const teacher_name = lead.custom_fields_values.find(
    (field) => field.field_id === LEAD_CUSTOM_FIELDS.TEACHER_ON_TRIAL.field_id
  ).values[0].value;

  const responsible_user = await getCRMUser(managerId);

  return {
    lead_name: lead.name,
    lead_tag: lead._embedded.tags.map((tag) => tag.name).join(", "),
    responsible_user: responsible_user.name,
    created_at: formatDate(lead.created_at),
    current_date: formatDate(),
    teacher_name,
    datetime_trial: null,
    q1_short: answers[0].shortanswer,
    q2_short: answers[1].shortanswer,
    q3_short: answers[2].shortanswer,
    q4_short: answers[3].shortanswer,
    q5_short: answers[4].shortanswer,
    q6_raiting: answers[5].raiting,
    q7_raiting: answers[6].raiting,
    q1_long: answers[0].longanswer || "",
    q2_long: answers[1].longanswer || "",
    q3_long: answers[2].longanswer || "",
    q4_long: answers[3].longanswer || "",
    q5_long: answers[4].longanswer || "",
    q6_long: answers[5].longanswer || "",
    q7_long: answers[6].longanswer || "",
  };
};

module.exports = leadFeedback;
