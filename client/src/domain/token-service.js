import Promise from 'bluebird';
import jwt from 'jsonwebtoken';


export default class TokenService {
    constructor(config) {
        this.config = config;
    }

    setAuthToken (token) {
        return new Promise((resolve, reject) => {
            this.verifyToken(token)
                .then(decoded => {
                    this.token = decoded;
                    resolve(this.token);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    updateWithRefreshToken() {
        return new Promise((resolve, reject) => {
            $
                .get(`${this.config.app.baseUrl}/token/refresh?token=${this.token}`)
                .done(token => {
                    this.verifyToken(token)
                        .then(decoded => {
                            this.token = decoded;
                            resolve(this.token);
                        })
                        .catch(e => {
                            reject({step: 'token'})
                        })
                })
                .fail(xhr => {
                    reject({step: 'request', xhr: xhr})
                })
        })
    }

    getDefaultToken() {
        const tempToken = jwt.sign({
            client_secret: this.config.client_secret
        }, this.config.jwtSecret)

        return new Promise((resolve, reject) => {
            $
                .get(`${this.config.app.baseUrl}/token/?token=${tempToken}`)
                .done(token => {
                    this.verifyToken(token)
                        .then(decoded => {
                            this.token = decoded;
                            resolve(this.token);
                        })
                        .catch(e => {
                            reject({step: 'token'})
                        })
                })
                .fail(xhr => {
                    reject({step: 'request', xhr: xhr})
                })
        })
    }

    updateToken() {
        if (!this.token || !this.token.refresh_token) {
            return this.getDefaultToken();
        }

        if (this.token && this.token.refresh_token) {
            return this.updateWithRefreshToken();
        }
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            const token = jwt.verify(token, config.jwtSecret, (e, decoded) => {
                if (e) return reject(e);

                resolve(decoded);
            });
        });
    }
}
