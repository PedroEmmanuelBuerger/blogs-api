const express = require('express');

const { validadeNewPost, validateUpdatePost } = require('../middlewares/postMiddle');
const { tokenVerify } = require('../middlewares/tokenMiddle');

const { createPostCont, getAllPosts,
     getPost, UpdateAPost, deleteApost, searchAPost } = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post(
'/',
tokenVerify,
validadeNewPost,
createPostCont,
);

postRouter.get(
'/search',
tokenVerify,
searchAPost,
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

postRouter.put(
'/:id',
tokenVerify,
validateUpdatePost,
UpdateAPost,
);

postRouter.delete(
'/:id',
tokenVerify,
deleteApost,
);

module.exports = postRouter;
