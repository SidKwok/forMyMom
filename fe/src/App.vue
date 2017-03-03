<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import store from 'state/store';
export default {
    name: 'app',
    store
};
</script>

<style>
* {
    box-sizing: border-box;
}
html,
body,
#app {
    width: 100%;
    height: 100%;
}
#app {
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
