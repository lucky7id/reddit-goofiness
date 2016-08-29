// libs
import express from 'express';
import morgan from 'morgan';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

// app imports
import config from '../config.json';
import {authRoute, AuthService} from './lib/auth_service';

// instances
const app = express();
const auth = new AuthService(config);

app
    .use(morgan('combined'))
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .set('jwtSecret', config.jwtSecret)
    .get('/auth', (req, res) => {
        res.redirect(authRoute(
            'NEF7gEbaDRt4OQ',
            'code',
            crypto.randomBytes(32).toString('hex'),
            'http://localhost:3002/auth/callback',
            'permanent',
            'identity,edit,history,mysubreddits,read'
        ))
    })
    .get('/auth/callback', auth.handleRedirect.bind(auth))
    .listen(3002, () => {
        console.log('Reddit app listening on port 3002!');
    });
