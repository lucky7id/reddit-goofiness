import Promise from 'bluebird';
import decode from 'jwt-decode';
import $ from 'jquery';


export default class TokenService {
    constructor(config) {
        this.config = config;
    }

    setAuthToken (token) {
        return new Promise((resolve, reject) => {
            this.verifyToken(token)
                .then(decoded => {
                    this.token = decoded;
                    this.raw = token;

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
                .get(`${this.config.app.baseUrl}/token/refresh?token=${this.raw}`)
                .done(res => {
                    this.verifyToken(res.token)
                        .then(decoded => {
                            this.token = decoded;
                            this.raw = res.token;
                            localStorage.setItem('snuki', res.token);
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
        // we'll deal with locking this down later
        // const tempToken = jwt.sign({
        //     client_secret: this.config.client_secret
        // }, this.config.jwtSecret)

        return new Promise((resolve, reject) => {
            $
                .get(`${this.config.app.baseUrl}/token`)
                .done(res => {
                    this.verifyToken(res.token)
                        .then(decoded => {
                            this.token = decoded;
                            this.raw = res.token;
                            localStorage.setItem('snuki', res.token);
                            resolve(this.token);
                        })
                        .catch(e => {
                            console.log(e);
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
            let decoded
            try {
                decoded = decode(token);
            } catch (e) {
                reject(e);
                return;
            }

            resolve(decoded);
        });
    }
}
