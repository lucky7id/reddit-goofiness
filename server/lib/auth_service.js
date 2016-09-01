import Promise from 'bluebird';
import Fetcher from './fetcher';
import {ERRORS} from './constants';
import jwt from 'jsonwebtoken';

export const authRoute = (clientId, type = 'code', rand, uri, duration = 'permanent', scope) => {
    return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=${type}&state=${rand}&redirect_uri=${uri}&duration=${duration}&scope=${scope}`;
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

    refreshToken (token) {
        const config = {
            host: 'www.reddit.com',
            path: '/api/v1/access_token',
            method: 'POST',
            auth: `${this.config.client_id}:${this.config.client_secret}`,
            data: {
                grant_type: 'refresh_token',
                refresh_token: token,
            }
        }

        return this.fetchSecure(config, true);
    }

    getTempAccessToken() {
        const config = {
            host: 'www.reddit.com',
            path: '/api/v1/access_token',
            method: 'POST',
            auth: `${this.config.client_id}:${this.config.client_secret}`,
            data: {
                grant_type: 'client_credentials',
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
        this.handleTokenRefresh = Promise.coroutine(this.handleTokenRefresh).bind(this);
        this.handleTokenRequest = Promise.coroutine(this.handleTokenRequest).bind(this);
    }

    getRefreshToken (token) {
        return this.fetcher.refreshToken(token);
    }

    getAccessToken (code) {
        return this.fetcher.getAccessToken(code);
    }

    getTempAccessToken() {
        return this.fetcher.getTempAccessToken();
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            const token = jwt.verify(token, config.jwtSecret, (e, decoded) => {
                if (e) return reject(e);

                resolve(decoded);
            });
        });
    }

    *handleTokenRefresh (req, res) {
        let decoded = yield this.verifyToken(req.query.token);

        if (!decoded || !decoded.refresh_token) {
            return res.status(401).json({error: ERRORS.http['401']})
        }

        let tokenRes = yield this.getRefreshToken(decoded.refresh_token);

        if (tokenRes.error) {
            return res.status(tokenRes.code).json({error: ERRORS.http[tokenRes.code]})
        }

        let newToken = Object.assign({}, decoded, tokenRes);

        newToken = jwt.sign(newToken, this.config.jwtSecret);
        res.json({token: newToken});
    }

    *handleTokenRequest (req, res) {
        // handle locking this down later
        // let decoded = yield this.verifyToken(req.query.token);
        //
        // if (!decoded || !decoded.client_secret) {
        //     return res.status(401).json({error: ERRORS.http['401']})
        // }

        let token = yield this.getTempAccessToken();

        if (token.error) {
            return res.status(token.code).json({error: ERRORS.http[token.code]})
        }

        res.json({token: jwt.sign(token, this.config.jwtSecret)});
    }

    *handleRedirect (req, res) {
        const token = yield this.getAccessToken(req.query.code);
        const appToken = jwt.sign(token, this.config.jwtSecret);

        res.redirect(`localhost:8080/auth/success/${token}`);

        return appToken;
    }
}
