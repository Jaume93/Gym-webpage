const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 400).send({
        success: false,
        message: err._message || err.message
    })
};

module.exports = {
    errorHandler
};