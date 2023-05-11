const { createTOken } = require('../auth/authfunctions');

const loginUser = async (req, res) => {
    const { user } = req;
    const { password, ...withouthPassword } = user.dataValues;
    const token = createTOken(withouthPassword);

    res.status(200).json({ token });
};

module.exports = {
    loginUser,
};