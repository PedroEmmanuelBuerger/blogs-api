const { Op } = require('sequelize');
const { Category, BlogPost, PostCategory, User } = require('../models');

const createPost = async (body, id) => {
    const { title, content, categoryIds } = body;

    const verifyCategories = await Promise.all(
        categoryIds.map((catId) => Category.findByPk(catId)),
      );

      const validate = verifyCategories.some((category) => !category);
      if (validate) {
 return { type: 'CATEGORY_NOT_FOUND',
       message: 'one or more "categoryIds" not found' }; 
}

const create = await BlogPost.create({ title, content, userId: id });
 categoryIds.forEach((catId) => PostCategory.create({ postId: create.id, categoryId: catId }));

    const result = await BlogPost.findByPk(create.id);
    return { type: null, message: result };
};

const getAll = async () => {
    const AllPosts = await BlogPost.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'displayName', 'email', 'image'],
          },
          {
            model: Category,
            as: 'categories',
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
      });
      return AllPosts;
};

const getById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id }, 
        include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'],
          },
          { model: Category, 
            as: 'categories',
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
      });
      if (!post) {
        return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
      }
      return { type: null, message: post };
};

const updatePost = async (body, postId, postUser) => {
    const { title, content } = body;
    const post = await BlogPost.findByPk(postId);
    if (post.userId !== postUser) {
        return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
    }
    await post.update({ title, content });
    const NewPost = await BlogPost.findOne({
        where: { id: postId }, 
        include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'],
          },
          { model: Category, 
            as: 'categories',
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
      });
      return { type: null, message: NewPost };
};

const deletePost = async (postUser, PostId) => {
 const post = await BlogPost.findByPk(PostId);
  if (!post) {
    return { type: 'POST_NOT_EXIST', message: 'Post does not exist', status: 404 };
  }
  if (Number(postUser !== post.userId)) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user', status: 401 };
}
  const user = await BlogPost.destroy(
    { where: { id: PostId } },
  );
  return { type: null, message: user };
};

const searchPost = async (query) => {
let querie = '';
 querie = await BlogPost.findAll({ where: { title: { [Op.like]: `%${query}%` } },
 include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });

if (querie.length <= 0) {
  querie = await BlogPost.findAll({ where: { content: { [Op.like]: `%${query}%` } },
  include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });
}
if (querie.length <= 0) { querie = []; }
if (!query) {
  querie = await BlogPost.findAll(
  { include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] },
);
}
return { type: null, message: querie };
};

module.exports = {
    createPost,
    getAll,
    getById,
    updatePost,
    deletePost,
    searchPost,
};