import express from 'express';
import {actionController} from '../../controllers/user-management/action-controller.mjs';
const app = express();

const actionRoutes = express.Router();

app.use('/api/actions', actionRoutes);
actionRoutes.all('/:actionId?', actionController);

export {actionRoutes};