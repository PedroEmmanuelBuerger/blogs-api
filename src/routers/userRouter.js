const express = require('express');

const { createUser, getAllUsers,
     getUserById, deleteAuser } = require('../controllers/user.controller');

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

userRouter.delete(
'/me',
tokenVerify,
deleteAuser,
);

module.exports = userRouter;