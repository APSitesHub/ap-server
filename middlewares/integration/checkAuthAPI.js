require("dotenv").config();

const authAPI = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        const apiKey = process.env.API_TOKEN;
        if (apiKey !== token && bearer ) {
            return res.status(401).json("Not authorized");
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
};

module.exports = authAPI;
