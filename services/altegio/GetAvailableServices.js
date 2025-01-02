const axios = require("axios");

const category = {
    category_eng: [
        { id: 12291759, title: 'Англійська' },
        { id: 12291803, title: 'Англійська Вечірні години' },
    ],
    category_pl: [
        { id: 12292266, title: 'Польська' },
        { id: 12292362, title: 'Польська Вечірні години' },
    ],
    category_de: [
        { id: 12292979, title: 'Німецька' },
    ],
};

/**
 * Fetches available services based on the specified language.
 *
 * @param {string} [lang] - Language filter ('ENG', 'PL', 'DE'). If not specified, all languages are returned.
 * @returns {Promise<Object|Array>} A list of filtered services or an object containing all services grouped by language.
 */
async function GetAvailableServices(lang) {
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
    const apiUrl = `https://api.alteg.io/api/v1/book_services/${companyId}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Accept: "application/vnd.api.v2+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${companyToken}`,
            },
        });

        if (!response.data.success) {
            throw new Error("API call unsuccessful");
        }

        const listAvailableServices = response.data.data.services;
        let services = []

        if (lang && lang.toUpperCase().includes('ENG')) {
            console.log(lang.toUpperCase());
            const servicesEng = _extractServices(listAvailableServices, category.category_eng);
            console.log(servicesEng);
            services = [...services, ...servicesEng];
            console.log(services);
        }

        if(lang && lang.toUpperCase().includes('PL')) {
            const servicesPL = _extractServices(listAvailableServices, category.category_pl);
            services = [...services, ...servicesPL];
        }
        if(lang && lang.toUpperCase().includes('DE')) {
            const servicesDE = _extractServices(listAvailableServices, category.category_de);
            services = [...services, ...servicesDE];
        }
        if(!lang) {
            const servicesEng = _extractServices(listAvailableServices, category.category_eng);
            const servicesPL = _extractServices(listAvailableServices, category.category_pl);
            const servicesDE = _extractServices(listAvailableServices, category.category_de);
            services = {
                servicesEng,
                servicesDE,
                servicesPL
            }
        }
        return services

    } catch (error) {
        console.error("Error fetching services:", error.message);
        throw error;
    }
}

/**
 * Extracts services based on categories.
 *
 * @param {Array} listAvailableServices - List of all available services.
 * @param {Array} categories - Categories to filter services by.
 * @returns {Array} A list of services matching the specified categories.
 */

function _extractServices(listAvailableServices, categories) {
    return listAvailableServices
        .filter((service) =>
            categories.some((cat) => cat.id === service.category_id)
        )
        .map((service) => ({
            id: service.id,
            title: service.title.slice(0, -1).trim(),
            category_id: service.category_id,
            active: service.active,
        }));
}

module.exports = {
    GetAvailableServices,
};
