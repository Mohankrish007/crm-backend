import express from 'express';
import {authController} from '../../controllers/auth/auth-controller.mjs'; // Adjust the path as necessary

const authRoutes = express.Router();

// Google authentication routes
authRoutes.get('/google', authController.googleAuth);
authRoutes.get('/google/callback', authController.googleCallback);

// Instagram authentication routes
authRoutes.get('/instagram', authController.instagramAuth);
authRoutes.get('/instagram/callback', authController.instagramCallback);

// Successful authentication route
authRoutes.get('/login/success', authController.loginSuccess);

// Failed authentication route
authRoutes.get('/login/failed', authController.loginFailed);

// Logout route
authRoutes.get('/logout', authController.logout);

// Signup Route
authRoutes.post('/signup', authController.signup);

// Login Route
authRoutes.post('/login', authController.login);

export { authRoutes };