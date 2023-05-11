const express = require('express');

const { createUser, getAllUsers, getUserById } = require('../controllers/user.controller');

const { verifyDisplayName, verifyEmail, verifyPassword } = require('../middlewares/userMiddle');
const { tokenVerify } = require('../middlewares/tokenMiddle');

const userRouter = express.Router();

userRouter.post(
    '/',
    verifyDisplayName,
    verifyEmail,
    verifyPassword,
    createUser,
);

userRouter.get(
    '/',
    tokenVerify,
    getAllUsers,
);

userRouter.get(
    '/:id',
    tokenVerify,
    getUserById,
);

module.exports = userRouter;