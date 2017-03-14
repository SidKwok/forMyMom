<template>
      <div id="app">
          <router-view></router-view>
      </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html,
body,
#root,
#app {
    min-width: 1200px;
    width: 100%;
    height: 100%;
}

a {
    text-decoration: none;
}

input:focus {
    outline: none;
}

#app {
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
