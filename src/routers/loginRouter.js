const express = require('express');

const { loginUser } = require('../controllers/login.controller');

const { verifyNameAndPass, verifyUserExist } = require('../middlewares/loginMiddle');

const loginRoute = express.Router();

loginRoute.post(
'/', 
verifyNameAndPass,
verifyUserExist, 
loginUser,
);

module.exports = loginRoute;