import bcrypt from 'bcrypt';
import {connectDB} from "../../config/db-conifg.mjs";
import {passport} from "../../config/passport.mjs";


let client =  await connectDB()
const authController = {
    googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),

    googleCallback: passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL + '/home',
        failureRedirect: '/login/failed',
    }),

    instagramAuth: passport.authenticate('instagram'),

    instagramCallback: passport.authenticate('instagram', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    }),

    loginSuccess: async (req, res) => {
        if (req.user) {
            try {
                // Access the database and the userDetails collection
                const database = client.db(process.env.MONGO_DB);
                const userDetailsCollection = database.collection(process.env.MONGO_DB_AUTH_COLLECTION);

                // Check if the user already exists in the database
                const user = await userDetailsCollection.findOne({ googleId: req.user.id });

                if (!user) {
                    // If user doesn't exist, create a new user document
                    await userDetailsCollection.insertOne({
                        googleId: req.user.id,
                        displayName: req.user.displayName,
                        email: req.user.emails[0].value,
                    });
                    console.log('New user added to userDetails collection');
                } else {
                    console.log('User already exists in userDetails collection:', user);
                }

                // Respond with success message and user details
                res.status(200).json({
                    error: false,
                    message: 'Successfully Logged In',
                    user: req.user,
                });
            } catch (err) {
                // Handle any errors
                console.error('Error creating or finding user in userDetails collection:', err);
                res.status(500).json({ error: true, message: 'Internal Server Error' });
            } finally {
                // Close the MongoDB connection
                await client.close();
            }
        } else {
            res.status(403).json({ error: true, message: 'Not Authorized' });
        }
    },

    loginFailed: (req, res) => {
        res.status(401).json({
            error: true,
            message: 'Log in failure',
        });
    },

    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json({ error: true, message: 'Logout failure' });
            }
            res.redirect(process.env.CLIENT_URL);
        });
    },

    // Function to handle MongoDB transactions
    withTransaction: async (callback) => {
        const session = client.startSession();
        session.startTransaction();
        try {
            await callback(session);
            await session.commitTransaction();
            session.endSession();
        } catch (error) {
            console.error('Transaction aborted:', error);
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    },

    signup: async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const database = client.db(process.env.MONGO_DB);
            const userCollection = database.collection(process.env.MONGO_DB_AUTH_COLLECTION);


            // Check if the user already exists
            const existingUser = await userCollection.findOne({ $or: [{ name }, { email }] });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user
            await authController.withTransaction(async (session) => {
                await userCollection.insertOne({ name, email, password: hashedPassword }, { session });
            });

            // Get the newly created user details
            const newUser = await userCollection.findOne({ name });
            console.log(newUser);

            // Send back the user details as response
            res.status(201).json({ message: 'User created successfully', userdetails: newUser });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            await client.close();
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            await client.connect(); // Connect to MongoDB
            const database = client.db(process.env.MONGO_DB);
            const userCollection = database.collection(process.env.MONGO_DB_AUTH_COLLECTION);

            // Find the user by email
            const user = await userCollection.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Verify the password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            console.log("hi")
            res.status(200).json({ message: 'Login successful', userdetails: user });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            await client.close();
        }
    }
};

export { authController };
