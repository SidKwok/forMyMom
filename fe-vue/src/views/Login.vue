<template lang="html">
    <div class="login-view">
        <v-card height="300px" class="card">
            <h4>Welcome Back</h4>
            <v-container>
                <v-row>
                    <v-col xs12>
                        <v-text-field
                            v-model="form.username"
                            label="用户名" />
                    </v-col>
                    <v-col xs12>
                        <v-text-field
                            v-model="form.password"
                            label="密码"
                            type="password" />
                    </v-col>
                    <v-col class="text-xs-center" xs12>
                        <v-btn
                            class="login-button"
                            @click.native="signIn(form)"
                            primary>
                            登陆
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
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
        position: relative;

        .card {
            position: relative;
            width: 360px;
            margin: 0 auto;
            top: 50%;
            margin-top: -250px;

            h4 {
                text-align: center;
                font-weight: lighter;
            }

            .login-button {
                width: 90%;
            }
        }
    }
</style>
