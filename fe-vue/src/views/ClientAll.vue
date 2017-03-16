<template lang="html">
    <div class="client-all-view">
        <div class="left">
            <person-list></person-list>
        </div>
        <div class="right">
            yo
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PersonList from 'components/PersonList';
export default {
    name: 'CLIENT',
    components: {
        PersonList
    },
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
    .client-all-view {
        position: relative;
        height: 100%;
        padding-left: 400px;
        .left {
            position: absolute;
            left: 0;
            width: 400px;
            top: 0;
            bottom: 0;
        }
        .right {
            position: relative;
            width: 100%;
        }
    }
</style>
