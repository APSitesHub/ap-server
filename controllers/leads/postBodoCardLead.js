const { createBodoCardLead } = require("../../services/crm/createBodoCardLead"); // Fix import to destructure the function

const postBodoCardLead = async (req, res) => {
    try {
        const dataReq = req.body;
        const dataRes = await createBodoCardLead(dataReq);
        res.status(200).json(dataRes);
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create lead",
        });
    }
};

module.exports = postBodoCardLead;