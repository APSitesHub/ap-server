/* eslint-disable camelcase */
const axios = require('axios');
const getCRMLead = require('./crmGetLead');
const { getToken } = require('./tokensServices');
const { sendMessageToChat } = require('./botTelegram');
const { format } = require("date-fns");
const { uk } = require("date-fns/locale");

const SalesServicesIdList = [
  10669989, 10669992, 10669994, 12452584, 12452585, 12460475, 12035570, 11004387
];
const C2UTrialId = [12460475];

const Pipeline = {
    sales: 6453287,
    reanimation: 7891256
}

const Status = {
    salesPiplineBookTestLesson: 54980099,
    reanimationPiplineBookTestLesson: 71920160,
    salesWasBookTestLesson: 58580615,
    reanimationWasBookTestLesson: 71920164,
    salesNotWasBookTestLesson: 58580611,
    reanimationNotWasBookTestLesson: 71920152,
}

// Webhook обробник для Altegio
const altegioWebhook = async (req, res) => {
  try {
    const { status, resource, data } = req.body;
    const userName = data.client?.name || "";
    const visit_attendance = data.visit_attendance;

    const crmIdMatch = userName.match(/\b\d{4,}\b/);
    const userCrmId = crmIdMatch ? crmIdMatch[0] : null;

    if (!userName) {
      return res.status(200).json({ message: 'Invalid client name' });
    }

    const isSalesServices = data.services.some(service => SalesServicesIdList.includes(service.id));
    if (!isSalesServices) {
      return res.status(200).json({ message: 'Not a sales service' });
    }
    if (isSalesServices && !userCrmId && status === 'create') {
        const teacher = {
          name: data.staff.name,
          lessonDate: data.datetime,
        };
        
        const lead = {
          name: data.client.name || "Ім'я не вказано",
          phone: data.client.phone || "Номер телефону не вказано",
        };
      
        // Форматуємо повідомлення за допомогою Markdown
        const message = `❗❗ *Створено новий запис БЕЗ ID CRM!*  
    👨‍🏫 *Викладач:* ${teacher.name}  
    📅 *Дата уроку:* ${format(new Date(teacher.lessonDate), "d MMMM yyyy, HH:mm", { locale: uk })}  
    👤 *Клієнт:* ${lead.name}  
    📞 *Телефон:* \`${lead.phone}\``;
        sendMessageToChat(message); //
      
        return res.status(200).json({ message: "User without ID" });
      }

    if (!userCrmId) {
        return res.status(200).json({ message: 'CRM ID not found' });
    }

    const lead = await getCRMLead(userCrmId);
    // Логіка обробки запису
    if (resource === 'record' && (status === 'create' || status === 'update') && userCrmId) {
        const teacher = {
          name: data.staff.name,
          lessonDate: data.datetime,
          lessonFormat: data.services.some(service => C2UTrialId.includes(service.id)) ? "Індивідуальне C2U пробне" : "Індивідуальне",
        };
  
        if (Pipeline.sales === lead.pipeline_id && visit_attendance === 0) {
          bookTestLesson(userCrmId, Pipeline.sales, Status.salesPiplineBookTestLesson, teacher);
        }
  
        if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 0) {
          bookTestLesson(userCrmId, Pipeline.reanimation, Status.reanimationPiplineBookTestLesson, teacher);
        }
  
        if (Pipeline.sales === lead.pipeline_id && visit_attendance === 1) {
          bookTestLesson(userCrmId, Pipeline.sales, Status.salesWasBookTestLesson);
        }
  
        if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 1) {
          bookTestLesson(userCrmId, Pipeline.reanimation, Status.reanimationWasBookTestLesson);
        }
  
        if (Pipeline.sales === lead.pipeline_id && visit_attendance < 0) {
          bookTestLesson(userCrmId, Pipeline.sales, Status.salesNotWasBookTestLesson);
        }
  
        if (Pipeline.reanimation === lead.pipeline_id && visit_attendance < 0) {
          bookTestLesson(userCrmId, Pipeline.reanimation, Status.reanimationNotWasBookTestLesson);
        }
      }
    // Якщо жодна умова не виконана
    return res.status(200).json({ message: 'No action required' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(200).json({ message: 'Internal server error', status: 'badRequest' });
  }
};



async function bookTestLesson(leadId, pipelineId, status, teacher = null) {
    // Створюємо об'єкт postRequest без поля custom_fields_values, якщо teacher відсутній
    const postRequest = {
      status_id: status,
      pipeline_id: pipelineId,
    };
  
    // Якщо teacher існує, додаємо custom_fields_values
    if (teacher) {
      postRequest.custom_fields_values = [
        {
          field_id: 1821801,
          field_name: "Куди і на котру записаний на пробне",
          values: [
            {
              value: teacher.lessonFormat,
            },
          ],
        },
        {
          field_id: 1806904,
          field_name: "Дата і час запису на пробне заняття",
          values: [
            {
              value: teacher.lessonDate,
            },
          ],
        },
        {
          field_id: 1807140,
          field_name: "Викладач на пробному",
          values: [
            {
              value: teacher.name,
            },
          ],
        },
      ];
    }

    try {
      const currentToken = await getToken();
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${currentToken[0].access_token}`;
  
      const crmLead = await axios.patch(
        `https://apeducation.kommo.com/api/v4/leads/${leadId}`,
        postRequest
      ).catch(err => {
        console.log(err);
        return null;
      });
      return crmLead;
    } catch (error) {
      console.log(error);
      return null;
    }
  }  

module.exports = altegioWebhook;
