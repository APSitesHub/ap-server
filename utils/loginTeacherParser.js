const mongoose = require("mongoose");
const { allTeachers } = require("../services/teachersServices");

async function loginTeacherParser() {
  await connectDB();
  const teachers = await allTeachers();

  const parsingTeachers = teachers
    .filter(teacher => teacher.login.startsWith('teacher'))
    .map((teacher) => {
      return {
        id: teacher._id.toString(),
        name: teacher.name,
        teacherId: teacher.login.substring('teacher'.length)
      }
    });

  console.log(parsingTeachers);
};

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://dev_olexandr:gFTKCGtxYnWkbxQo@aggregator.oez88xk.mongodb.net/aggregator-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

loginTeacherParser();