import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    usertype: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    nombreCompleto: {
        type: String,
        trim: true,
    },
    terminos: {
        type: Boolean,
        defaul:false,
    }
}, {
    timestamps: true,
});

export default mongoose.model('user', userSchema);
