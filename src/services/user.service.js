const { User } = require('../models');

const getUser = async (email) => User.findOne({ where: { email } });

module.exports = {
    getUser,
};