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
}

html,
body,
#app {
    height: 100%;
    min-width: 1680px;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
