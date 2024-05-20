import mongoose from 'mongoose';
import {getNextSequence} from './sequence-util.mjs';

const userSchema = new mongoose.Schema({
    userId: {type: Number, unique: true}, // Auto-incrementing field
    userName: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        roleId: {type: Number}
    }]
});

userSchema.pre('save', async function (next) {
    if (!this.userId) {
        this.userId = await getNextSequence('userId');
    }
    next();
});


const User = mongoose.model('User', userSchema);

export {User};
