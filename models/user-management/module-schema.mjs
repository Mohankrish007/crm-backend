import mongoose from 'mongoose';
import {getNextSequence} from './sequence-util.mjs';

 const moduleSchema = new mongoose.Schema({
    moduleId: { type: Number, unique: true }, // Auto-incrementing field
    name: {
        type: String, required: true, unique: true
    }
});

moduleSchema.pre('save', async function(next) {
    if (!this.moduleId) {
        this.moduleId = await getNextSequence('moduleId');
    }
    next();
});


const Module = mongoose.model('Module', moduleSchema);

export { Module} ;