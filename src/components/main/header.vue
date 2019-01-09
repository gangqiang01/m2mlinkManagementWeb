<template>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
    <el-header class="nav-header">
        <ul class="nav-left pointer" >
            <!-- <li @click="collapse()">
                <i :class="[isCollapse? allowright: allowleft]"class="c-blue" aria-hidden="true"></i>
            </li> -->
            <li style="font-size:34px; color:#3c8dbc; font-weight:900; font-family: 'Microsoft YaHei'">
                AimLink
                <!-- <img src="@/assets/imgs/m2mlink_logo.png"> -->
            </li>
        </ul>
        <ul class="nav-right">
            
            <li> 
                <el-dropdown trigger="click" >
                    <span class="el-dropdown-link">
                        <i class="fa fa-user-circle-o header-user"></i> 
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="text-center" >
                            <img src="@/assets/imgs/face_black.png" alt="">
                            <p style="font-size: 23px"> {{username}}</p>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <b class="w-150">Last Accessed:</b>{{logintime}}
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="primary" size="small" class="fr" @click="loginout()">
                                {{loginstate}}
                            </el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>  
            </li>

            <li> 
                <el-dropdown trigger="click" @command="switchLang">
                    <span class="el-dropdown-link">
                        <i class="fa fa-globe"></i> 
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="text-center" command="zh">
                            <p> Chinese</p>
                        </el-dropdown-item>
                        <el-dropdown-item  command="en">
                            <p>English</p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>  
            </li>
        </ul>
    </el-header>
</template>
<style lang="scss" scoped>
    @import "../../assets/css/colors"; 

    .nav-header{
        background: $lightgray-color;
        border-bottom: 3px solid $purple-color;
        display: -webkit-flex;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .nav-left{
            padding: 0;
            margin: 0;
            display: flex;
            li{ 
                img{
                    height: 35px;
                }
                i{
                    color : $primary-color;
                    font-size:1.5rem
                }
                margin-right: 1rem;
                &:nth-child(2){
                    margin-top: 0.1rem;
                } 
            }
        }
        .nav-right{
            padding:0;
            margin:0;
            display: flex;
            li{  
                i{
                    color : $primary-color;
                    font-size:1.5rem;
                }
                margin-left: 2rem;
                width: 1rem;
                color: $primary-color;
            }
                            
        }
    }
    .msgContainer{
        max-height: 22rem;
        max-width: 20rem;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .msgHeader{
        color: $primary-color;
        font-weight: 700;
    }
</style>
<script>
    // import {getAccount, getOnlineDeviceCountApi, getAccountApi} from '../restfulapi/userinfoapi'
    // import handleResponse from "../restfulapi/handleresponse"
    import {mapState} from 'vuex'
    import {setLang} from '../../lang/lang'
    import handleResponse from '../restfulapi/handleResponse'

    export default{
        name: 'mainHeader',
        data(){
            return {
                img:"",
                loginstate:'Login Out',
                username:'',
                logintime:'',
                devicecount:'',
                msgData: [],
                allowleft: "fa fa-long-arrow-left",
                allowright: "fa fa-bars",
                activeItem: 'device-devicelist',
            }
        },
        methods:{
            collapse(){
                this.isCollapse = this.isCollapse? false: true;
            },

            getuserinfo(){
                this.username = localStorage.getItem("username");
                this.logintime = localStorage.getItem("logintime");
            },

            loginout(){
                this.$router.replace('/');
            },

            markAll(){
                this.msgData = [];
                window.localStorage.removeItem("msgData");   
            },

            viewAll(){
                this.markAll();
                // router.replace('/main/message/list')
            },

            showMsg(){
                if(window.localStorage.getItem("msgData") != null){
                    let msgLocalData = localStorage.getItem('msgData');
                    msgLocalData = JSON.parse(msgLocalData);
                    msgLocalData.reverse()
                    this.msgData = msgLocalData;
                }               
            },
            switchLang(lang){
                setLang(lang);
            },
            
        },

        created(){
            this.showMsg()
            this.getuserinfo();   
        },

       
    }
</script>

