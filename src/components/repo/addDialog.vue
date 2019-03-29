<template>
    <el-dialog :visible.sync="dialogAddRepoVisible" :show-close="isShowClose">
        <div slot="title" class="dialog-title">
            <i class="fa fa-plus-square-o m-r-10" aria-hidden="true"></i>
            Add Repo
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="m-l-30">
			<el-form-item label="Repo Name" prop="reponame">
				<el-input v-model.trim="form.reponame" class="repoInput" ></el-input>
			</el-form-item>	
            <el-form-item label="Description" prop="description">
                <el-input 
                v-model="form.description" 
                class="repoInput" 
                autocomplete="off" 
                type="textarea" 
                :autosize="{ minRows: 1, maxRows: 3}">
                </el-input>
            </el-form-item>
            <el-form-item label="Repo Type" >
                <el-select v-model.number="form.rtid"  class="repoSelect" placeholder="Please select repo type">
                    <el-option v-for="(item, index) in repoTypes" :key="index" :label="item.typename" :value="item.rtid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Repo Manager" >
                <el-select v-model.number="form.uid"  class="repoSelect" placeholder="Please select repo manager">
                    <el-option v-for="(item, index) in repoUsers" :key="index" :label="item.name" :value="item.uid"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddRepoVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addRepo()">Add</el-button>
        </div>
    </el-dialog>
</template>
<style type="text/css">
	.repoInput{
		height: 40px;
        width: 320px;
	}
    .repoSelect{
        width: 320px;
    }
</style>
<script>
    import {getReposApi, deleteRepoApi, addRepoApi, } from '../restfulapi/repoApi';
    import {getAllUserInfoApi} from "../restfulapi/userApi"
    import handelResponse from "../restfulapi/handleResponse"
    import {getRepoTypesApi} from "../restfulapi/repoTypeApi"

export default {
    data() {
        return {
            repoUsers:[],
            repoTypes: [],
            isLoading: false,
            isShowClose: false,
            dialogAddRepoVisible: false,
            form: {
                reponame:'',
                description:'',
                uid:'',
                rtid:''
            },
            rules: {
                reponame: [
                    {required: true, message: 'Please input repo name'}
                ],
                uid: [
                    { required: true, message: 'Please select repo manager'},
                ],
                rtid: [
                    { required: true, message: 'Please select repo type'},
                ],
            }
        }
    },
    methods: {
        addRepo() {
            this.$refs.form.validate((pass) => {
                if (pass) {
                    this.dialogAddRepoVisible = false;
                    _g.openGlobalLoading();
                    console.log(this.form);
                    addRepoApi(this.form).then((res) => {
                        handelResponse(res, (data) => {
                            if(data.status === "success"){
                                _g.closeGlobalLoading()
                                swal("", "success", "success").then(() => {
                                    this.dialogAddRepoVisible = false;
                                    this.$emit("checkResult", "success");
                                })
                            }else{
                                _g.handleError(data);
                            }
                        })
                    })
                }
            })
        },
        getAllOrgs() {
            getAllUserInfoApi().then((res) => {
                handelResponse(res, (data) => {
                    if(data.status === "success"){
                        this.repoUsers = data.data;
                    }
                })
            })
        },

        getAllTypes(){
            getRepoTypesApi().then((res) => {
                handelResponse(res, (data) => {
                    if(data.status === "success"){
                        this.repoTypes = data.data;
                    }
                })
            })
        }
    },
    watch: {
        dialogAddRepoVisible(val){
            if(val){
                Object.assign(this.$data.form, this.$options.data().form)
            }
            
        }
    },
    created() {
        this.getAllOrgs();
        this.getAllTypes();
    },
  }
</script>