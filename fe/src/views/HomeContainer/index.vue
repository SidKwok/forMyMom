<template lang="html">
    <div class="main">
        <md-toolbar>
            <md-button class="md-icon-button" @click.native="toggleMenu">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title">名佑鞋业</h2>
        </md-toolbar>
        <md-sidenav class="md-left" ref="menu"></md-sidenav>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'home-container',
    methods: {
        toggleMenu() {
            this.$refs.menu.toggle();
        }
    }
};
</script>

<style lang="less" scoped>
</style>
