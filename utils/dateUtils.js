const { format } = require('date-fns');

function formatDate(timestamp) {
    const date = timestamp ? new Date(timestamp * 1000) : new Date();
    return format(date, 'dd.MM.yyyy HH:mm');
}

function toSheetsDate(timestamp) {
    return timestamp ? new Date(timestamp * 1000) : new Date();
}

module.exports = { formatDate, toSheetsDate };
