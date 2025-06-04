const { slugify } = require("transliteration");
const { findRoomById, newRoom } = require("./videochatRoomsServices");

const BASE_LESSON_URL = "https://academy.ap.education/room/individual";


/**
 * Prepares a lesson room for a teacher by creating a new room if it doesn't exist.
 * @param {Object} teacher - The teacher object containing the teacher's details.
 * @returns {Promise<string>} - The URL of the prepared lesson room.
 * @throws {Error} - If there is an error while preparing the lesson room.
 */
const prepareLessonRoom = async (teacher) => {
  try {
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
    return `${BASE_LESSON_URL}/${slug}`;
  } catch (error) {
    console.error("Error preparing lesson room:", error);
    throw new Error("Failed to prepare lesson room");
  }
};

module.exports = {
  prepareLessonRoom,
};
