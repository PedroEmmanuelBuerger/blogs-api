const express = require('express');

const { createUser } = require('../controllers/user.controller');

const { verifyDisplayName, verifyEmail, verifyPassword } = require('../middlewares/userMiddle');

const userRouter = express.Router();

userRouter.post(
    '/',
    verifyDisplayName,
    verifyEmail,
    verifyPassword,
    createUser,
);

module.exports = userRouter;