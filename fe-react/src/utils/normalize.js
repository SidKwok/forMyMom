/**
 * @file   规范化state
 * @author SidKwok
 */
import { normalize, schema } from 'normalizr';

/**
 * 以objectId为key构建state
 * @param {string} key 需要抽取的键值
 * @param {Object} data 服务端的数据
 * @return {Object} 返回规范化后的数据
 */
export default (key, data) => {
    const obj = new schema.Entity(key, {}, { idAttribute: 'objectId' });
    const mySchema = { [key]: [ obj ] };
    return normalize(data, mySchema).entities[key];
};
