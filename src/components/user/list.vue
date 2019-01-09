<template>
	<div>
        <div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-server c-blue m-r-10" aria-hidden="true"></i>{{$t('User List')}}</p>
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
                <template scope="scope">
                    <div>
                        {{ scope.row.ts|time}}
                    </div>
                </template>
			</el-table-column>
      
			<el-table-column
			label="Action"
			width="150">
            <template scope="scope">
            <div>
                <span>
                    <el-button size="small" type="danger" @click="confirmDelete(scope.row)">delete</el-button>
                </span>
            </div>
            </template>
			</el-table-column>
		</el-table>
   
		<div class="pos-rel p-t-20 fr">
       
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
            <el-form ref="form" :model="form" :rules="rules" label-width="formLabelWidth" >
                <el-form-item label="User Name:">
                    <el-input v-model.trim="form.username" autocomplete="off" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="Password:">
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
    import {allUserInfoApi, deleteUserApi, addUserApi} from "../restfulapi/userApi"
    import handleResponse from "../restfulapi/handleResponse"

    export default {
        data() {
             var validateUser=(rule,value,callback)=>{
                let reg=new RegExp(/^[a-zA-Z0-9]\S{5,17}$/);
                if(!reg.test(value)){
                return callback(new Error ('字母或数字开头，长度为6-18位 只包含字母和数字'))
                }else if(value==""){
                return callback(new Error('请输入用户名'))
                }else{callback()};
            };
            var validatePassword=(rule,value,callback)=>{
                let reg=new RegExp(/^[a-zA-Z]\w{5,17}$/);
                if(!reg.test(value)){
                return callback(new Error ('字母开头，长度为6-18位 只包含字母、数字和下划线'))
                };
                if(value==""){
                return callback(new Error('请输入用户名密码 '))
                }else{callback()};
            };
            return {
                tableData: [],
                dataCount: null,
                currentPage: null,
                keywords: '',
                multipleSelection: [],
                limit: 15,
                dialogAddUserVisible:false,
                formLabelWidth: 130,
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {  validator:validateUser,required:true,trigger:'blur' }
                    ],
                    
                    password: [
                        {  validator:validatePassword,required:true,trigger:'blur' }
                    ],
                    
                }
            }
        },
        methods: {
            search() {
                router.push({ path: this.$route.path, query: { keywords: this.keywords, page: 1 }})
            },
            selectItem(val) {
                this.multipleSelection = val
            },
            handleCurrentChange(page) {
                router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: page }})
            },

            deleteUser(item) {
                _g.swalInfoDo("delete").then((result) => {
                    if(result){
                        deleteUserApi(item.uid).then((res) => {
                            handleResponse(res, (data) => {
                                if(data.status === "success"){
                                    _g.swalSuccessDo("success").then((result) => {
                                        if(result){
                                            this.getAllUsers()
                                        }
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
                allUserInfoApi(data).then((res) => {
                    handleResponse(res, (data) => {
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
                this.$refs.form.validate((pass) => {
                    if (pass) {
                        addUserApi(this.form).then((res) => {
                            handleResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("","success","success")
                                }else{
                                    _g.handleError(data)
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