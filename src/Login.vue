<template>

    <div class="login-box">
        <div class="login-logo">
            <b>熟食配送系统</b>
        </div>
        <div class="login-box-body">
            <p class="login-box-msg">用户登录aaa</p>
            <div v-if="error" class="alert alert-danger alert-dismissible">
                <h4 style="margin-bottom: 0px;"><i class="fa fa-exclamation-triangle"></i> {{errorMsg}}</h4>
            </div>
            <div class="form-group has-feedback">
                <input type="text" class="form-control" v-model="username" placeholder="账号">
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" v-model="password" placeholder="密码">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="text" class="form-control" v-model="captcha" @keyup.enter="login" placeholder="验证码">
                <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="src" @click="refreshCode">
                &nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="refreshCode">点击刷新</a>
            </div>


            <div class="row">
                <div class="col-xs-8">
                    <div class="checkbox icheck">
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-xs-4">
                    <button type="button" class="btn btn-primary btn-block btn-flat" @click="login">登录</button>
                    <button type="button" class="btn btn-primary btn-block btn-flat" id="weixinbtn">weixin</button>
                    <!--<router-link type="button" class="btn btn-primary btn-block btn-flat" replace="/test">登录2</router-link>-->

                </div>
                <!-- /.col -->
            </div>
            <!-- /.social-auth-links -->

        </div>
    </div>
</template>


<script>

    import api from './api/user'

    export default {
        data: function () {
            return {
                username: 'admin',
                password: 'admin',
                captcha: '',
                error: false,
                errorMsg: '',
                src: 'http://localhost:8080/chainPro_war_exploded/captcha.jpg'

            }
        },


        methods: {

            refreshCode: function () {
                // this.src = "http://localhost:8080/chainPro_war_exploded/captcha.jpg?t=" + $.now();
            },
            login: function () {


                var data = "username=" + this.username + "&password=" + this.password + "&captcha=" + this.captcha;

                // if(this.$store.dispatch('sysUser/Login', data)){
                //     window.location.href= 'index.html'
                // } else {
                //     console.log("cuo");
                //
                // }

                api.login(data).then(res => {

                    // setSessionStorage('token', res.session.id)

                    if (res.code == 0) {//登录成功

                        window.location.href = 'index.html'
                    } else {
                        this.error = true;
                        this.errorMsg = res.msg;

                        this.refreshCode();
                    }
                })
            },




        }

    }
</script>


<style>

</style>
