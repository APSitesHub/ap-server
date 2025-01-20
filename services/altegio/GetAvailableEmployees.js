const axios = require('axios');

/**
 * Fetches a list of employees available for booking.
 *
 * @param {Array<number>} serviceIds - (Optional) An array of service IDs to filter by.
 * @param {string} datetime - (Optional) The ISO8601 format date to filter employees by service booking date.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} - The response data containing available employees.
 */

// Constants for mapping employee positions this is di from service category Altegio
const EMPLOYEE_POSITIONS_MAP ={
    DE: [236498, 243610],
    EN: [243610, 237085],
    PL: [237084],
}

const KNOWLEDGE_MAP = {
    A0 : ['NS', 'SN','N'],
    A1 : ['NS', 'SN','N'],
    A2 : ['NS', 'SN','N', 'J'],
    B1 : ['NS', 'SN','J', 'M'],
    B2 : ['NS', 'SN','J', 'M', 'S'],
    C1 : ['NS', 'SN','J', 'M', 'S']
}

// service ids by language only for 1h(55min) individual lessons get from Altegio
const SERVICE_IDS_BYLANG = {
    EN: [243610],
    DE: [236498],
    PL: [237084],
};

  async function GetAvailableEmployees(serviceIds = [], datetime = null, user) {
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
    const apiUrl = `https://api.alteg.io/api/v1/book_staff/${companyId}`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Accept: 'application/vnd.api.v2+json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${companyToken}`,
            },
            params: {
                service_ids: serviceIds, // Convert array to comma-separated string
                datetime: datetime || '',
            },
        });
        if (response.data.success) {
            const employees = filterEmployees(response.data.data, user.lang, user.knowledge, user.age);
            return employees;
        } else {
            throw new Error('API returned a failure status.');
        }
    } catch (error) {
        console.error('Error', error);
        console.error('Error fetching available employees:', error.message);
        throw error;
    }
}

function filterEmployees(employees, lang, knowledge, age) {
    let filteredEmployees = [];
    if(lang.includes("/")){
        const lang1 = lang.split("/")[0];
        const lang2 = lang.split("/")[1];
        const formattedLang1 = lang1.toUpperCase();
        const formattedLang2 = lang2.toUpperCase();
        const filteredEmployeesByLang = employees.filter((employee) => EMPLOYEE_POSITIONS_MAP[formattedLang1].some(id => id === employee.position_id) || EMPLOYEE_POSITIONS_MAP[formattedLang2].some(id => id === employee.position_id));
        const filteredEmployeesByLvl = knowledgeFilter(filteredEmployeesByLang, knowledge);
        const filteredByStatus = filetFiredEmployees(filteredEmployeesByLvl);
        const filteredByAge = filterByAge(filteredByStatus, age);
        filteredEmployees = filteredByAge;

    } else {
        const formattedLang = lang.toUpperCase();
        const filteredEmployeesByLang =  employees.filter(employee => EMPLOYEE_POSITIONS_MAP[formattedLang].some(id => id === employee.position_id));
        const filteredEmployeesByLvl = knowledgeFilter(filteredEmployeesByLang, knowledge);
        const filteredByStatus =  filetFiredEmployees(filteredEmployeesByLvl);
        const filteredByAge = filterByAge(filteredByStatus, age);
        filteredEmployees = formatEmployeesName(filteredByAge);
    }
    return filteredEmployees;
}

function formatEmployeesName(employees) {
    return employees.map(employee => {
       const strArr =  employee.name.split(' ')
        return {
            ...employee,
            name: `${strArr[0]} ${strArr[1]}`,
        }
    });
}

function knowledgeFilter( employees, knowledge) {
    if(knowledge.includes('/')) {
        const knowledge1 = knowledge.split('/')[0].toUpperCase();
        const knowledge2 = knowledge.split('/')[1].toUpperCase();
        return employees.filter(employee => KNOWLEDGE_MAP[knowledge1].some(lvl => employee.name.includes(lvl))
            || KNOWLEDGE_MAP[knowledge2].some(lvl => employee.name.includes(lvl)));
    }
    return employees.filter(employee => KNOWLEDGE_MAP[knowledge.toUpperCase()].some(lvl => employee.name.includes(lvl)));
}

function filetFiredEmployees(employees) {
    return employees.filter((employe) => {
       return !(employe.name.includes('ЗВІЛЬНЕНО') || employe.name.includes('ВЕБІНАРИ'))
    });  
}

function filterByAge(employees, age) {
    return age > 16 ? employees.filter(employee => !employee.name.toUpperCase().includes('ONLY CHILDREN')) : employees.filter(employee => !employee.name.toUpperCase().includes('NO CHILDREN'));
}
module.exports = {
    GetAvailableEmployees,
};
