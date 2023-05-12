const express = require('express');

const { validadeNewPost } = require('../middlewares/postMiddle');
const { tokenVerify } = require('../middlewares/tokenMiddle');

const { createPostCont } = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post(
'/',
tokenVerify,
validadeNewPost,
createPostCont,
);

module.exports = postRouter;
