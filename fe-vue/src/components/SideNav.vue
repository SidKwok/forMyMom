<template lang="html">
    <div class="side-nav"
        :style="{width: isCollapsed ? '64px' : '200px'}"
    >
        <p class="logo" @click="isCollapsed = !isCollapsed">LOGO</p>
        <ul>
            <li class="nav-link" v-for="nav of navs">
                <router-link
                    :to="{name: nav.route}"
                    active-class="active"
                    exact
                >
                    <i class="el-icon-check"
                        :style="{fontSize: isCollapsed ? '18px' : ''}"
                    />{{ isCollapsed ? '' : nav.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'side-nav',
    data() {
        return {
            navs: [
                {
                    name: '仓库',
                    route: 'STOCK',
                    icon: ''
                },
                {
                    name: '客户',
                    route: 'CLIENT_ALL',
                    icon: ''
                },
                {
                    name: '厂家',
                    route: 'VENDER_ALL',
                    icon: ''
                },
                {
                    name: '出货单',
                    route: 'DELIVERY',
                    icon: ''
                },
                {
                    name: '进货单',
                    route: 'PURCHASE',
                    icon: ''
                }
            ]
        };
    },
    props: {
        isCollapsed: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less" scoped>
    .side-nav {
        position: absolute;
        left: 0;
        height: 100%;
        background-color: #293b5a;
        transition: all .3s;
        .logo {
            background-color: #21324f;
            height: 64px;
            line-height: 64px;
            text-align: center;
            font-size: 18px;
            color: #fff;
        }

        ul {
            padding: 24px 16px 0;

            .nav-link {
                height: 56px;
                line-height: 56px;
                font-size: 14px;
                overflow: hidden;

                a {
                    color: #7b96c4;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    transition: all .3s;

                    &:hover {
                        text-shadow: 0 0 8px #7b96c4;
                    }
                }
                .active {
                    color: #55e4d4;
                    text-shadow: 0 0 8px #55e4d4;
                }
                i {
                    margin: 0 6px 0;
                    font-size: 12px;
                }
            }
        }
    }
</style>
