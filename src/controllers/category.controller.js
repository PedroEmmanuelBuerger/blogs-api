const { createCategory, getAll } = require('../services/category.service');

const createNewCatgory = async (req, res) => {
    const { name } = req.body;
    const newUser = await createCategory(name);
    return res.status(201).json(newUser.message);
};

const getAllCategories = async (req, res) => {
    const categories = await getAll();
    return res.status(200).json(categories);
};

module.exports = {
    createNewCatgory,
    getAllCategories,
};
