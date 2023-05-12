const validadeNewPost = async (req, _res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        return next({ status: 400, message: 'Some required fields are missing' });
    }
    return next();
};

const validateUpdatePost = async (req, _res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return next({ status: 400, message: 'Some required fields are missing' });
    }
    return next();
};

module.exports = {
    validadeNewPost,
    validateUpdatePost,
};
