const { newTeacher } = require("../../services/pedagogiumTeachersServices");

const addTeacher = async (req, res) => {
  console.log('addTeacher', req.body);
  res.status(201).json(await newTeacher({ ...req.body }));
};

module.exports = addTeacher;
