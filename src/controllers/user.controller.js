const userController = {};

/**
 * @function register
 * @param  req
 * @param  res
 * @param  next
 * @returns 
 */
userController.register = (req, res, next) => {
    res.send({
        message: "Sign Up"
    })
};

module.exports = userController;