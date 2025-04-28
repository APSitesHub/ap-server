const { createQuizLeadGer } = require("../../services/crm/quizLeadGer"); // Fix import to destructure the function

const postLeadGer = async (req, res) => {
    try {
        const data = req.body;
        await createQuizLeadGer(data);
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

module.exports = postLeadGer;