const { format } = require('date-fns');

function formatDate(timestamp) {
    const date = timestamp ? new Date(timestamp) : new Date();
    return format(date, 'dd.MM.yyyy');
}

module.exports = formatDate;
