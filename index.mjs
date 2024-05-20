import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
import {logger, errorHandler} from './middileware/common.mjs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session'; // Import cookieSession middleware
import {passport} from "./config/passport.mjs";
import {authRoutes} from "./routes/auth/auth-route.mjs";
import {userManagementRoutes} from "./middileware/user-management.mjs";

const app = express();
const port = process.env.APP_PORT || 3000; // Default port is 3000 if APP_PORT is not set

app.use(logger);
app.use(errorHandler);

app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({
        name: 'session',
        keys: ['cyberwolve'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: process.env.CLIENT_SECRET, resave: false, saveUninitialized: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/api', userManagementRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
