<template>
	<div>
		<div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-sliders c-blue m-r-10" aria-hidden="true"></i>Repo List</p>
        </div>
		<div class="cf panel-header">
            <div class="fr m-r-10"> 
                <el-button size="small" type="success" @click="showAddDialog">Add</el-button> 
                <el-input size="small" class="w-300 m-l-10" v-model="keywords" placeholder="Keyword of user">
                    <el-button slot="append" icon="el-icon-search"  @click="handleCurrentChange" ></el-button>
                </el-input>
            </div>
        </div>
		<el-table
		:data="tableData"
		style="width: 100%">

            <el-table-column
                label="Repo Name"
                prop="reponame"
                min-width="130">
            </el-table-column>
            <el-table-column
                label="Repo Type"
                prop="type"
                min-width="130">
            </el-table-column>	
            <el-table-column
                label="Description"
                prop="description"
                min-width="100">
            </el-table-column>
            <el-table-column
            label="Repo Manager"
            min-width="100">
                <template slot-scope="scope">
                    <div>
                        <span>
                            {{scope.row.user.name}}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="Action"
                width="150">
                <template slot-scope="scope">
                    <div>
                        <span>
                            <el-button size="small" type="danger" @click="confirmDelete(scope.row)">Delete</el-button>
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
        <add-dialog ref="addDialog" @checkResult="checkResult"></add-dialog>
	</div>
</template>
<script>
import { getReposApi, deleteRepoApi } from "../restfulapi/repoApi";
import addDialog from "./addDialog"
import handelResponse from "../restfulapi/handleResponse"
export default {
    data() {
        return {
            limit: 10,
            dataCount: null,
            currentPage: null,
            keywords: '',
            tableData: [],
            dialogAddRepoVisible: false
        };
    },
    components: {
        addDialog
    },
    methods: {
        handleCurrentChange(page) {
            router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: this.currentPage }})
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

        checkResult(val){
            if(val === "success"){
                this.getAllRepos();
            }
        },
        showAddDialog(){
            this.$refs.addDialog.dialogAddRepoVisible = true;
        },

        confirmDelete(item) {
            _g.swalWarnDo("Delete").then((isDelete) => {
                if(isDelete){
                    deleteRepoApi(item.rid).then(res => {
                        handelResponse(res, (data) => {
                            if(data.status === "success"){
                                swal("", "success", "success").then(() => {
                                    this.getAllRepos();
                                });
                            }else{
                                _g.handleError(data);
                            }
                        });
                    });
                }
                
            })
        },
        getAllRepos() {
            const data = {
                keywords: this.keywords,
                currentpage: this.currentPage,
                limit: this.limit
            }
            getReposApi(data).then(res => {
                handelResponse(res, (data) => {
                    if(data.status === "success"){
                        this.tableData = data.data;
                        this.dataCount = data.data.length;
                    }
                });
            });
        },
        init() {
            this.getKeywords()
            this.getCurrentPage()
            this.getAllRepos();
        }
    },
    created() {
        this.init();
    },

    watch: {
        $route(to, from) {
            this.init();
        }
    }
};
</script>