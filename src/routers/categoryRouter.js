const express = require('express');

const { createNewCatgory } = require('../controllers/category.controller');
const { tokenVerify } = require('../middlewares/tokenMiddle');
const { validateCatName } = require('../middlewares/categoryMiddle');

const categoryRoute = express.Router();

categoryRoute.post(
    '/',
    tokenVerify,
    validateCatName,
    createNewCatgory,
);

module.exports = categoryRoute;