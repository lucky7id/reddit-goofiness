import Promise from 'bluebird';
import $ from 'jquery';
import TokenService from './token-service';

const config = require('../../../config.json');
const tokenService = new TokenService(config);
window.tokenService = tokenService;

// at 10
export default class Fetcher {
    constructor () {
        this.tokenService = tokenService;
    }

    getListing(url, listing) {
        const config = {
            method: 'GET',
            url: url
        }

        if (listing && listing.children) {
            config.data = {
                after: listing.after,
                count: listing.children.length
            }
        }

        return this.fetch(config);
    }

    getFrontPage(listing) {
        return this.getListing('https://oauth.reddit.com/.json', listing);
    }

    getPage(sub, listing) {
        return this.getListing(`https://oauth.reddit.com/r/${sub}.json`, listing);
    }

    updateToken() {
        return this.tokenService.updateToken();
    }

    setAuthToken(token) {
        return this.tokenService.setAuthToken(token);
    }

    retry(config, resolve, reject) {
        config.headers.Authorization = `Bearer ${this.tokenService.token && this.tokenService.token.access_token}`
        const promise = $.ajax(config);

        promise.done(data => {
            resolve(data);
        });

        promise.fail((xhr, status, error) => {
            reject({status, error});
        });
    }

    fetch(config) {
        // wrap jQuery's lacking promises with bluebird
        return new Promise((resolve, reject) => {
            const finalConfig = Object.assign({}, config, {
                headers: {
                    Authorization: `Bearer ${this.tokenService.token && this.tokenService.token.access_token}`
                }
            })

            const promise = $.ajax(finalConfig);

            promise.done(data => {
                resolve(data);
            });

            promise.fail((xhr, status, error) => {
                if (xhr.status === 401) {
                    this.tokenService
                        .updateToken()
                        .then(token => {
                            this.retry(finalConfig, resolve, reject);
                        })
                    return;
                }

                reject({status, error});
            });
        })
    }
}
