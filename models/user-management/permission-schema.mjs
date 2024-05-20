import mongoose from 'mongoose';
import {getNextSequence} from './sequence-util.mjs';

const permissionSchema = new mongoose.Schema({
    permissionId: { type: Number, unique: true }, // Auto-incrementing field
    name: {
        type: String,
        required: true,
        unique: true
    },
    module: {
        moduleId: { type: Number, required: true},
    actions: [{
        actionId: { type: Number, required: true}
    }]
    }
});

permissionSchema.pre('save', async function(next) {
    if (!this.permissionId) {
        this.permissionId = await getNextSequence('permissionId');
    }
    next();
});


const Permission = mongoose.model('Permission', permissionSchema);

export {Permission};