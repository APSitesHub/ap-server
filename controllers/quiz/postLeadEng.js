const { createQuizLeadEng } = require("../../services/crm/quizLeadEng"); // Fix import to destructure the function

const postLeadEng = async (req, res) => {
    try {
        const dataReq = req.body;
        const dataRes = await createQuizLeadEng(dataReq);
        if (!dataRes.engPage) {
            return res.status(400).json({
                status: "error",
                message: "Failed to create lead",
            });
        }
        res.status(200).json(dataRes);
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create lead",
        });
    }
};

module.exports = postLeadEng;