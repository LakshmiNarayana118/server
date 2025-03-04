const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config.json');

const verifyAuth = (req, res, next) => {
    const tokenWithBearer = req.header('Authorization');
    if (!tokenWithBearer) return res.status(401).send('Access Denied');
    const tokenWithQuotes = tokenWithBearer.replace(/^Bearer\s/, '');
    const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = { verifyAuth };
