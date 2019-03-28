<template>
    <div>
        <div class="m-t-10 ">
            <p class="header-line"> 
                <i class="fa fa-arrow-left m-r-10 pointer" aria-hidden="true" @click="back()"></i>
                Bsp Upload
            </p>
        </div>
        <el-col :md="6">
            <div class="bsp_intro">
                <div class="tag"></div>
                <h4 class="intro_title text-center">
                    Bsp Upload Introduce
                </h4>
                <p class="intro_content">
                    You can choose to put the bsp package on your own server or upload it to our own server.<br/>
                    Upload it on our own server: <span @click="selectBspFun('fileUpload')">{{uploadBspFun}}</span><br/>
                    Put it on your own server: <span @click="selectBspFun('fileInput')"> {{inputBspFun}}</span>
                </p>
            </div>
        </el-col>
        <el-col :md="18" >
            <el-tabs v-model="activeName">
                <el-tab-pane :label="uploadBspFun" name="fileUpload">
                    <el-form ref="file_form" :model="file_form" :rules="file_rules" label-width="150px" class="m-l-30">
                        <el-form-item label="Bsp Repo"  >
                            <el-select v-model="file_form.rid" placeholder="Please select repo" class="bspSelect">
                                <el-option v-for="(item, index) in repoOptions" :key=index :label="item.reponame" :value="item.rid"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Board Name" prop="boardname"　 >
                            <el-input v-model="file_form.boardname" placeholder="Please input board name of bsp package" class="bspInput"></el-input>
                        </el-form-item>

                        <el-form-item label="Build Version" prop="versionname">
                            <el-input v-model="file_form.versionname" placeholder="Please input version name of bsp package" class="bspInput"></el-input>
                        </el-form-item>

                        <el-form-item label="Bsp Description" prop="description">
                            <el-input 
                            class="bspInput"
                            type="textarea" 
                            v-model="file_form.description"
                            autocomplete="off"  
                            :autosize="{ minRows: 1, maxRows: 3}"
                            placeholder="please input description of bsp package">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Select Bsp Package">
                            <input type="file" name="file" @change="getfile($event)">
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="back()" size="small">Back</el-button>
                            <el-button type="primary" @click="addBspFile()" size="small">Upload</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="inputBspFun" name="fileInput">
                    <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="m-l-30">
                        <el-form-item label="Bsp Repo"  >
                            <el-select v-model="form.rid" placeholder="Please select repo" class="bspSelect">
                                <el-option v-for="(item, index) in repoOptions" :key=index :label="item.reponame" :value="item.rid"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Download Url" prop="address" >
                            <el-input v-model="form.address" placeholder="ex: http://172.21.73.144/bspdir/text.zip" class="bspInput">
                            </el-input>
                        </el-form-item>

                        <el-form-item label="Board Name" prop="boardname">
                            <el-input v-model="form.boardname" placeholder="Please input board name of bsp package" class="bspInput"></el-input>
                        </el-form-item>

                        <el-form-item label="Build Version" prop="versionname">
                            <el-input v-model="form.versionname" placeholder="Please input version name of bsp package" class="bspInput"></el-input>
                        </el-form-item>

                        <el-form-item label="Bsp Description" prop="description">
                            <el-input 
                            class="bspInput"
                            type="textarea" 
                            v-model="form.description"
                            autocomplete="off"  
                            :autosize="{ minRows: 1, maxRows: 3}"
                            placeholder="please input description of bsp package"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="back()" size="small">Back</el-button>
                            <el-button type="primary" @click="addBsp()" size="small">Add</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-col> 
    </div>
</template>
<style lang='scss' scoped>
    @import "../../assets/css/colors";
    .header-line{
        i:hover{
            color: $primary-color;
        }
    }
	.bspInput{
		height: 40px;
        width: 50%;
        min-width: 380px;
	}
    .bspSelect{
        height: 40px;
        width: 50%;
        min-width: 380px;
    }
    .bsp_intro{
        box-sizing: border-box;
        width: 90%;
        margin: 5px 5px 10px;
        border: 1px $gray-color solid;
        border-top: 3px $warn-color solid;
        border-radius: 3px;
        height: 480px;
        padding: 7%;
        // background-color: $gray-color;
        .intro_title{
            font-size: 18px;
            line-height: 36px;
            margin-bottom: 10px;
        }
        .intro_content{
            font-size: 14px;
            line-height: 26px;
            color: #666;
            span{
                color: $click-color;
                cursor: pointer;
            }
        }
    }
    .bsp_intro:hover{
        -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
        -webkit-box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        transition: all .3s;
    }
</style>

<script>
    import {addBspApi, addBspFileApi} from "../restfulapi/bspmagrApi"
    import {getReposApi} from "../restfulapi/repoApi"
    import handelResponse from "../restfulapi/handleResponse"
   
    export default {
        data() {
            return {
                repoOptions:[],
                file:null,
                isShowClose: false,
                activeName: "fileUpload",
                uploadBspFun: "BSP Upload",
                inputBspFun: "BSP Input",
                form:{
                    address: '',
                    boardname: '',
                    versionname: '',
                    rid:'',
                    description:'',
                },
                file_form:{
                    boardname: '',
                    versionname: '',
                    rid: '',
                    description: '',
                },
                addfileurl:null,
                rules: {
                    description: [
                        { max:128 , message:'The length cannot exceed 128 characters' , trigger:'blur'},
                        { required: true, message: 'description of bsp cannot be empty',trigger:'blur'}
                    ], 
                    boardname: [
                        { max:12 , message:'The length cannot exceed 12 characters' , trigger:'blur'},
                        { required: true, message: 'boardname of bsp cannot be empty',trigger:'blur'}
                    ], 
                    versionname: [
                        { max:24 , message:'The length cannot exceed 24 characters' , trigger:'blur'},
                        { required: true, message: 'versionname of bsp cannot be empty',trigger:'blur'}
                    ], 
                    address: [
                        { max:72 , message:'The length cannot exceed 72 characters' , trigger:'blur'},
                        { required: true, message: 'storage address of bsp cannot be empty',trigger:'blur'}
                    ]
                },

                file_rules: {
                    description: [
                        { max:128 , message:'The length cannot exceed 128 characters' , trigger:'blur'},
                        { required: true, message: 'description of bsp cannot be empty',trigger:'blur'}
                    ], 
                    boardname: [
                        { max:12 , message:'The length cannot exceed 12 characters' , trigger:'blur'},
                        { required: true, message: 'boardname of bsp cannot be empty',trigger:'blur'}
                    ], 
                    versionname: [
                        { max:24 , message:'The length cannot exceed 24 characters' , trigger:'blur'},
                        { required: true, message: 'versionname of bsp cannot be empty',trigger:'blur'}
                    ], 
                }
            };
        },
        methods: {
            addBsp(){ 
                if(!this.form.rid){
                    swal("", "repo cannot be empty", "info");
                    return;
                }
                this.$refs.form.validate((pass) => {
                    if (pass) {
                        this.dialogAddBspVisible = false;
                        _g.openGlobalLoading();
                        addBspApi(this.form).then((res) => {
                            handelResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("", "success", "success").then(() => {
                                        this.$router.push("/main/bspmagr/list");
                                    });
                                }else{
                                    _g.handleError(data);
                                }
                            })
                        })
                    }
                })
                
            },
            getAllRepos() {
                getReposApi().then((res) => {
                    handelResponse(res, (data) => {
                        if(data.status === "success"){
                            this.repoOptions = data.data;
                        }

                    })
                })
            },

            back(){
                this.$router.go(-1);
            },

            getfile(event){
                this.file = event.target.files[0];
            },

            addBspFile(){
                if(!this.file_form.rid){
                    swal("", "bsp repo cannot be empty", "info");
                    return;
                }
                let file_md5 = "";
                if(window.FileReader) {
                    var reader = new FileReader();
                    let self = this;
                    _g.openGlobalLoading();
                    reader.onload = function (e) {
                        file_md5 = self.$sparkMD5.hashBinary(e.target.result);
                        if(file_md5){
                            
                            addBspFileApi(self.file, file_md5,  self.file_form).then((res) => {
                                handelResponse((res), (data) => {
                                    if(data.status === "success"){
                                        swal("", "success", "success").then(() => {
                                            self.$router.push("/main/bspmagr/list")
                                        });
                                    }else{
                                        _g.handleError(data);
                                    }
                                })
                            })
                        }else{
                            swal("", "get file md5 error")
                        }
                    };
                    reader.onerror = function(e){
                       _g.closeGlobalLoading();
                    }
                    reader.readAsBinaryString(this.file)
                }else {
                    swal("","not supported by your browser!", info);
                }
               
            },
            selectBspFun(val){
                this.activeName = val;
            }
        },
        watch: {
            dialogAddBspVisible(val){
                if(val){
                    Object.assign(this.$data.form, this.$options.data().form)
                }
                
            }
        },
        created() {
            this.getAllRepos();
        },
    }
</script>