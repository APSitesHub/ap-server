const mongoose = require('mongoose');
const PedagogiumUsers = require('../db/models/pedagogiumUsers');
require('dotenv').config();
const connectDB = require('../db/connection');

async function updateCourseNames() {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');

        // Update all users
        const result = await PedagogiumUsers.updateMany(
            {}, // empty filter to match all documents
            { $set: { courseName: 'Logistics' } }
        );

        console.log(`Updated ${result.modifiedCount} users with courseName 'Logistics'`);

        // Verify the update
        const verifyCount = await PedagogiumUsers.countDocuments({ courseName: 'Logistics' });
        console.log(`Total users with courseName 'Logistics': ${verifyCount}`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Update error:', error);
        process.exit(1);
    }
}

// Run update
updateCourseNames();
