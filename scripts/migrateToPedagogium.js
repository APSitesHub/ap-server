const connectDB = require('../db/connection');
const mongoose = require('mongoose');
const UniUsers = require('../db/models/uniUsersModel');
const PedagogiumUsers = require('../db/models/pedagogiumUsers');

async function migrateUsers() {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');

        // Find all users from Pedagogium
        const pedagogiumUsers = await UniUsers.find({
            university: "Pedagogium (Wyższa Szkoła Nauk Społecznych)"
        });

        console.log(`Found ${pedagogiumUsers.length} users to migrate`);

        // Migrate each user
        const migratedUsers = await Promise.all(pedagogiumUsers.map(async (user) => {
            const userData = {
                name: user.name,
                mail: user.mail,
                password: user.password,
                crmId: user.crmId,
                contactId: user.contactId,
                pupilId: user.pupilId,
                university: user.university,
                group: user.group,
                points: user.points,
                visited: user.visited || [],
                visitedTime: user.visitedTime || [],
                token: user.token
            };

            // Check if user already exists
            const existingUser = await PedagogiumUsers.findOne({ mail: user.mail });
            if (existingUser) {
                console.log(`User ${user.mail} already exists in pedagogiumusers`);
                return null;
            }

            // Create new user in pedagogiumusers
            const newUser = new PedagogiumUsers(userData);
            await newUser.save();
            console.log(`Migrated user: ${user.mail}`);
            return newUser;
        }));

        const successfulMigrations = migratedUsers.filter(user => user !== null);
        console.log(`Successfully migrated ${successfulMigrations.length} users`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

// Run migration
migrateUsers();
