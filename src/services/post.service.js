const { Category, BlogPost, PostCategory } = require('../models');

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

module.exports = {
    createPost,
};