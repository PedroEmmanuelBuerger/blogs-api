const { createTOken } = require('../auth/authfunctions');

const loginUser = async (req, res) => {
    const { email } = req.body;
    const token = createTOken(email);

    res.status(200).json({ token });
};

module.exports = {
    loginUser,
};