const errorsMap = {};

errorsMap.notFound = (req, res, next) => {
   var err = new Error('Route Not Found');
   err.status = 404;
   next(err);
};

errorsMap.errorUrl = (err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';
    res.status(status).send({ error });
}

module.exports = errorsMap;