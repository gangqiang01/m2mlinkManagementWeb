<template>
    <el-dialog title="Add Repo" :visible.sync="dialogAddAppVisible" :show-close="isShowClose">
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
            <el-form-item label="App Summary" prop="summary">
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
            </el-form-item>
            <el-form-item label="Select apk file">
                <input type="file" name="file" @change="getfile($event)">
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">Cancel</el-button>
            <el-button type="primary" @click="addApp()">Add</el-button>
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
                form:{
                    rid:'',
                    description:'',
                    website:'http://',
                    license:'',
                    summary:''
                },
                addfileurl:null,
                rules: {
                    description: [
                        { max:128 , message:'The length cannot exceed 128 characters' , trigger:'blur'},
                        { required: true, message: 'apk description cannot be empty',trigger:'blur'}
                    ], 
                }
            };
        },
        props: {
            dialogAddAppVisible: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            getfile(event){
                this.file = event.target.files[0];
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
                        formdata.append("file", this.file);
                        formdata.append("rid", this.form.rid);
                        formdata.append("description",this.form.description);
                        formdata.append("website",this.form.website);
                        formdata.append("license",this.form.license);
                        formdata.append("summary",this.form.summary);
                        _g.openGlobalLoading();
                        addAppApi(formdata).then((res) => {
                            handelResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("", "success", "success").then(() => {
                                        this.$emit("result", false);
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
            hideDialog(){
                this.$emit("result", false);
            }
        },
        created() {
            this.getAllRepos();
        },
    }
</script>