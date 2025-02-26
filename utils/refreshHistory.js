// !!! DO NOT USE IT IF YOU NOT UNDERSTAND WHAT IT DO
// const { format } = require('date-fns');
// const Users = require('../db/models/usersModel');

// async function refreshHistory(userId) {
//     try {
//         const user = await Users.findById(userId);
//         if (!user) {
//             throw new Error('User not found');
//         }

//         const formattedVisitedTime = user.visitedTime
//             .map(dateStr => format(new Date(dateStr), 'dd.MM.yyyy'))
//             .filter((date, index, self) => self.indexOf(date) === index); // Remove duplicates

//         await Users.findByIdAndUpdate(userId, { visited: formattedVisitedTime }, { new: true });
//         console.log(`User ${userId} history updated successfully.`);
//     } catch (error) {
//         console.error(`Error updating user ${userId} history:`, error);
//     }
// }

// module.exports = refreshHistory;
