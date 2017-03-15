<template lang="html">
    <span class="input">
        <input type="text"
            @focus="isFocus = true"
            placeholder="搜索..."
            v-model="str"
        />
        <i class="el-icon-search"></i>
    </span>
</template>

<script>
export default {
    name: 'search',
    computed: {
        str: {
            get() {
                return this.$store.state.search.str;
            },
            set(val) {
                this.$store.commit('EDIT_SEARCH', { str: val });
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .input {
        display: inline-block;
        position: relative;

        i {
            position: absolute;
            top: 9px;
            left: 7px;
            font-size: 14px;
            color: rgba(0,0,0,.65);
        }
        input {
            position: relative;
            display: inline-block;
            padding: 6px 7px;
            padding-left: 24px;
            width: 120px;
            height: 32px;
            cursor: text;
            font-size: 14px;
            line-height: 1.5;
            color: rgba(0,0,0,.65);
            background-color: #fff;
            background-image: none;
            border: 1px solid #d9d9d9;
            border-radius: 32px;
            transition: all .3s;

            &:hover,
            &:focus {
                border-color: #55e4d4;
            }

            &:focus {
                width: 240px;
            }
        }
    }
</style>
