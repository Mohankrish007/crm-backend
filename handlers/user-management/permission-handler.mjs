import { Permission } from '../../models/user-management/permission-schema.mjs';

const permissionHandler = {
    async createPermission(data) {
        try {
            const permission = new Permission(data); // Create a new Permission object
            await permission.validate(); // Trigger pre-validation hook to set permissionId
            await permission.save(); // Save the permission to the database
            return permission; // Return the created permission
        } catch (error) {
            throw new Error(`Failed to create permission: ${error.message}`);
        }
    },

    // Get permission by permissionId
    async getPermissionById(permissionId) {
        try {
            const permission = await Permission.findOne({permissionId: permissionId});
            return permission; // Return permission
        } catch (error) {
            throw new Error(`Failed to fetch actions: ${error.message}`);
        }
    },

    // Get all permissions
    async getAllPermissions() {
        try {
            const permissions = await Permission.find();
            return permissions; // Return all permissions
        } catch (error) {
            throw new Error(`Failed to fetch actions: ${error.message}`);
        }
    },

    // Update  permission
    async updatePermission(permissionId, data) {
        const updates = Object.keys(data);
        const allowedUpdates = ['permissionId','name', 'module', 'actions']; // Define allowed updates
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        }

        try {
            const permission = await Permission.updateOne({permissionId: permissionId}, data, { new: true, runValidators: true });
            if (!permission) {
                throw new Error('permission not found!');
            }
            return permission; // Return the updated permission
        } catch (error) {
            throw new Error(`Failed to update permission: ${error.message}`);
        }
    },

    // Delete permission by permissionId
    async deletePermission(permissionId) {
        try {
            const permission = await Permission.deleteOne({permissionId: permissionId});
            if (!permission) {
                throw new Error('Permission not found!');
            }
            return { message: `Deleted permission with permissionId ${permissionId}` };
        } catch (error) {
            throw new Error(`Failed to delete permission: ${error.message}`);
        }
    }
};

export { permissionHandler };