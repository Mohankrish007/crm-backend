import mongoose from 'mongoose';
import {getNextSequence} from './sequence-util.mjs';
 const actionSchema = new mongoose.Schema({
    actionId: { type: Number, unique: true }, // Auto-incrementing field
    name: {
        type: String, required: true, unique: true
    }
});

actionSchema.pre('save', async function(next) {
    if (!this.actionId) {
        this.actionId = await getNextSequence('actionId');
    }
    next();
});

const Action = mongoose.model('Action', actionSchema);

export { Action };