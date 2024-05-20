import express from 'express';
import { userRoutes , roleRoutes , actionRoutes , permissionRoutes, moduleRoutes} from '../routes/user-management/index.mjs';

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