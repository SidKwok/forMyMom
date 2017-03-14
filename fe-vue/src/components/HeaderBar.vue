<template lang="html">
    <el-row class="header">
        <el-col :span="2">
            <i class="collapse"
                @click="$emit('click-icon')"
            >icon</i>
        </el-col>
        <el-col :span="6">标题</el-col>
        <el-col :span="16" class="search-block">
            <search />
        </el-col>
    </el-row>
</template>

<script>
import Search from './Search';
export default {
    name: 'header-bar',
    components: {
        Search
    }
};
</script>

<style lang="less" scoped>
    .header {
        height: 64px;
        width: 100%;
        background-color: #f7faff;
        border-bottom: 1px solid #e4eaf4;
        padding: 0 16px 0;
        position: relative;

        .collapse {
            position: relative;
            font-size: 24px;
            cursor: pointer;
            color: #e3e9f4;
            top: 16px;
        }

        .search-block {
            position: relative;
            padding: 16px 12px 0;
            text-align: right;
        }
    }
</style>
