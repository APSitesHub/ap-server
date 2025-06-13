const PedagogiumUsers = require('../db/models/pedagogiumUsers');

const pedagogiumUsersServices = {
    // Create new user
    createUser: async (userData) => {
        try {
            const user = new PedagogiumUsers(userData);
            return await user.save();
        } catch (error) {
            console.error('Error creating pedagogium user:', error);
            throw error;
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        try {
            return await PedagogiumUsers.findById(id);
        } catch (error) {
            console.error('Error getting pedagogium user:', error);
            throw error;
        }
    },

    // Get user by email
    getUserByEmail: async (email) => {
        try {
            return await PedagogiumUsers.findOne({ email });
        } catch (error) {
            console.error('Error getting pedagogium user by email:', error);
            throw error;
        }
    },

    // Get user by lead ID
    getUserByLeadId: async (leadId) => {
        try {
            return await PedagogiumUsers.findOne({ leadId });
        } catch (error) {
            console.error('Error getting pedagogium user by lead ID:', error);
            throw error;
        }
    },

    // Update user
    updateUser: async (id, updateData) => {
        try {
            return await PedagogiumUsers.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            console.error('Error updating pedagogium user:', error);
            throw error;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            return await PedagogiumUsers.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting pedagogium user:', error);
            throw error;
        }
    },

    // Get all users
    getAllUsers: async () => {
        try {
            return await PedagogiumUsers.find();
        } catch (error) {
            console.error('Error getting all pedagogium users:', error);
            throw error;
        }
    },
};

module.exports = pedagogiumUsersServices;
