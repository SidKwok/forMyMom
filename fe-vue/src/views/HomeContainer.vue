<template lang="html">
    <v-app class="home-container">
        <v-toolbar>
            <v-toolbar-side-icon @click.native.stop="isCollapsed = !isCollapsed" />
            <v-toolbar-title>仓库</v-toolbar-title>
            <v-btn icon dark>
                <v-icon>account_circle</v-icon>
             </v-btn>
        </v-toolbar>
        <main>
            <v-sidebar
                class="side-bar"
                v-model="isCollapsed"
                fixed
                drawer>
                <side-nav />
            </v-sidebar>
            <v-content class="router-content">
                <router-view />
            </v-content>
        </main>
    </v-app>
</template>

<script>
import SideNav from 'components/SideNav';
export default {
    name: 'HOME_CONTAINER',
    data() {
        return {
            isCollapsed: false
        };
    },
    components: {
        SideNav
    }
};
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;

        main {
            position: absolute;
            width: 100%;
            top: 64px;
            bottom: 0;
        }

        .router-content {
            padding: 12px 16px;
            height: 100%;
        }
    }
</style>
