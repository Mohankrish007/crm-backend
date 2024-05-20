import express from 'express';
import { actionHandler } from '../../handlers/user-management/action-handler.mjs'; // Adjust path as necessary

const actionController = express.Router();

// Create a new action
actionController.post('/', async (req, res) => {
    try {
        const action = await actionHandler.createAction(req.body);
        res.status(201).json(action);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get action by ID
actionController.get('/:actionId', async (req, res) => {
    const { actionId } = req.params;
    try {
        const action = await actionHandler.getActionById(actionId);
        res.json(action);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get all actions
actionController.get('/', async (req, res) => {
    try {
        const actions = await actionHandler.getAllActions();
        res.json(actions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an action
actionController.patch('/:actionId', async (req, res) => {
    const { actionId } = req.params;
    const { body } = req;
    try {
        const updatedAction = await actionHandler.updateAction(actionId, body);
        res.json(updatedAction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an action by ID
actionController.delete('/:actionId', async (req, res) => {
    const { actionId } = req.params;
    try {
        const result = await actionHandler.deleteAction(actionId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { actionController };
