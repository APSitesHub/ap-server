const PIPELINE_ID_SALES = 6453287;
const PIPELINE_ID_SALES_REANIMATION = 7891256;

const STATUS_ID = {
    BOOK_TRIAL: [54980099, 71920160],
    BOOK_TRIAL_YEARLY_ENG: [63191344, 63642560],
    BOOK_TRIAL_YEARLY_PL: [63191352, 63642556],
    BOOK_TRIAL_YEARLY_GER: [63191348, 63642552],
    WAS_TRIAL: [58580615, 71920164],
    NOT_WAS_TRIAL:[58580611, 71920152],
    NEXT_STEP_2: 56563927,
    PROPOSITION_SEND_AFTER_TRIAL: 56563935,
    IGNORE_PROPOSITION_AFTER_SEND: 56563939,
    NEXT_STEP_AFTER_TRIAL: 56563943,
    WAIT_PAYMENT: 54980155,
};

const LEAD_CUSTOM_FIELDS = {
    TEACHER_ON_TRIAL: {
        field_id: 1807140,
        field_name: "Викладач на пробному",
        field_type: "text",
    },
    DATETIME_TRIAL: {
        field_id: 1806904,
        field_name: "Дата і час запису на пробне заняття",
        field_type: "date",
    },
    IDENTIFIER_1: {
        field_id: 1815765,
        field_name: "Ідентифікатор нл1",
        field_type: "text",
    },
    IDENTIFIER_2: {
        field_id: 1815767,
        field_name: "Ідентифікатор пз2",
        field_type: "text",
    },
    IDENTIFIER_3: {
        field_id: 1815769,
        field_name: "Ідентифікатор овч3",
        field_type: "text",
    },
    IDENTIFIER_4: {
        field_id: 1815771,
        field_name: "Ідентифікатор нкч4",
        field_type: "text",
    },
    IDENTIFIER_5: {
        field_id: 1815773,
        field_name: "Ідентифікатор нд5",
        field_type: "text",
    },
    IDENTIFIER_6: {
        field_id: 1815775,
        field_name: "Ідентифікатор нкнд6",
        field_type: "text",
    },
    IDENTIFIER_7: {
        field_id: 1815777,
        field_name: "Ідентифікатор іпнк7",
        field_type: "text",
    },
    IDENTIFIER_8: {
        field_id: 1815779,
        field_name: "Ідентифікатор пвбп8",
        field_type: "text",
    },
    IDENTIFIER_9: {
        field_id: 1815781,
        field_name: "Ідентифікатор іппбп9",
        field_type: "text",
    },
    IDENTIFIER_10: {
        field_id: 1815783,
        field_name: "Ідентифікатор нкнпп10",
        field_type: "text",
    },
    IDENTIFIER_11: {
        field_id: 1815785,
        field_name: "Ідентифікатор зп11",
        field_type: "text",
    },
    IDENTIFIER_12: {
        field_id: 1815787,
        field_name: "Ідентифікатор зпра12",
        field_type: "text",
    },
    IDENTIFIER_13: {
        field_id: 1815789,
        field_name: "Ідентифікатор зпрн13",
        field_type: "text",
    },
    IDENTIFIER_14: {
        field_id: 1815791,
        field_name: "Ідентифікатор зпрп14",
        field_type: "text",
    },
    IDENTIFIER_15: {
        field_id: 1815793,
        field_name: "Ідентифікатор нпнп15",
        field_type: "text",
    },
    IDENTIFIER_16: {
        field_id: 1817717,
        field_name: "Ідентифікатор пп16",
        field_type: "text",
    },
    IDENTIFIER_17: {
        field_id: 1817719,
        field_name: "Ідентифікатор нкн217",
        field_type: "text",
    },
    IDENTIFIER_18: {
        field_id: 1817721,
        field_name: "Ідентифікатор вппп18",
        field_type: "text",
    },
    IDENTIFIER_19: {
        field_id: 1817723,
        field_name: "Ідентифікатор іпппп19",
        field_type: "text",
    },
    IDENTIFIER_20: {
        field_id: 1817725,
        field_name: "Ідентифікатор нкнпп20",
        field_type: "text",
    },
    IDENTIFIER_21: {
        field_id: 1817727,
        field_name: "Ідентифікатор оо21",
        field_type: "text",
    },
    UTM_CONTENT: {
        field_id: 556518,
        field_name: "utm_content",
        field_type: "text",
    },
    UTM_MEDIUM: {
        field_id: 556520,
        field_name: "utm_medium",
        field_type: "text",
    },
    UTM_CAMPAIGN: {
        field_id: 556522,
        field_name: "utm_campaign",
        field_type: "text",
    },
    UTM_SOURCE: {
        field_id: 556524,
        field_name: "utm_source",
        field_type: "text",
    },
    UTM_TERM: {
        field_id: 556526,
        field_name: "utm_term",
        field_type: "text",
    },
    UTM_REFERRER: {
        field_id: 556528,
        field_name: "utm_referrer",
        field_type: "text",
    },
    REFERRER: {
        field_id: 556530,
        field_name: "referrer",
        field_type: "text",
    },
    GCLIENTID: {
        field_id: 556532,
        field_name: "gclientid",
        field_type: "text",
    },
    GCLID: {
        field_id: 556534,
        field_name: "gclid",
        field_type: "text",
    },
    FBCLID: {
        field_id: 556536,
        field_name: "fbclid",
        field_type: "text",
    },
    TRIAL_TYPE: {
        field_id: 1821801,
        field_name: "Куди і на котру записаний на пробне",
        field_type: "text",
    },
}

const EXEL_TABS = {
    BOOK_TRIAL: "Забронювали пробне",
    BOOK_TRIAL_YEARLY_ENG: "Забронювали пробне річний англійська",
    BOOK_TRIAL_YEARLY_PL: "Забронювали пробне річний польська",
    BOOK_TRIAL_YEARLY_GER: "Забронювали пробне річний німецька",
    NOT_WAS_TRIAL: "Не прийшли на пробне",
    WAS_TRIAL: "Пройшли пробне",
    NEXT_STEP_2: "Наступний крок 2",
    PROPOSITION_SEND_AFTER_TRIAL: "Пропозицію відправлено після пробного",
    IGNORE_PROPOSITION_AFTER_SEND: "Ігнор після пропозиції після пробного",
    NEXT_STEP_AFTER_TRIAL: "Наступний крок назначено після пробного",
    WAIT_PAYMENT: "Очікую оплату",
}

module.exports = {
    STATUS_ID,
    PIPELINE_ID_SALES,
    LEAD_CUSTOM_FIELDS,
    EXEL_TABS,
    PIPELINE_ID_SALES_REANIMATION,
};