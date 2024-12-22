const User = require('../models/users.models');

const createUser = async (userData) => {
        const newUser = new User(userData);
        return await newUser.save();
};

const getUserByEmail = async (email) => {
        return await User.findOne({ email });
};

const getUserById = async (id) => {
        return await User.findById(id);
};

module.exports = {
        createUser,
        getUserByEmail,
        getUserById
};