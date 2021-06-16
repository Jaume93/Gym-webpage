const jwt = require('jsonwebtoken');

//Verifica que el token del usuario log in sea correcto
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log(token)
    if (token && token.startsWith('Bearer')) {
        //Remove Bearer from  string
        token = token.slice(7, token.length);
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: true,
                message: 'Token is not valid'
            });
        }
        //console.log(decoded)
        // req.user nos da la id del usuario que ha echo log in
        req.user = decoded;
        next();
    });
};

const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 400).send({
        success: false,
        message: err._message || err.message
    })
};

module.exports = {
    errorHandler,
    checkToken
};