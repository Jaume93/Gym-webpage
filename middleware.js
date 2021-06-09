let checkToken = (req, res, next => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer')) {
        //Remove Bearer from  string
        token = tokenslice(7, token.length);
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
    jwt.verify(toke, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: true,
                message: 'Token is not valid'
            });
        } else {
            req.user = decoded;
            next();
        }
    });
});

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