const express = require('express');

const { validadeNewPost } = require('../middlewares/postMiddle');
const { tokenVerify } = require('../middlewares/tokenMiddle');

const { createPostCont, getAllPosts, getPost } = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post(
'/',
tokenVerify,
validadeNewPost,
createPostCont,
);

postRouter.get(
'/',
tokenVerify,
getAllPosts,
);

postRouter.get(
'/:id',
tokenVerify,
getPost,
);

module.exports = postRouter;
