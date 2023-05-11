const { Category } = require('../models');

const createCategory = async (name) => {
    const categorie = await Category.create({ name });
    return { type: null, message: categorie };
};

module.exports = {
    createCategory,
};
