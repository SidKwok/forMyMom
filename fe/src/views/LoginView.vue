<template lang="html">
    <div class="login-view">
        <div class="input-area">
            <el-input placeholder="用户名" v-model="username" class="input" />
            <el-input placeholder="密码" v-model="password" type="password" class="input" />
            <el-button type="primary" @click="login({username, password})" class="button">登陆</el-button>
            <span>{{ isLoading ? 'loading' : 'done' }}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import axios from 'axios';
export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    computed: {
        ...mapGetters(['isLoading'])
    },
    methods: {
        ...mapActions(['login'])
    }
};
</script>

<style lang="less">
    .login-view {
        height: 100%;
        width: 100%;

        .input-area {
            width: 400px;
            height: 300px;
            border: 1px solid #ddd;
            margin: 0 auto;
            margin-top: 15%;
            padding: 40px;

            .input {
                width: 300px;
                display: block;
                margin: 16px auto;
            }

            .button {
                display: block;
                margin: 0 auto;
                width: 120px;
            }
        }
    }
</style>
