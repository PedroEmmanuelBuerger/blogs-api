const express = require('express');

const { loginUser } = require('../controllers/login.controller');

const { verifyNameAndPass, verifyUserExist } = require('../middlewares/loginMiddle');

const loginRouter = express.Router();

loginRouter.post(
'/', 
verifyNameAndPass,
verifyUserExist, 
loginUser,
);

module.exports = loginRouter;