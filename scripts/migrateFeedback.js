const mongoose = require('mongoose');
const ScTest = require('../db/models/testScUsersModel');
const connectDB = require('../db/connection');

async function migrateFeedback() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        const users = await ScTest.find({ 
            feedback: { 
                $exists: true, 
                $ne: [] 
            }
        }).lean();
        
        console.log(`Found ${users.length} users with feedback`);

        for (const user of users) {
            if (!Array.isArray(user.feedback)) {
                console.log(`Skipping user ${user.name || user.mail} - feedback is not an array`);
                continue;
            }

            const newFeedback = user.feedback.map(feedbackStr => {
                if (typeof feedbackStr !== 'string') {
                    console.log('Invalid feedback format:', feedbackStr);
                    return null;
                }
                // Extract date and createdAt using regex
                const dateMatch = feedbackStr.match(/відгук за заняття (\d{1,2}\.\d{1,2}\.\d{4}):/);
                const createdAtMatch = feedbackStr.match(/(\d{2}\.\d{2}\.\d{4}),\s*(\d{2}:\d{2}:\d{2})/);
                
                if (!dateMatch || !createdAtMatch) {
                    console.log('Could not parse date from feedback:', feedbackStr);
                    return null;
                }

                const date = dateMatch[1];
                const createdAtStr = `${createdAtMatch[1]} ${createdAtMatch[2]}`;
                const createdAt = new Date(
                    createdAtStr.split('.').reverse().join('-').replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1')
                );

                return {
                    _id: new mongoose.Types.ObjectId(),
                    createdAt,
                    text: feedbackStr,
                    date,
                    // Copy the ratings from user's current fields
                    activity: user.activity || 0,
                    grammar: user.grammar || 0,
                    lexis: user.lexis || 0,
                    listening: user.listening || 0,
                    speaking: user.speaking || 0
                };
            }).filter(f => f !== null);

            // Update user with new feedback format
            await ScTest.updateOne(
                { _id: user._id },
                { 
                    $set: { 
                        feedback: newFeedback 
                    }
                }
            );
            console.log(`Updated feedback for user ${user.name || user.mail}`);
        }

        console.log('Migration completed');
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

migrateFeedback();
