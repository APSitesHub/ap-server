const { findTeacherByAltegioID } = require("./teachersServices");
const { slugify } = require("transliteration");
const { findRoomById, newRoom } = require("./videochatRoomsServices");

const BASE_LESSON_URL = "https://academy.ap.education/room/individual";

const prepareLessonRoom = async (teacherAltegioId) => {
  const teacher = await findTeacherByAltegioID(teacherAltegioId);
  const slug = slugify(teacher.name, { lowercase: true });

  const room = await findRoomById(slug);

  if (!room) {
    console.log("Room not found, creating a new one");
    const room = {
      id: slug,
      name: `individual lesson with ${slug}`,
      roomAdmin: teacher.login,
    };

    await newRoom(room);
    console.log("New room created:", room);
  } else {
    console.log("Room found:", room);
  }

  return {
    roomLink: `${BASE_LESSON_URL}/${slug}`,
    teacher: {
      login: teacher.login,
      password: teacher.password,
    },
  };
};

module.exports = {
  prepareLessonRoom,
};
