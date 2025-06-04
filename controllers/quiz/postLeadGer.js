const { createQuizLeadGer } = require("../../services/crm/quizLeadGer"); // Fix import to destructure the function

const postLeadGer = async (req, res) => {
    try {
        const dataReq = req.body;
        const dataRes = await createQuizLeadGer(dataReq);
        if (!dataRes.engPage) {
            return res.status(400).json({
                status: "error",
                message: "Failed to create lead",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Lead created successfully",
            ...dataRes
        });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create lead",
        });
    }
};

module.exports = postLeadGer;