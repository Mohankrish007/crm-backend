import express from 'express';
import {moduleController} from '../../controllers/user-management/module-controller.mjs';

const app = express();

const moduleRoutes = express.Router();

app.use('/api/modules', moduleRoutes);
moduleRoutes.all('/:moduleId?', moduleController);

export {moduleRoutes};