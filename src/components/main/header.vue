<template>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
    <el-header class="nav-header">
        <ul class="nav-left pointer" >
            <li @click="collapse()">
                <i class="fa fa-bars collapseIcon pointer" aria-hidden="true" @click="collapseAsideNavbar()"></i>
            </li>
            <li style="font-size:28px; color:#3c8dbc; font-weight:900; font-family: 'Microsoft YaHei'">
                AndroidLink/A-Store
                <!-- <img src="@/assets/imgs/m2mlink_logo.png"> -->
            </li>
        </ul>
        <ul class="nav-right">
            
            <li> 
                <el-dropdown trigger="click" >
                    <span class="el-dropdown-link">
                        <i class="fa fa-user-circle-o header-user pointer"></i> 
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

            <!-- <li> 
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
            </li> -->
        </ul>
    </el-header>
</template>
<style lang="scss"  scoped>
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
                &:nth-child(1){
                    margin-right: 1.5rem;
                    margin-top: 0.5rem;
                    font-size: 1.1rem;
                }
                &:nth-child(2){
                    margin-top: 0.1rem;
                    font-weight:900; 
                    font-family: 'Microsoft YaHei';
                    font-size: 2.1rem; 
                }
                color:$primary-color; 
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

</style>
<script>
    // import {getAccount, getOnlineDeviceCountApi, getAccountApi} from '../restfulapi/userinfoapi'
    // import handleResponse from "../restfulapi/handleresponse"
    import {mapState} from 'vuex'
    import {setLang} from '../../lang/lang'
    import handleResponse from '../restfulapi/handleResponse'
    import {getSession, setLocal, getLocal, removeLocal, checkLocal} from "../../assets/js/storage"

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
                this.username = getSession("username");
                this.logintime = getSession("logintime");
            },

            loginout(){
                this.$router.replace('/');
            },

            switchLang(lang){
                setLang(lang);
            },

            collapseAsideNavbar(){
                this.$emit("collapseAsideNavbar", "")
            },
            
        },

        created(){
            this.getuserinfo();   
        },

       
    }
</script>

