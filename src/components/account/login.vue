<template>
    <div>
        <el-form :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
        <div class="title">
            <h2>
                {{systemName}}
            </h2>
            <p>Welcome To <br/>AndroidLink/A-Store Server</p>
        </div>
        <el-form-item prop="username">
            <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" v-loading="loading" @click.native.prevent="handleSubmit()">登录</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {loginApi} from '../restfulapi/authApi'
    import handleResponse from "../restfulapi/handleResponse"

    export default {
        name: 'login',
        data() {
            return {
                title: '',
                systemName: 'AndroidLink/A-Store',
                loading: false,
                form: {
                    username: '',
                    password: '',
                },

                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                checked: false
            }
        },
        methods: {
            handleSubmit() {
                if(this.loading) return;
                this.loading = !this.loading
                loginApi(this.form.username, this.form.password).then((res) => {
                    this.loading = false;
                    handleResponse(res, (res) => {
                        if(res.status == "success"){
                            cookie.setCookie("token", res.data.token, 60);
                            sessionStorage.setItem("username", this.form.username);
                            let nowTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
                            sessionStorage.setItem("logintime", nowTime);
                            router.replace({name:'main'});
                        }
                        
                    })
                })
               
            }
        },
        mounted() {
            window.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    this.handleSubmit2()
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
@import "../../assets/css/colors";
.verify-pos {
	position: absolute;
	right: 100px;
	top: 0px;
}
.card-box {
	padding: 20px;
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin-bottom: 20px;
	background-color: #F9FAFC;
	margin: 120px auto;
	width: 400px;
	border: 2px solid #8492A6;
}

.title {
	margin: 0px auto 40px auto;
    text-align: center;
    h2{
        margin-bottom:5px;
        color: $primary-color;
    }
    p{
        color: $darkgray-color;
    }
}

.loginform {
	width: 350px;
	padding: 35px 35px 15px 35px;
}
</style>