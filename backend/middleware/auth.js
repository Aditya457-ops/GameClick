const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token) return res.status(400).json({message: "no token"});

    try {
        const verified = jwt.verify(token, process.env.jwtsecretkey);
        req.user = verified;
        next();
    } catch(error) {
        res.status(500).json({message: "internal server error"});
    }
}

module.exports = auth;