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

    const result = await BlogPost.findByPk(create.dataValues.id);
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

module.exports = {
    createPost,
    getAll,
};