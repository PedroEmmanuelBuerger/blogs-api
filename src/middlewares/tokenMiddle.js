const { verifyToken } = require('../auth/authfunctions');

const tokenVerify = async (req, _res, next) => {
    try {
    const { authorization } = req.headers;
    if (!authorization) {
    next({ status: 401, message: 'Token not found' });
    }
    verifyToken(authorization);
    next();
    } catch (error) {
    next({ status: 401, message: 'Expired or invalid token' });
    }
};

module.exports = {
    tokenVerify,
};
