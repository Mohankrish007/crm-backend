import express from 'express';
import { roleHandler } from '../../handlers/user-management/role-handler.mjs'; // Adjust path as necessary

const roleController = express.Router();

// Create a new role
roleController.post('/', async (req, res) => {
    try {
        const role = await roleHandler.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get role by roleId
roleController.get('/:roleId', async (req, res) => {
    const { roleId } = req.params;
    try {
        const role = await roleHandler.getRoleById(roleId);
        res.json(role);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get all roles
roleController.get('/', async (req, res) => {
    try {
        const roles = await roleHandler.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a role
roleController.patch('/:roleId', async (req, res) => {
    const { roleId } = req.params;
    const { body } = req;
    try {
        const updatedAction = await roleHandler.updateRole(roleId, body);
        res.json(updatedAction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a role by roleId
roleController.delete('/:roleId', async (req, res) => {
    const { roleId } = req.params;
    try {
        const result = await roleHandler.deleteRole(roleId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { roleController };