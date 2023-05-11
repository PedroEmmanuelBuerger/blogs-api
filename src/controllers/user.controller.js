const { createTOken } = require('../auth/authfunctions');
const { addUser } = require('../services/user.service');

const createUser = async (req, res) => {
    const newUser = await addUser(req.body);
    const { message } = newUser;
    const { password, ...withouthPassword } = message;
    if (newUser.type) {
        return res.status(409).json({ message });
    }
    console.log(newUser.type);
    const token = createTOken(withouthPassword);
    return res.status(201).json({ token });
};

module.exports = {
    addUser,
    createUser,
};