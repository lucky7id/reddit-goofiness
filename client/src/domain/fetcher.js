import Promise from 'bluebird';
import $ from 'jquery';

// at 10
export default class Fetcher {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }

    retry(config, resolve, reject) {
        const promise = $.ajax(config);

        promise.done(data => {
            resolve(data);
        });

        promise.fail(xhr, status, error => {
            reject({status, error});
        });
    }

    fetch(config) {
        // wrap jQuery's lacking promises with bluebird
        return new Promise(resolve, reject) {
            const promise = $.ajax(config);

            promise.done(data => {
                resolve(data);
            });

            promise.fail((xhr, status, error) => {
                if (xhr.status === 401) {
                    this.tokenService
                        .updateToken()
                        .then(token => {
                            this.retry(config, resolve, reject);
                        })
                }

                reject({status, error});
            });
        }
    }
}
