const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.']
    },
    password: { 
        type: String, 
        required: true, 
        minlength: [8, 'Password must be at least 8 characters long.'] 
    },
}, { timestamps: true });

userSchema.methods.comparePassword = async function (inputPassword) {
    try {
      const isMatch = await bcrypt.compare(inputPassword, this.password);
      return isMatch;
    } catch (error) {
      throw new Error('Erreur lors de la comparaison des mots de passe');
    }
};

module.exports = mongoose.model("User", userSchema);
