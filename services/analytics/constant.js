const PIPELINE_ID_SALES = 6453287;

const STATUS_ID = {
    BOOK_TRIAL: 54980099,
    BOOK_TRIAL_YEARLY_ENG: 63191344,
    BOOK_TRIAL_YEARLY_PL: 63191352,
    BOOK_TRIAL_YEARLY_GER: 63191348,
    WAS_TRIAL: 58580615,
    NOT_WAS_TRIAL: 58580611,
    NEXT_STEP_2: 56563927,
    PROPOSITION_SEND_AFTER_TRIAL: 56563935,
    IGNORE_PROPOSITION_AFTER_SEND: 56563939,
    NEXT_STEP_AFTER_TRIAL: 56563943,
    WAIT_PAYMENT: 54980155,
};

const LEAD_CUSTOM_FIELDS = {
    TEACHER_ON_TRIAL: {
        field_id: 1807140,
        field_name: "Дата і час запису на пробне заняття",
    },
    DATETIME_TRIAL: {
        field_id: 1806904,
        field_name: "Дата та час пробного",
    },

}


module.exports = {
    STATUS_ID,
    PIPELINE_ID_SALES,
};