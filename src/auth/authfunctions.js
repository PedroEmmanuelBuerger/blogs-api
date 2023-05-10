const jwt = require('jsonwebtoken');

const jwtConfig = {
expiresIn: '1d',
algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

const createTOken = (data) => jwt.sign({ data }, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
    createTOken,
    verifyToken,
};
