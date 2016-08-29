import Promise from 'bluebird';
import http from 'http';
import https from 'https';
import querystring from 'querystring';
import {ERRORS} from './constants';

export default class Fetcher {
    encodeBody (data) {
        return querystring.stringify(data);
    }

    fetch (config, isJson) {
        return this.doReq(http, config, isJson);
    }

    fetchSecure (config, isJson) {
        return this.doReq(https, config, isJson);
    }

    doReq (method, config, isJson) {
        return new Promise((resolve, reject) => {
            const req = method.request(config, response => {
                let result = '';

                // catch the error codes we need to handle
                switch (response.statusCode) {
                    case 401:
                        reject({error: ERRORS.http['401']})
                        return;
                    case 500:
                        reject({error: ERRORS.http['500']})
                        return;
                }

                response
                    .setEncoding('utf8')
                    .on('data', chunk => {
                        result += chunk;
                    })
                    .on('end', () => {
                        if (isJson) result = JSON.parse(result);

                        resolve(result);
                    })
            });

            req.on('error', (e) => {
                reject(e);
            });

            if (config.method !== 'GET' && config.data) {
                const isEncoded = typeof config.data === 'string';
                const body = isEncoded ? config.data : this.encodeBody(config.data);
                console.log(body);

                req.write(body);
                req.end();
            }
        });
    }
}
