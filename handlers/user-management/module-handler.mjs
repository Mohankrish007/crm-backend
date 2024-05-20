import { Module } from '../../models/user-management/module-schema.mjs';
import {Action} from "../../models/user-management/index.mjs"; // Adjust path as necessary

const moduleHandler = {
    // Create a new module
    async createModule(data) {
        try {
            console.info(data); // Log data for debugging
            const module = new Module(data); // Create a new Module object
            await module.validate(); // Trigger pre-validation hook to set moduleId
            await module.save(); // Save the module to the database
            return module; // Return the created module
        } catch (error) {
            throw new Error(`Failed to create module: ${error.message}`);
        }
    },

    // Get module by id
    async getModuleById(moduleId) {
        try {
            const modules = await Module.findOne({moduleId: moduleId});
            return modules; // Return module
        } catch (error) {
            throw new Error(`Failed to fetch actions: ${error.message}`);
        }
    },

    // Get all modules
    async getAllModules() {
        try {
            const modules = await Module.find();
            return modules; // Return all modules
        } catch (error) {
            throw new Error(`Failed to fetch actions: ${error.message}`);
        }
    },

    // Update an module
    async updateModule(moduleId, data) {
        const updates = Object.keys(data);
        const allowedUpdates = ['name']; // Define allowed updates
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        }

        try {
            const module = await Module.updateOne({moduleId: moduleId}, data, { new: true, runValidators: true });
            if (!module) {
                throw new Error('Module not found!');
            }
            return module; // Return the updated module
        } catch (error) {
            throw new Error(`Failed to update module: ${error.message}`);
        }
    },

    // Delete module by moduleId
    async deleteModule(moduleId) {
        try {
            const module = await Module.deleteOne({moduleId: moduleId});
            if (!module) {
                throw new Error('Module not found!');
            }
            return { message: `Deleted module with moduleId: ${moduleId}` };
        } catch (error) {
            throw new Error(`Failed to delete module: ${error.message}`);
        }
    }
};

export { moduleHandler };