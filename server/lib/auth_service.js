import Promise from 'bluebird';
import Fetcher from './fetcher';
import {ERRORS} from './constants';
import jwt from 'jsonwebtoken';

export const authRoute = (clientId, type = 'code', rand, uri, duration = 'permanent', scope) => {
    return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=${type}&state=${rand}&redirect_uri=${uri}&duration=${duration}&scope=${scope}`
}

class AuthFetcher extends Fetcher {
    constructor (config) {
        super();
        this.config = config;
    }

    getAccessToken (code) {
        const config = {
            host: 'www.reddit.com',
            path: '/api/v1/access_token',
            method: 'POST',
            auth: `${this.config.client_id}:${this.config.client_secret}`,
            data: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.config.redirect_uri
            }
        }

        return this.fetchSecure(config, true);
    }
}

export class AuthService {
    constructor (config) {
        this.config = config;
        this.fetcher = new AuthFetcher(config);
        this.handleRedirect = Promise.coroutine(this.handleRedirect).bind(this);
    }

    getAccessToken (code) {
        return this.fetcher.getAccessToken(code);
    }

    *handleRedirect (req, res) {
        const token = yield this.getAccessToken(req.query.code);
        const appToken = jwt.sign(token, this.config.jwtSecret);
        console.log(token, appToken);

        res.redirect(`localhost:8080/auth/success/${token}`)

        return appToken;
    }
}
