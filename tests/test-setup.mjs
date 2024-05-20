import express from 'express';
import supertest from 'supertest';
import * as chai from 'chai';
import dotenv from 'dotenv';
dotenv.config();

// Importing route handlers
import { userRoutes} from '../routes/user-management/user-route.mjs';
import { roleRoutes } from '../routes/user-management/role-route.mjs';
import { actionRoutes} from '../routes/user-management/action-route.mjs';
import { permissionRoutes } from '../routes/user-management/permission-route.mjs';
import { moduleRoutes} from '../routes/user-management/module-route.mjs';

const expect = chai.expect;

// Create a test application using Express
const testApp = express();

// Mounting routes
testApp.use(express.json());
testApp.use('/users', userRoutes);
testApp.use('/modules', moduleRoutes);
testApp.use('/roles', roleRoutes);
testApp.use('/actions', actionRoutes);
testApp.use('/permissions', permissionRoutes);

// Exporting the test application
export default testApp;

// Creating a Supertest agent for making HTTP requests
export const request = supertest(testApp);