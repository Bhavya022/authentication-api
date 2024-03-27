// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    phone: String,
    photo: String,
    isPublic: { type: Boolean, default: true }, // Field to indicate if the profile is public or private
    isAdmin: { type: Boolean, default: false } // Field to indicate if the user is an admin
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords
userSchema.methods.isValidPassword = async function(password) {
    try {
        if (!password ) {
            throw new Error('Invalid password');
        }
         console.log(password,this.password);
        const isMatch = await bcrypt.compare(password, this.password); 
        //console.log(isMatch) 
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
