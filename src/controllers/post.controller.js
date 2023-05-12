const { verifyToken } = require('../auth/authfunctions');

const { createPost } = require('../services/post.service');

const createPostCont = async (req, res) => {
    const { authorization } = req.headers;
    const user = verifyToken(authorization);
    const { id } = user.data;
    const result = await createPost(req.body, id);
    if (result.type) {
      return res.status(400).json({ message: result.message });
    }
    return res.status(201).json(result.message);
};

module.exports = {
    createPostCont,
};
