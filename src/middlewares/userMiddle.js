const verifyDisplayName = async (req, _res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
        return next({ status: 400,
             message: '"displayName" length must be at least 8 characters long' });
    }
    return next();
};

const verifyEmail = async (req, _res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
        return next({ status: 400,
            message: '"email" must be a valid email' });
   }
   return next();
};

const verifyPassword = async (req, _res, next) => {
    const { password } = req.body;
    if (password.length < 6) {
        return next({ status: 400,
             message: '"password" length must be at least 6 characters long' });
    }
    return next();
};

module.exports = {
    verifyDisplayName,
    verifyEmail,
    verifyPassword,
};
