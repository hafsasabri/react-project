const data = require('../data/users.data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (body) => {
    const email = body.email;
    const name = body.name;
    const password = body.password;

    if(password.length < 8) {
        throw new Error('Password must be at least 8 characters long.')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name: name, email: email, password: hashedPassword };
    return await data.createUser(newUser);
}


const login = async (body) => {
    const  email = body.email;
    const  password = body.password;

    if (!email || !password) {
        throw new Error("Email et mot de passe sont requis.");
    }

    const user = await data.getUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email.");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new Error("Invalid password.");
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return token;
}
module.exports = { register, login };
