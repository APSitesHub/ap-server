const { findTeacherByAltegioID } = require("./teachersServices");
const { slugify } = require("transliteration");
const { findRoomById, newRoom } = require("./videochatRoomsServices");

const BASE_LESSON_URL = "https://academy.ap.education/room/individual";

const prepareLessonRoom = async (teacherAltegioId) => {
  try {
    const teacher = await findTeacherByAltegioID(teacherAltegioId);

    const slug = slugify(teacher.name, { lowercase: true });
    const room = await findRoomById(slug);

    if (!room) {
      const room = {
        id: slug,
        name: `individual lesson with ${slug}`,
        type: "individual",
        roomAdmin: teacher.login,
      };

      await newRoom(room);
    }
    return {
      roomLink: `${BASE_LESSON_URL}/${slug}`,
      teacher: {
        login: teacher.login,
        password: teacher.password,
      },
    };
  } catch (error) {
    console.error("Error preparing lesson room:", error);
    throw new Error("Failed to prepare lesson room");
  }
};

module.exports = {
  prepareLessonRoom,
};
