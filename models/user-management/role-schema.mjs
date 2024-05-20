import mongoose from 'mongoose';
import {getNextSequence} from './sequence-util.mjs';

const roleSchema = new mongoose.Schema({
    roleId: { type: Number, unique: true }, // Auto-incrementing field
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        permissionId: {type: Number},
    }]
});

roleSchema.pre('save', async function(next) {
    if (!this.roleId) {
        this.roleId = await getNextSequence('roleId');
    }
    next();
});


const Role = mongoose.model('Role', roleSchema);

export { Role };
