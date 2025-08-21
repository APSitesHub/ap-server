const { format } = require('date-fns');
const { formatInTimeZone } = require('date-fns-tz');


function formatDate(timestamp) {
    const date = timestamp ? new Date(timestamp * 1000) : new Date();
    return format(date, 'dd.MM.yyyy HH:mm');
}

function toSheetsDate(timestamp) {
    const date = timestamp ? new Date(timestamp * 1000) : new Date();
    return format(date, 'dd.MM.yyyy');
}

function toLocalTime(timestamp) {
    const date = timestamp ? new Date(timestamp * 1000) : new Date();
    const kievTime = formatInTimeZone(date, 'Europe/Kiev', 'dd.MM.yyyy');
    return kievTime;
}

module.exports = { formatDate, toSheetsDate, toLocalTime };
