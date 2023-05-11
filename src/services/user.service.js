const { User } = require('../models');

const getUser = async (email) => User.findOne({ where: { email } });

const addUser = async ({ displayName, email, password, image }) => {
    const AlredyExist = await getUser(email);
    if (AlredyExist) {
    return { type: 'ALREADY_EXIST', message: 'User already registered' };
    }
    let user = '';
    if (image) {
        user = await User.create({ displayName, email, password, image });
    } else {
        user = await User.create({ displayName, email, password, image: null });
    }
    return { type: null, message: user.dataValues };
};

module.exports = {
    getUser,
    addUser,
};