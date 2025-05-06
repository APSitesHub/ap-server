const { createPartnerLeadNMT } = require("../../services/crm/partnerLeadNMT"); // Fix import to destructure the function

const postPartnerLeadNMT = async (req, res) => {
    try {
        const data = req.body;
        await createPartnerLeadNMT(data);
        res.status(200).json({
            status: "success",
            message: "Lead created successfully",
        });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create lead",
        });
    }
};

module.exports = postPartnerLeadNMT;