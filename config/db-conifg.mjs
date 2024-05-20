import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_DB_CONNECTION_URL;
console.log(uri);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Example: 30 seconds timeout
};

const connectDB = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

// Call closeDB when your application shuts down
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});

export { connectDB };
