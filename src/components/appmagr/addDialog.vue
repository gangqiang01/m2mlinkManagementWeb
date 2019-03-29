<template>
    <el-dialog :visible.sync="dialogAddAppVisible" :show-close="isShowClose">
        <div slot="title" class="dialog-title">
            <i class="fa fa-plus-square-o m-r-10" aria-hidden="true"></i>
            Add App
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="m-l-30">
            <el-form-item label="App Repo"  >
                <el-select v-model="form.rid" placeholder="Please select repo" class="appSelect">
                    <el-option v-for="(item, index) in repoOptions" :key=index :label="item.reponame" :value="item.rid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="App Description" prop="description">
                <el-input 
                class="appInput"
                type="textarea" 
                v-model="form.description"
                autocomplete="off"  
                :autosize="{ minRows: 1, maxRows: 3}"
                placeholder="please input app description"></el-input>
            </el-form-item>
            <!-- <el-form-item label="App Summary" prop="summary">
                <el-input 
                class="appInput"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 2}" 
                v-model="form.summary"　
                autocomplete="off"  
                placeholder="Please input app summary">
                </el-input>
            </el-form-item>
            <el-form-item label="App Website" prop="website" >
                <el-input v-model="form.website" class="appInput">  
            </el-input>
            </el-form-item>
            <el-form-item label="App License" prop="license"　 >
                <el-input v-model="form.license" placeholder="Please input app license" class="appInput"></el-input>
            </el-form-item> -->
            <el-form-item label="Select Apk File">
                <input type="file" name="file" @change="getfile($event)">
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddAppVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addApp()">Upload</el-button>
        </div>
    </el-dialog>
</template>
<style type="text/css">
	.appInput{
		height: 40px;
        width: 320px;
	}
    .appSelect{
        width: 320px;
    }
</style>

<script>
    import {addAppApi} from "../restfulapi/appmagrApi"
    import {getReposApi} from "../restfulapi/repoApi"
    import handelResponse from "../restfulapi/handleResponse"
    export default {
        data() {
            return {
                repoOptions:[],
                file:null,
                isShowClose: false,
                dialogAddAppVisible: false,
                form:{
                    rid:'',
                    description:'',
                },
                rules: {
                    description: [
                        { max:128 , message:'The length cannot exceed 128 characters' , trigger:'blur'},
                        { required: true, message: 'apk description cannot be empty',trigger:'blur'}
                    ], 
                }
            };
        },
        methods: {
            getfile(event){
                let cfile = event.target.files[0];
                let ftype  = cfile.name.slice(cfile.name.lastIndexOf(".")+1).toLowerCase();
                if(ftype != "apk"){
                    swal("", "The uploaded file is not apk", "info")
                    return;
                }
                this.file = cfile;
            },
            addApp(){ 
                let formdata = new FormData();
                if(!this.file){
                    swal("", "file cannot be empty", "info");
                    return;
                }
                if(!this.form.rid){
                    swal("", "repo cannot be empty", "info");
                    return;
                }
                this.$refs.form.validate((pass) => {
                    if (pass) {
                        this.dialogAddAppVisible = false;
                        _g.openGlobalLoading();
                        addAppApi(this.file, this.form).then((res) => {
                            handelResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("", "success", "success").then(() => {
                                        this.dialogAddAppVisible = false;
                                        this.$emit("checkResult", "success");
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
        },
        watch: {
            dialogAddAppVisible(val){
                if(val){
                    this.file = null;
                    Object.assign(this.$data.form, this.$options.data().form)
                }
                
            }
        },
        created() {
            this.getAllRepos();
        },
    }
</script>