import express from 'express';
import {permissionController} from '../../controllers/user-management/permission-controller.mjs';
const app = express();

const permissionRoutes = express.Router();

app.use('/api/permissions', permissionRoutes);
permissionRoutes.all('/:permissionId?', permissionController);

export {permissionRoutes};