const express = require('express');
const routes = express.Router();
const asyncHandler = require("express-async-handler");
const controller = require('../controllers/users.controller');


routes.post('/', asyncHandler(controller.signUp));

routes.post('/signin', asyncHandler(controller.signIn));

module.exports = routes;
