const { createTOken } = require('../auth/authfunctions');
const { addUser, getAll } = require('../services/user.service');

const createUser = async (req, res) => {
    const newUser = await addUser(req.body);
    const { message } = newUser;
    const { password, ...withouthPassword } = message;
    if (newUser.type) {
        return res.status(409).json({ message });
    }
    const token = createTOken(withouthPassword);
    return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
    const users = await getAll();
    const usersWithoutPassword = users.map((user) => {
        const { password, ...withouthPassword } = user.dataValues;
        return withouthPassword;
    });
    res.status(200).json(usersWithoutPassword);
};

module.exports = {
    addUser,
    createUser,
    getAllUsers,
};