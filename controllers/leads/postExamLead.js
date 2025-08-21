const { createExamLead } = require("../../services/crm/examLead");

const postExamLead = async (req, res) => {
  try {
    const dataReq = req.body;
    const dataRes = await createExamLead(dataReq);
    res.status(200).json(dataRes);
  } catch (error) {
    console.error("Error creating exam lead:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create exam lead",
    });
  }
};

module.exports = postExamLead;
