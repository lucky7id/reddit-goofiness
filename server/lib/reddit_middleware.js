import jwt from 'jsonwebtoken';
import http from 'http';
import querystring from 'querystring';

// const refreshConfig = () => {
//     return {
//         host: 'https://www.reddit.com/api/v1/access_token',
//         method: 'POST'
//     }
// }
//
// const refresh = (token, req, next) => {
//     if (!Date.now() > token.expires) return next();
//
//     http
//         .request(refreshConfig(), res => {
//             res.setEncoding('utf8')
//         })
// }

const reddit = (req, res, next) => {
    const token = req.body.token || req.query.token;

    if (!token) {
        res.status(401).send('User is not authenticated');
        return;
    }

    jwt.verify(token, req.app.get('jwtSecret'), (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');

        req.decoded = decoded;
        refresh(decoded, req,  next);
    });
}
