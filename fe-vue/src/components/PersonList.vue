<template lang="html">
    <v-card class="persion-list-card">
        <v-toolbar class="cyan">
            <v-toolbar-title>客户表</v-toolbar-title>
            <v-icon>search</v-icon>
        </v-toolbar>
        <v-list two-line>
            <v-list-item v-for="i in 10" :key="i">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-icon>search</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'yo'" />
                        <v-list-tile-sub-title v-text="'yo'" />
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-item>
            <v-list-item>
                <v-pagination
                    :length.number="10"
                    v-model="page"
                    circle/>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'person-list',
    data() {
        return {
            page: 1
        };
    }
};
</script>

<style lang="less" scoped>
    .person-list {
        &-card {
            // overflow: scroll;
        }
    }
</style>
