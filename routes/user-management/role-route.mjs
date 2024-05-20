import express from 'express';
import {roleController} from '../../controllers/user-management/role-controller.mjs';
const app = express();

const roleRoutes = express.Router();
app.use('/api/roles', roleRoutes);

roleRoutes.all('/:roleId?', roleController);

export {roleRoutes};