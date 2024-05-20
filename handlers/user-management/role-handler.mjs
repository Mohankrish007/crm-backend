import mongoose from 'mongoose';
import {Role} from "../../models/user-management/role-schema.mjs"; // Adjust path as necessary

const roleHandler = {
    async createRole(data) {
        try {
            const role = new Role(data); // Create a new role object
            await role.validate(); // Trigger pre-validation hook to set roleId
            await role.save(); // Save the role to the database
            return role; // Return the created role
        } catch (error) {
            throw new Error(`Failed to create role: ${error.message}`);
        }
    },

    async getRoleById(roleId) {
        try {
            const role = await role.find({ roleId: roleId });
            if (!role) {
                throw new Error('role not found');
            }
            return role; // Return role if found
        } catch (error) {
            throw new Error(`Failed to fetch role: ${error.message}`);
        }
    },

    // Get all roles
    async getAllRoles() {
        try {
            const roles = await role.find();
            return roles; // Return all roles
        } catch (error) {
            throw new Error(`Failed to fetch roles: ${error.message}`);
        }
    },

    // Update an role
    async updateRole(roleId, data) {
        const updates = Object.keys(data);
        const allowedUpdates = ['name', 'permissions']; // Define allowed updates
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates');
        }

        try {
            const role = await Role.updateOne({roleId: roleId}, data, { new: true, runValidators: true });
            if (!role) {
                throw new Error('role not found');
            }
            return role; // Return the updated role
        } catch (error) {
            throw new Error(`Failed to update role: ${error.message}`);
        }
    },

    // Delete an role by roleId
    async deleteRole(roleId) {
        try {
            const deletedRole = await Role.deleteOne({roleId: roleId});
            if (!deletedRole) {
                throw new Error('role not found');
            }
            return { message: `Deleted role with roleId: ${roleId}` };
        } catch (error) {
            throw new Error(`Failed to delete role: ${error.message}`);
        }
    }
};

export { roleHandler };