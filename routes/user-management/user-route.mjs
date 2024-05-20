import express from 'express';

import {userController} from '../../controllers/user-management/user-controller.mjs';

const app = express();

const userRoutes = express.Router();

app.use('/api/users', userRoutes);
userRoutes.all('/:userId?', userController);

export {userRoutes};