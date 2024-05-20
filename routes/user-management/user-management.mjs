import express from 'express';
import { userRoutes } from './user-route.mjs';
import { roleRoutes } from './role-route.mjs';
import { actionRoutes } from './action-route.mjs';
import { permissionRoutes } from './permission-route.mjs';
import { moduleRoutes } from "./module-route.mjs";

const userManagementRoutes = express.Router();

// Users routes
userManagementRoutes.use('/users', userRoutes);

// Module routes
userManagementRoutes.use('/modules', moduleRoutes);

// Actions routes
userManagementRoutes.use('/actions', actionRoutes);

// Permissions routes
userManagementRoutes.use('/permissions', permissionRoutes);

// Roles routes
userManagementRoutes.use('/roles', roleRoutes);

export { userManagementRoutes };