<template>
    <el-dialog title="Add Repo" :visible.sync="dialogAddRepoVisible" :show-close="isShowClose">
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
            <el-form-item label="Repo" >
                <el-select v-model.number="form.uid"  class="repoSelect" placeholder="Please select repo manager">
                    <el-option v-for="(item, index) in repousers" :key="index" :label="item.name" :value="item.uid"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog()">Cancel</el-button>
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

export default {
    data() {
        return {
            repousers:[],
            isLoading: false,
            isShowClose: false,
            form: {
                reponame:'',
                description:'',
                uid:'',
            },
            rules: {
                reponame: [
                    { required: true, message: 'Please input repo name'}
                ],
                uid: [
                    { required: true, message: 'Please select repo manager'},
                ],
            }
        }
    },
    props: {
        dialogAddRepoVisible: {
            type: Boolean,
            default: false,
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
                                    this.$emit("result", false);
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
                        this.repousers = data.data;
                    }
                })
            })
        },
        hideDialog(){
            this.$emit("result", false);
        }
    },
    created() {
        this.getAllOrgs()
    },
  }
</script>