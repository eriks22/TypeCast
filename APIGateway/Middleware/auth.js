'use strict';

const jwt = require('jsonwebtoken');

const withAuth = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if (!token) return res.sendStatus(401).end();
    else {
        await jwt.verify(token, 'Secret', (error, decoded) => {
            if (error) return res.sendStatus(401).end();
            else {
                req.user = decoded.user;
                const payload = { user: req.user };
                const freshToken = jwt.sign(payload, 'Secret', { expiresIn: '30m' });
                res.cookie('token', freshToken, { httpOnly: true });
                next();
            }
        });
    }
}

module.exports = withAuth;