<template lang="html">
    <div class="login-view">
        <el-card class="card">
            <h1>Welcome Back</h1>
            <el-form :model="form" class="form">
                <el-form-item prop="username">
                    <el-input
                        placeholder="用户名"
                        v-model="form.username"
                        >
                        <template slot="prepend">
                            <i class="el-icon-information"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        placeholder="密码"
                        type="password"
                        v-model="form.password">
                        <template slot="prepend">
                            <i class="el-icon-information"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :style="{ width: '100%' }"
                        @click="signIn(form)"
                        >登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'LOGIN',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        ...mapActions(['signIn']),
        test(params) {
            console.log(params);
        }
    }
};
</script>

<style lang="less" scoped>
    .login-view {
        height: 100%;

        .card {
            margin: 12% auto 0;
            width: 360px;
            height: 300px;

            h1 {
                text-align: center;
                font-weight: lighter;
            }

            .form {
                margin-top: 48px;
                .login-button {
                    width: 100%;
                    font-weight: lighter;
                }
            }
        }
    }
</style>
