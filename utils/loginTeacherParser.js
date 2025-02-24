const { allTeachers } = require("../services/teachersServices");

async function loginTeacherParser() {
  const teachers = await allTeachers();
  const parsingTeachers = teachers
    .filter((teacher) => teacher.login.startsWith("teacher"))
    .map((teacher) => {
      return {
        id: teacher._id.toString(),
        name: teacher.name,
        teacherId: teacher.login.substring("teacher".length),
      };
    });

  console.log(parsingTeachers);
}

module.exports = { loginTeacherParser };