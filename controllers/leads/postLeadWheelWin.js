const { createWheelWinLead } = require("../../services/crm/wheelWinLead");

const postLeadWheelWin = async (req, res) => {
  try {
    const dataReq = req.body;
    const dataRes = await createWheelWinLead(dataReq);
    res.status(200).json(dataRes);
  } catch (error) {
    console.error("Error creating wheel win lead:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create wheel win lead",
    });
  }
};

module.exports = postLeadWheelWin;