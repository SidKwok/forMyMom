<template lang="html">
    <div class="client-all-view">
        <el-table :data="clients">
            <el-table-column
                prop="name"
                label="姓名"
                width="" />
            <el-table-column
                prop="address"
                label="地址"
                width="" />
            <el-table-column
                prop="mobilephone"
                label="移动电话"
                width="" />
            <el-table-column
                prop="telephone"
                label="固定电话"
                width="" />
            <el-table-column
                prop="note"
                label="备注"
                width="" />
        </el-table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'CLIENT_ALL',
    methods: {
        ...mapActions(['fetchClients'])
    },
    computed: {
        ...mapGetters({
            clients: 'storeClients'
        })
    },
    created() {
        this.fetchClients();
    },
    watch: {
        '$route': 'fetchClients'
    }
};
</script>

<style lang="less" scoped>
</style>
