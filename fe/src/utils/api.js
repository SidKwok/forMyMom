/**
 * @file   ajax 方法
 * @author SidKwok
 */
import axios from 'axios';
import store from 'state/store';

/**
 * Ajax 请求
 * @param {string} method 类型: get, post
 * @param {string} url 请求地址
 * @param {Object} data 参数
 * @param {Object} options post请求的其他配置
 * @return {Promise} 返回Promise对象
 */
const ajax = (method, url, data, options = {}) => {
    const sentOptions = Object.assign({
        url,
        method,
        params: method === 'get' ? data : {},
        data: method === 'post' ? data : {}
    }, options);
    return axios(sentOptions).then(response => response.data)
        .then(res => {
            if (res.errNo === 12) {
                store.dispatch('logout');
            }
            return (res.errNo === 0)
                ? Promise.resolve(res.retData)
                : Promise.reject(res.errMsg);
        })
        .catch(errMsg => {
            return Promise.reject(errMsg);
        });
};

/**
 * GET 请求
 * @param {string} url 请求地址
 * @param {Object} data 参数
 * @return {Promise} get类型的ajax promise
 */
export const Get = (url, data = {}) => {
    return ajax('get', url, data);
};

/**
 * POST 请求
 * @param {string} url 请求地址
 * @param {Object} data 参数
 * @param {Object} options post请求的各种选项
 * @return {Promise} post类型的ajax promise
 */
export const Post = (url, data = {}, options = {}) => {
    return ajax('post', url, data, options);
};
