const service = require('../services/users.service');

const signUp = async (req, res) => {
  service.register(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({
      error: err.message
    }));
};


const signIn = async (req, res) => {
  service.login(req.body)
    .then(token => res.status(200).json({ token }))
    .catch(err => res.status(400).json({
      error: err.message
    }));
};

module.exports = {
  signIn,
  signUp
};