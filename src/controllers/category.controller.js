const { createCategory } = require('../services/category.service');

const createNewCatgory = async (req, res) => {
    const { name } = req.body;
    const newUser = await createCategory(name);
    return res.status(201).json(newUser.message);
};

module.exports = {
    createNewCatgory,
};
