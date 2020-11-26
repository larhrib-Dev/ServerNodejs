const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

const userLoginController = {};

/**
 * @function login
 * @param  req
 * @param  res
 * @param  next
 * @returns 
 */
userLoginController.login = async (req, res, next) => {
    // Username, password in request
    const {email, password} = req.body;
    // validator

    try {
        // Check username and password are ok
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(`The email ${email} was not found on our system`);
            err.status = 401;
            next(err);
        }
        user.isPasswordMatch(password, user.password, (err, matched) => {
            if (matched) {
                // if credit ok, then create JWT and return it
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;
                const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
                return res.send({ token });
            }
            res.status(401).send({
                error: "Invalid username/password combination"
            });
        });
    } catch(e) {
        next(e);
    }
}


module.exports = userLoginController;