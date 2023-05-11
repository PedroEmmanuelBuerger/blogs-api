const express = require('express');

const { createNewCatgory, getAllCategories } = require('../controllers/category.controller');

const { tokenVerify } = require('../middlewares/tokenMiddle');
const { validateCatName } = require('../middlewares/categoryMiddle');

const categoryRoute = express.Router();

categoryRoute.post(
    '/',
    tokenVerify,
    validateCatName,
    createNewCatgory,
);

categoryRoute.get(
    '/',
    tokenVerify,
    getAllCategories,
);

module.exports = categoryRoute;