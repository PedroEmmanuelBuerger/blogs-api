const { verifyToken } = require('../auth/authfunctions');

const { createPost, getAll, getById,
   updatePost, deletePost, searchPost } = require('../services/post.service');

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

const getAllPosts = async (_req, res) => {
  const allPosts = await getAll();
  res.status(200).json(allPosts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await getById(id);
  if (post.type) {
    return res.status(404).json({ message: post.message });
  }
  return res.status(200).json(post.message);
};

const UpdateAPost = async (req, res) => {
  const { authorization } = req.headers;
  const user = verifyToken(authorization);
  const { id } = req.params;
  const result = await updatePost(req.body, id, user.data.id);
  if (result.type) {
    return res.status(401).json({ message: result.message });
  }
  return res.status(200).json(result.message);
};

const deleteApost = async (req, res) => {
  const { authorization } = req.headers;
  const user = verifyToken(authorization);
  const { id } = req.params;
  const result = await deletePost(user.data.id, id);
  if (result.type) {
    return res.status(result.status).json({ message: result.message });
  }
  return res.status(204).json();
};

const searchAPost = async (req, res) => {
  const query = req.query.q;
  const result = await searchPost(query);
  res.status(200).json(result.message);
};

module.exports = {
    createPostCont,
    getAllPosts,
    getPost,
    UpdateAPost,
    deleteApost,
    searchAPost,
};
