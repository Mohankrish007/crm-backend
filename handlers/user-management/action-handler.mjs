import mongoose from 'mongoose';
import { Action } from '../../models/user-management/action-schema.mjs'; // Adjust path as necessary

const actionHandler = {
    // Create a new action
    async createAction(data) {
        try {
            console.info(data); // Log data for debugging
            const action = new Action(data); // Create a new Action object
            await action.validate(); // Trigger pre-validation hook to set moduleId
            await action.save(); // Save the action to the database
            return action; // Return the created action
        } catch (error) {
            throw new Error(`Failed to create action: ${error.message}`);
        }
    },

    // Get action by id
    async getActionById(actionId) {
        try {
            const action = await Action.find({ actionId: actionId });
            if (!action) {
                throw new Error('Action not found');
            }
            return action; // Return action if found
        } catch (error) {
            throw new Error(`Failed to fetch action: ${error.message}`);
        }
    },

    // Get all actions
    async getAllActions() {
        try {
            const actions = await Action.find();
            return actions; // Return all actions
        } catch (error) {
            throw new Error(`Failed to fetch actions: ${error.message}`);
        }
    },

    // Update an action
    async updateAction(actionId, data) {
        const updates = Object.keys(data);
        const allowedUpdates = ['name']; // Define allowed updates
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates');
        }

        try {
            const action = await Action.updateOne({actionId: actionId}, data, { new: true, runValidators: true });
            if (!action) {
                throw new Error('Action not found');
            }
            return action; // Return the updated action
        } catch (error) {
            throw new Error(`Failed to update action: ${error.message}`);
        }
    },

    // Delete an action by ID
    async deleteAction(actionId) {
        try {
            const deletedAction = await Action.deleteOne({actionId: actionId});
            if (!deletedAction) {
                throw new Error('Action not found');
            }
            return { message: `Deleted action with actionId: ${actionId}` };
        } catch (error) {
            throw new Error(`Failed to delete action: ${error.message}`);
        }
    }
};

export { actionHandler };