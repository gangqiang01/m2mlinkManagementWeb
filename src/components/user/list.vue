<template>
	<div>
        <div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-server c-blue m-r-10" aria-hidden="true"></i>User List</p>
        </div>
		<div class="cf panel-header">
            <div class="fr m-r-10"> 
                <el-button size="small" type="success" @click="dialogAddUserVisible=true">Add</el-button> 
                <el-input size="small" class="w-300 m-l-10" v-model="keywords" placeholder="Keyword of user">
                    <el-button slot="append" icon="el-icon-search"  @click="handleCurrentChange" ></el-button>
                </el-input>
            </div>
        </div>
		<el-table
		:data="tableData"
		style="width: 100%">

            <el-table-column
			prop="uid"
			label="User ID">
			</el-table-column>
            <el-table-column
			label="User Name"
			prop="name"
			min-width="80">
			</el-table-column>

			<el-table-column
			label="Create Time"
			min-width="115">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.ts|time}}
                    </div>
                </template>
			</el-table-column>
      
			<el-table-column
			label="Action"
			width="150">
            <template slot-scope="scope">
            <div>
                <span>
                    <el-button size="small" type="danger" @click="deleteUser(scope.row)">delete</el-button>
                </span>
            </div>
            </template>
			</el-table-column>
		</el-table>
   
		<div class="p-t-20 fr">
       
			<div>
				<el-pagination
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:page-size="limit"
				:current-page="currentPage"
				:total="dataCount">
				</el-pagination>
			</div>
		</div>
        <el-dialog title="Add User" :visible.sync="dialogAddUserVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="m-l-30">
                <el-form-item label="User Name:" :label-width="formLabelWidth" prop="username" >
                    <el-input v-model.trim="form.username" autocomplete="off" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="Password:" :label-width="formLabelWidth" prop="password">
                    <el-input v-model.trim="form.password" autocomplete="off" style="width: 320px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddUserVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addUser()">Add</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
    import {getAllUserInfoApi, deleteUserApi, addUserApi} from "../restfulapi/userApi"
    import handleResponse from "../restfulapi/handleResponse"

    export default {
        data() {
            let validateUser = (rule, value, callback) => {
                let reg = new RegExp(/^[a-zA-Z0-9]\S{3,17}$/);
                if(value == ""){
                    callback(new Error('please input username'));
                }else if(!reg.test(value)){
                    callback(new Error('Beginning with a letter or number, the length is 4-18 bits and contains only letters and Numbers'));
                }else{
                    callback();
                }
            };

            let validatePassword = (rule, value, callback) => {
                let reg = new RegExp(/^[a-zA-Z]\w{3,17}$/);
                if(value == ""){
                    callback(new Error('please input password'));
                }else if(!reg.test(value)){
                    callback(new Error('Letters begin with a length of 4-18 digits and contain only alphanumeric and underscore characters'));
                }else{
                    callback();
                }
                
            };

            return {
                tableData: [],
                dataCount: null,
                currentPage: null,
                keywords: '',
                multipleSelection: [],
                limit: 10,
                dialogAddUserVisible:false,
                formLabelWidth: "130px",
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: {validator: validateUser, trigger: 'blur'},
                    password: {validator: validatePassword, trigger: 'blur'},
                }
            }
        },
        methods: {
            handleCurrentChange(page) {
                router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: page }})
            },

            deleteUser(item) {
                _g.swalInfoDo("delete").then((result) => {
                    if(result){
                        deleteUserApi(item.uid).then((res) => {
                            handleResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("","success","success").then(() => {
                                        this.getAllUsers();
                                    })
                                }
                                
                            })
                        })
                    }
                })
               
            },

            getAllUsers() {
                const data = {
                    keywords: this.keywords,
                    currentpage: this.currentPage,
                    limit: this.limit
                }
                getAllUserInfoApi(data).then((res) => {
                    handleResponse(res, (data) => {
                        console.log(data);
                        this.tableData = data.data;
                        this.dataCount = this.tableData.length;
                    })
                })
            },

            getCurrentPage() {
                let data = this.$route.query
                if (data) {
                    if (data.page) {
                        this.currentPage = parseInt(data.page)
                    } else {
                        this.currentPage = 0
                    }
                }
            },

            getKeywords() {
                let data = this.$route.query
                if (data) {
                    if (data.keywords) {
                        this.keywords = data.keywords
                    }else {
                        this.keywords = ''
                    }
                }
            },

           addUser() {
               this.$refs.form.validate((valid) => {
                   if(valid){
                        addUserApi(this.form).then((res) => {
                            handleResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("","success","success").then(() => {
                                        this.getAllUsers();
                                    })
                                }else{
                                    _g.handleError(data);
                                }
                                this.dialogAddUserVisible = false;
                            })
                        })
                    }
               })
            },

            init() {
                this.getKeywords()
                this.getCurrentPage()
                this.getAllUsers()
            }
        },
        created() {
            this.init()
        },
        watch: {
            '$route' (to, from) {
                this.init()
            }
        },
    }
</script>