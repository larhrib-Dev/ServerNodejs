const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    joined: { type: Date, default: new Date() }
});

UserSchema.pre('save', async function(next) {
    // Check is new account, or password is modified
    if (!this.isModified('password')) {
        return next();
    }
    // Encrypt the password
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch(e) {
        return next(e);
    }
});


UserSchema.methods.isPasswordMatch = function(password, hashPassword, callback) {
    bcrypt.compare(password, hashPassword, (err, success) => {
        if (err) return callback(err);
        callback(null, success);
    });
}


module.exports = mongoose.model('User', UserSchema);