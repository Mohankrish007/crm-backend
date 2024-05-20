import express from 'express';
import { userHandler } from '../../handlers/user-management/user-handler.mjs'; // Adjust path as necessary

const userController = express.Router();

// Create a new user
userController.post('/', async (req, res) => {
    try {
        const user = await userHandler.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get user by ID
userController.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userHandler.getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get all users
userController.get('/', async (req, res) => {
    try {
        const users = await userHandler.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an user
userController.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { body } = req;
    try {
        const updateduser = await userHandler.updateUser(userId, body);
        res.json(updateduser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an user by ID
userController.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await userHandler.deleteUser(userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { userController };