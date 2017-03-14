<template lang="html">
    <div class="home-container"
        :style="{
            paddingLeft: isCollapsed ? '64px' : ''
        }"
    >
        <side-nav :is-collapsed="isCollapsed" />
        <div class="right">
            <header-bar @click-icon="isCollapsed = !isCollapsed" />
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import SideNav from 'components/SideNav';
import HeaderBar from 'components/HeaderBar';
export default {
    name: 'HOME_CONTAINER',
    data() {
        return {
            isCollapsed: false
        };
    },
    components: {
        SideNav,
        HeaderBar
    }
};
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
        position: relative;
        padding-left: 200px;
        transition: .3s;

        .right {
            .content {
                padding: 12px;
            }
        }
    }
</style>
