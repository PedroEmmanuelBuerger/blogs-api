const validateCatName = async (req, _res, next) => {
    const { name } = req.body;
    if (!name) {
        return next({ status: 400, message: '"name" is required' });
    }
    return next();
};

module.exports = {
    validateCatName,
};
