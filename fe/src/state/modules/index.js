/**
 * @file   模块入口文件
 * @author SidKwok
 */

const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    if (key === './index.js') {
        return;
    }
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules;
