const  getCRMUserName  = require("../../services/crm/getCRMUserName");

const getResponsibleUserName = async (req, res) => {
    console.log("Received request to get responsible user name");
        try {
            const { userId } = req.params;
            console.log("Received request to get responsible user name for userId:", userId);
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            const userName = await getCRMUserName(userId);
            if (!userName) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ userId, userName });
        } catch (error) {
            console.error("Error fetching responsible user name:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

module.exports = { getResponsibleUserName };