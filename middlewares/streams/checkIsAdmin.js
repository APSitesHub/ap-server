const checkIsAdmin = async (req, res, next) => {
  req.query.isAdmin
    ? next()
    : res.status(401).json({ message: "Not authorized" });
};

module.exports = checkIsAdmin;
