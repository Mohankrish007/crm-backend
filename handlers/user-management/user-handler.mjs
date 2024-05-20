import mongoose from 'mongoose';
import {User} from "../../models/user-management/user-schema.mjs"; // Adjust path as necessary

const userHandler = {
    async createUser(data) {
        try {
            console.info(data); // Log data for debugging
            const user = new User(data); // Create a new User object
            await user.validate(); // Trigger pre-validation hook to set userId
            await user.save(); // Save the user to the database
            return user; // Return the created user
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    },

    async getUserById(userId) {
        try {
            const user = await User.find({ userId: userId });
            if (!user) {
                throw new Error('User not found');
            }
            return user; // Return user if found
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    },

    // Get all users
    async getAllUsers() {
        try {
            const users = await User.find();
            return users; // Return all users
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    },

    // Update an user
    async updateUser(userId, data) {
        const updates = Object.keys(data);
        const allowedUpdates = ['name']; // Define allowed updates
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates');
        }

        try {
            const user = await User.updateOne({userId: userId}, data, { new: true, runValidators: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user; // Return the updated user
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    },

    // Delete an user by userId
    async deleteUser(userId) {
        try {
            const deletedUser = await User.deleteOne({userId: userId});
            if (!deletedUser) {
                throw new Error('user not found');
            }
            return { message: `Deleted user with userId: ${userId}` };
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
};

export { userHandler };