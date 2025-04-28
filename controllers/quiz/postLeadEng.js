const { createQuizLeadEng } = require("../../services/crm/quizLeadEng"); // Fix import to destructure the function

const postLeadEng = async (req, res) => {
    try {
        const data = req.body;
        await createQuizLeadEng(data);
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

module.exports = postLeadEng;