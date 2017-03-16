<template lang="html">
    <v-row class="side-nav">
        <v-col xs12>
            <v-list dense>
                <v-list-item v-for="nav of navs" :key="nav.name">
                    <v-list-tile
                        :href="{name: nav.route}"
                        active-class="router-active"
                        router>
                        <v-list-tile-avatar>
                            <v-icon>{{ nav.icon }}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            {{ nav.name }}
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'side-nav',
    data() {
        return {
            navs: [
                {
                    name: '仓库',
                    route: 'STOCK',
                    icon: 'fiber_new'
                },
                {
                    name: '客户',
                    route: 'CLIENT_ALL',
                    icon: 'perm_contact_calendar'
                },
                {
                    name: '厂家',
                    route: 'VENDER_ALL',
                    icon: 'group'
                },
                {
                    name: '出货单',
                    route: 'DELIVERY_ALL',
                    icon: 'store'
                },
                {
                    name: '进货单',
                    route: 'PURCHASE_ALL',
                    icon: 'local_grocery_store'
                },
                {
                    name: '深度分析',
                    route: 'ANALYSIS',
                    icon: 'tonality'
                }
            ]
        };
    },
    props: {
        isCollapsed: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapActions(['signOut'])
    }
};
</script>

<style lang="less" scoped>
    .side-nav {
        .router-active {
            background-color: rgba(0, 0, 0, .2);
        }
    }
</style>
