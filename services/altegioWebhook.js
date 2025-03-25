/* eslint-disable camelcase */
const axios = require('axios');
const getCRMLead = require('./crmGetLead');
const { getToken } = require('./tokensServices');
const { sendMessageToChat } = require('./botTelegram');
const { format, parseISO, setHours, setMinutes, setSeconds } = require("date-fns");
const { uk } = require("date-fns/locale");

const SalesServicesIdList = [
  10669989, 10669992, 10669994, 12452584, 12452585, 12460475, 12035570, 11004387
];

const LevelDefinitionIdList = [
    12500073, 12318088, 12287043, 12287042, 12186844, 12186843, 12186842, 12186841, 12186840, 12186839, 12186838, 12186837
];
// Number is time when will be level Definition 
const LevelDefinition = {
    English_Adult_19: 12186837,
    English_Adult_20: 12186838,
    English_Kids_20: 12186839,
    Polish_Adult_20: 12186840,
    German_Adult_19: 12186841,
    German_Adult_20: 12186842,
    German_Kids_17: 12186843,
    German_Kids_16: 12318088,
    German_Adult_17: 12500073,
}

const LinkMapTrial = {
    English: {
      Adult: {
        19: {
            link: 'https://us06web.zoom.us/j/87347084243?pwd=RR7NoJ2dG5VXeECPEYmlFs4pPl4b56.1', // https://www.academy.ap.education/room/trial/a2free/9174b81d-2d91-407a-a0fa-5a8eb4a583fb
            lvl: 'A2_B1',
            CRMslug: 'Англійська дорослі 19:00',
            },
        20: {
            link: 'https://us06web.zoom.us/j/88281748322?pwd=DazWPms5w8ehZknADjlSUaumqV2yCl.1', // ''
            lvl: 'A0_A1',
            CRMslug: 'Англійська дорослі 20:15',
        }
       },
       Kids: {
        20: {
            link:'https://us06web.zoom.us/j/87062622194?pwd=bCn4sf2JLYhSKuCiCiXHu2UMPFWYzU.1',
            lvl: 'A0-A1',
            CRMslug: 'Англійська діти 20:15',
            },
       },
    },
    Polish: {
        Adult: {
         20: {
            link: 'https://us06web.zoom.us/j/81802778703?pwd=fB52J2wXoarnZ94SH2kHiaFzUBkWjH.1',
            lvl: 'A0-B1',
            CRMslug: 'Польська дорослі 20:15',
         }
        },
     },
     German: {
        Adult: {
         17: {
            link: 'https://us06web.zoom.us/j/81811560388?pwd=F6eyhgjd3dRcOICoQLEs9KdHMqQzPb.1',
            lvl: 'A0-B1',
            CRMslug: 'Німецька дорослі 17:00',
         },
         19: {
            link: 'https://us06web.zoom.us/j/81811560388?pwd=F6eyhgjd3dRcOICoQLEs9KdHMqQzPb.1',
            lvl: 'A0-B1',
            CRMslug: 'Німецька дорослі 19:00',
         },
         20: {
            link: 'https://us06web.zoom.us/j/81811560388?pwd=F6eyhgjd3dRcOICoQLEs9KdHMqQzPb.1',
            lvl: 'A0-B1',
            CRMslug: 'Німецька дорослі 20:00(лише вівторок)',
         },
        },
        Kids: {
         16: {
            link: 'https://us06web.zoom.us/j/87075472194?pwd=20qQad4apEADg0SPpbppvgf97EOnzL.1',
            lvl: 'A0-B1',
            CRMslug: 'Німецька діти 16:00',
         },
         17: {
            link: 'https://us06web.zoom.us/j/87075472194?pwd=20qQad4apEADg0SPpbppvgf97EOnzL.1',
            CRMslug: 'Німецька діти 17:00',
         },
        },
     },
}

const C2UTrialId = [12460475];

const Pipeline = {
    sales: 6453287,
    reanimation: 7891256
}

const Status = {
    salesPiplineBookTestLessonInd: 54980099,
    reanimationPiplineBookTestLessonInd: 71920160,
    salesWasBookTestLessonInd: 58580615,
    reanimationWasBookTestLessonInd: 71920164,
    salesNotWasBookTestLessonInd: 58580611,
    reanimationNotWasBookTestLessonInd: 71920152,
}

const StatusMappingSales = {
    English: 63191344,
    German: 63191348,
    Polish: 63191352,
};

const StatusMappingReanimation = {
    English: 63642560,
    German: 63642552,
    Polish: 63642556,
};

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
    const isLevelDefinition = data.services.some(service => LevelDefinitionIdList.includes(service.id))
    if (!isSalesServices && !isLevelDefinition) {
      return res.status(200).json({ message: 'Not a sales service' });
    }
    if ((isSalesServices || isLevelDefinition) && !userCrmId) {
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

   
    // Логіка обробки запису
    if (resource === 'record' && (status === 'create' || status === 'update') && userCrmId && isSalesServices) {
        const lead = await getCRMLead(userCrmId);
        const teacher = {
          name: data.staff.name,
          lessonDate: data.datetime,
          lessonFormat: data.services.some(service => C2UTrialId.includes(service.id)) ? "Індивідуальне C2U пробне" : "Індивідуальне",
        };
  
        if (Pipeline.sales === lead.pipeline_id && visit_attendance === 0) {
          bookTestLesson(userCrmId, Pipeline.sales, Status.salesPiplineBookTestLessonInd, teacher);
        }
  
        if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 0) {
          bookTestLesson(userCrmId, Pipeline.reanimation, Status.reanimationPiplineBookTestLessonInd, teacher);
        }
  
        if (Pipeline.sales === lead.pipeline_id && visit_attendance === 1) {
          bookTestLesson(userCrmId, Pipeline.sales, Status.salesWasBookTestLessonInd);
        }
  
        if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 1) {
          bookTestLesson(userCrmId, Pipeline.reanimation, Status.reanimationWasBookTestLessonInd);
        }
  
        if (Pipeline.sales === lead.pipeline_id && visit_attendance < 0) {
          bookTestLesson(userCrmId, Pipeline.sales, Status.salesNotWasBookTestLessonInd);
        }
  
        if (Pipeline.reanimation === lead.pipeline_id && visit_attendance < 0) {
          bookTestLesson(userCrmId, Pipeline.reanimation, Status.reanimationNotWasBookTestLessonInd);
        }
      }

      if (resource === 'record' && (status === 'create' || status === 'update') && userCrmId && isLevelDefinition) {
        const lead = await getCRMLead(userCrmId);
        const lessonData = getLinkMapTrialByValue(data.services[0].id)
        const teacher = {
            name: data.staff.name,
            lessonDate: getLessonDate(data.datetime, data.services[0].id),
            lessonFormat: lessonData.CRMslug,
          };
    
          if (Pipeline.sales === lead.pipeline_id && visit_attendance === 0) {
            bookTestLesson(userCrmId, Pipeline.sales, getNewStatus(data.services[0].id, StatusMappingSales), teacher);
          }
    
          if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 0) {
            bookTestLesson(userCrmId, Pipeline.reanimation, getNewStatus(data.services[0].id, StatusMappingReanimation), teacher);
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
    const postRequest = {
      status_id: status,
      pipeline_id: pipelineId,
    };
  
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
        console.log(JSON.stringify(err.response.data));
        return null;
      });
      return crmLead;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  function getLinkMapTrialByValue(value) {
    const levelKey = Object.keys(LevelDefinition).find(key => LevelDefinition[key] === value);
    if (!levelKey) {
        return null;
    }
    const levelParts = levelKey.split('_');
    const language = levelParts[0];
    const group = levelParts[1];
    const time = levelParts[2];

    if (LinkMapTrial[language] && LinkMapTrial[language][group] && LinkMapTrial[language][group][time]) {
        return LinkMapTrial[language][group][time];
    } else {
        return null;
    }
}

function getLessonDate(datetime, levelValue) {
    const levelKey = Object.keys(LevelDefinition).find(key => LevelDefinition[key] === levelValue);
    if (!levelKey) {
        return null;
    }

    const levelParts = levelKey.split('_');
    const hour = parseInt(levelParts[2], 10);

    const date = parseISO(datetime);
    const lessonDate = setHours(setMinutes(setSeconds(date, 0), 0), hour);
    return format(lessonDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

function getNewStatus(levelValue, StatusMapping) {
    const levelKey = Object.keys(LevelDefinition).find(key => LevelDefinition[key] === levelValue);
    if (!levelKey) {
        return null;
    }

    const language = levelKey.split('_')[0];
    return StatusMapping[language] || null;
}

module.exports = {
    altegioWebhook,
    LinkMapTrial
}
