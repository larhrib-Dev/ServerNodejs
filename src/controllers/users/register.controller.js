const User = require('../../models/user.model');

const userRegisterController = {};

/**
 * @function register
 * @param  req
 * @param  res
 * @param  next
 * @returns { user }
*/

userRegisterController.register = async (req, res, next) => {
    const { name, email, password, joined} = req.body;
    const newUser = new User({
        name: name,
        email: email,
        password: password,
        joined: joined
    });
    try {
        const user = await newUser.save();
        return res.send({ user });
    } catch(e) {
        if (e.code === 11000 && e.name === 'MongoError') {
            var err = new Error(`Email address ${newUser.email} is already token`);
            next(err);
        } else {
            next(e);
        }
    };
};


module.exports = userRegisterController;