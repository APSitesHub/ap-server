const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const updateContractLead = async (req, res, _) => {
  console.log(req.body);
  const patchRequest = {
    custom_fields_values: [
      {
        field_id: 1824515,
        field_name: "ПІБ",
        values: [
          {
            value: req.body.fields_fullName || "",
          },
        ],
      },
      {
        field_id: 1824537,
        field_name: "Номер телефону",
        values: [
          {
            value: req.body.fields_phone || "",
          },
        ],
      },
      {
        field_id: 1824529,
        field_name: "Номер паспорту",
        values: [
          {
            value: req.body.fields_IDcard || "",
          },
        ],
      },
      {
        field_id: 1824531,
        field_name: "Ідентифікаційний номер",
        values: [
          {
            value: req.body.fields_IPN || "",
          },
        ],
      },
      {
        field_id: 1824539,
        field_name: "ПІБ довіреної особи",
        values: [
          {
            value: req.body.fields_fullNameTrustedPerson || "",
          },
        ],
      },
      {
        field_id: 1824541,
        field_name: "Телефон довіреної особи",
        values: [
          {
            value: req.body.fields_phoneTrustedPerson || "",
          },
        ],
      },
      {
        field_id: 1824525,
        field_name: "Служба доставки",
        values: [
          {
            value: req.body.fields_deliveryService || "",
          },
        ],
      },
      {
        field_id: 1824527,
        field_name: "Адреса доставки",
        values: [
          {
            value: req.body.fields_deliveryAddress || "",
          },
        ],
      },
      {
        field_id: 1824533,
        field_name: "Адреса прописки",
        values: [
          {
            value: req.body.fields_address || "",
          },
        ],
      },
      {
        field_id: 1824535,
        field_name: "Адреса проживання",
        values: [
          {
            value: req.body.fields_currentAddress || "",
          },
        ],
      },
    ],
  };

  if (req.body.isChild) {
    patchRequest.custom_fields_values = [
      ...patchRequest.custom_fields_values,
      {
        field_id: 1824553,
        field_name: "ПІБ дитини",
        values: [
          {
            value: req.body.fields_childName || "",
          },
        ],
      },
      {
        field_id: 1824557,
        field_name: "ДАТА НАРОДЖЕННЯ ДИТИНИ",
        values: [
          {
            value: req.body.fields_childDOB || "",
          },
        ],
      },
    ];
  }

  const currentToken = await getToken();
  try {
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${currentToken[0].access_token}`;
    const test = await axios.patch(
      `https://apeducation.kommo.com/api/v4/leads/${req.body.leadId}`,
      JSON.stringify(patchRequest),
    );

    const crmLead = await axios.get(
      `https://apeducation.kommo.com/api/v4/leads/${req.body.leadId}`,
    );
    const taskData = [
      {
        responsible_user_id: crmLead.data.responsible_user_id,
        task_type_id: 1,
        text: `Заповнив форму. Перевір поля договору`,
        complete_till: Math.floor(new Date().getTime() / 1000),
        entity_id: +req.body.leadId,
        entity_type: "leads",
        request_id: `fill_form_for_contract_id:${req.body.leadId}`,
      },
    ];
    await axios
      .post(
        "https://apeducation.kommo.com/api/v4/tasks",
        taskData, // Тіло запиту
        {
          headers: {
            "Content-Type": "application/json", // Заголовок для JSON-запиту
          },
        },
      )
      .catch((err) => {
        console.error(
          "Error to aplay task after fill contract form",
          JSON.stringify(err.response.data["validation-errors"]),
        );
      });

    console.log(test.status);
    console.log(test.data);
    return res.status(200).json({ status: "OK" });
  } catch (err) {
    console.log(err.response);
    console.log(JSON.stringify(err.response.data["validation-errors"]));
    return res
      .status(400)
      .json(`Error with update contract fields lead ${req.body.leadId}`);
  }
};

module.exports = updateContractLead;
