/**
 * @file   api 统一处理
 * @author SidKwok
 */
import axios from 'axios';

import store from 'store';
import * as types from 'store/mutations';

const ajax = (method, url, params, _options = {}) => {
    const options = {
        ..._options,
        url,
        method,
        params: method === 'get' ? params : {},
        data: method === 'post' ? params : {}
    };
    return axios(options)
        .then(({ data }) => data)
        .then(({ errNo, errMsg, retData }) => {
            if (errNo === 12) {
                store.commit(types.LOGOUT);
            }
            return (errNo === 0)
                ? Promise.resolve(retData)
                : Promise.reject(errMsg);
        });
};

export const Get = (...args) => ajax('get', ...args);

export const Post = (...args) => ajax('post', ...args);
