<template lang="html">
    <div class="dashboard-view">
        <v-row class="status">
            <v-col class="status-block" xs3>
                <v-card height="250px" class="stock-status">
                    总库存
                </v-card>
            </v-col>
            <v-col class="status-block" xs3>
                <v-card height="250px" class="delivery-status">
                    总出货
                </v-card>
            </v-col>
            <v-col class="status-block" xs3>
                <v-card height="250px" class="returns-status">
                    总退货
                </v-card>
            </v-col>
            <v-col class="status-block" xs3>
                <v-card height="250px" class="purchase-status">
                    总进货
                </v-card>
            </v-col>
        </v-row>
        <v-row class="bottom">
            <v-col xs6>
                <v-card height="450px">
                    图表
                </v-card>
            </v-col>
            <v-col xs3>
                <person-list />
            </v-col>
            <v-col xs3>
                <person-list />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PersonList from 'components/PersonList';
export default {
    name: 'DASHBOARD',
    components: {
        PersonList
    }
};
</script>

<style lang="less" scoped>
    .dashboard-view {
        height: 100%;
        .status {
            margin-bottom: 12px;
            .stock-status,
            .delivery-status,
            .returns-status,
            .purchase-status {
                // width: 250px;
                margin: 0 auto;
            }
        }
    }
</style>
