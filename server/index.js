import express from 'express';
import morgan from 'morgan';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';


const cors = require('cors');
const app = express();

const authRoute = (clientId, type = 'code', rand, uri, duration = 'permanent', scope) => {
    return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=${type}&state=${rand}&redirect_uri=${uri}&duration=${duration}&scope=${scope}`
}

app
    .use(morgan('combined'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .set('jwtSecret', 'puppies')
    .get('/auth', (req, res) => {
        console.log(authRoute(
            'NEF7gEbaDRt4OQ',
            'code',
            crypto.randomBytes(32).toString('hex'),
            'http://localhost:3002/auth/callback',
            'permanent',
            'identity,edit,history,mysubreddits,read'
        ))
        res.redirect(authRoute(
            'NEF7gEbaDRt4OQ',
            'code',
            crypto.randomBytes(32).toString('hex'),
            'http://localhost:3002/auth/callback',
            'permanent',
            'identity,edit,history,mysubreddits,read'
        ))
    })
    .get('/auth/callback', (req, res) => {
        console.log(req)
        res.send('success');
    })
    .listen(3002, () => {
        console.log('Reddit app listening on port 3002!');
    });
