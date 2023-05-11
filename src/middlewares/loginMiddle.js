const { getUser } = require('../services/user.service');

const verifyNameAndPass = async (req, _res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({ status: 400, message: 'Some required fields are missing' });
    }
    return next();
};

const verifyUserExist = async (req, _res, next) => {
    const { email, password } = req.body;
    const user = await getUser(email);
    req.user = user;
    if (!user || user.password !== password) {
        return next({ status: 400, message: 'Invalid fields' });
    }
    return next();
};

module.exports = {
    verifyNameAndPass,
    verifyUserExist,
};
