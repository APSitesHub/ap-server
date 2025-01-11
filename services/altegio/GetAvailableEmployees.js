const axios = require('axios');

/**
 * Fetches a list of employees available for booking.
 *
 * @param {Array<number>} serviceIds - (Optional) An array of service IDs to filter by.
 * @param {string} datetime - (Optional) The ISO8601 format date to filter employees by service booking date.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} - The response data containing available employees.
 */
// const ServicesMap = {
//     EN: {
//       N: {
//         "Групове заняття": [12392201, 12291774],
//         "Парне заняття": 12291770,
//         "Індивідуальне заняття": 12291769,
//         "Індивідуальне заняття 1.5 год": 12291776,
//         "Індивідуальне заняття півгодини": 12291775,
//       },
//       J: {
//         "Групове заняття": 12291782,
//         "Парне заняття": 12291779,
//         "Індивідуальне заняття": 12291778,
//         "Індивідуальне заняття 1.5 год": 12291784,
//         "Індивідуальне заняття півгодини": 12291783,
//       },
//       M: {
//         "Групове заняття": 12291787,
//         "Парне заняття": 12291786,
//         "Індивідуальне заняття": 12291785,
//         "Індивідуальне заняття 1.5 год": 12291790,
//         "Індивідуальне заняття півгодини": 12291789,
//       },
//       S: {
//         "Групове заняття": 12291795,
//         "Парне заняття": 12291794,
//         "Індивідуальне заняття": 12291793,
//         "Індивідуальне заняття 1.5 год": 12291800,
//         "Індивідуальне заняття півгодини": 12291799,
//       },
//     },
//     PL: {
//       N: {
//         "Групове заняття": [12392237, 12292274],
//         "Парне заняття": 12292273,
//         "Індивідуальне заняття": 12292268,
//         "Індивідуальне заняття 1.5 год": 12292280,
//         "Індивідуальне заняття півгодини": 12292279,
//       },
//       J: {
//         "Групове заняття": 12292287,
//         "Парне заняття": 12292285,
//         "Індивідуальне заняття": 12292284,
//         "Індивідуальне заняття 1.5 год": 12292298,
//         "Індивідуальне заняття півгодини": 12292296,
//       },
//       M: {
//         "Групове заняття": 12292303,
//         "Парне заняття": 12292301,
//         "Індивідуальне заняття": 12292300,
//         "Індивідуальне заняття 1.5 год": 12292309,
//         "Індивідуальне заняття півгодини": 12292307,
//       },
//       S: {
//         "Групове заняття": 12292340,
//         "Парне заняття": 12292338,
//         "Індивідуальне заняття": 12292337,
//         "Індивідуальне заняття 1.5 год": 12292346,
//         "Індивідуальне заняття півгодини": 12292344,
//       },
//     },
//     DE: {
//       N: {
//         "Групове заняття": 12292982,
//         "Парне заняття": 12292981,
//         "Індивідуальне заняття": 12292980,
//         "Індивідуальне заняття 1.5 год": 12292985,
//         "Індивідуальне заняття півгодини": 12292983,
//       },
//       J: {
//         "Групове заняття": 12292989,
//         "Парне заняття": 12292988,
//         "Індивідуальне заняття": 12292987,
//         "Індивідуальне заняття 1.5 год": 12292993,
//         "Індивідуальне заняття півгодини": 12292992,
//       },
//       M: {
//         "Групове заняття": 12293000,
//         "Парне заняття": 12292999,
//         "Індивідуальне заняття": 12292994,
//         "Індивідуальне заняття 1.5 год": 12293006,
//         "Індивідуальне заняття півгодини": 12293004,
//       },
//       S: {
//         "Групове заняття": 12293011,
//         "Парне заняття": 12293010,
//         "Індивідуальне заняття": 12293007,
//         "Індивідуальне заняття 1.5 год": 12293015,
//         "Індивідуальне заняття півгодини": 12293013,
//       },
//     },
//   };

const EMPLOYEE_POSITIONS_MAP ={
    DE: [236498, 243610],
    EN: [243610, 237085],
    PL: 2
}

const KNOWLEDGE_MAP = {
    A0 : ['N'],
    A1 : ['N'],
    A2 : ['N', 'J'],
    B1 : ['J', 'M'],
    B2 : ['J', 'M', 'S'],
    C1 : ['J', 'M', 'S']
}
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
        filteredEmployees = formatEmployeesName(filteredByAge);

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
