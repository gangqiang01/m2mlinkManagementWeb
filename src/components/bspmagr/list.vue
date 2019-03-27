<template>
	<div>
		<div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-sliders c-blue m-r-10" aria-hidden="true"></i>Bsp List</p>
        </div>
		<div class="cf panel-header">
            <div class="fr m-r-10"> 
                <el-button size="small" type="success" @click="showAddDialog">Add</el-button> 
                <el-input size="small" class="w-300 m-l-10" v-model="keywords" placeholder="Keyword of boardname">
                    <el-button slot="append" icon="el-icon-search"  @click="handleCurrentChange" ></el-button>
                </el-input>
            </div>
        </div>
		<el-table
		:data="tableData"
		style="width: 100%"
		>
            <!-- <el-table-column
                label="File Name"
                prop="filename"
                min-width="100">
            </el-table-column> -->
            <el-table-column
                prop="address"
                label="Download Address"
                min-width="100"
                >
            </el-table-column>  
            <el-table-column
                prop="boardname"
                label="Board Name"
                min-width="100"
                >
            </el-table-column>  
            <el-table-column
                label="Repo Name"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div>
                        <span>
                            {{scope.row.repo.reponame}}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="versionname"
                label="Build Version"
                min-width="110"
                >
            </el-table-column> 
            <el-table-column
                prop="description"
                label="Description"
                min-width="100"
            >
             </el-table-column>
            <el-table-column
                label="Action"
                width="100">
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
            <div class="block pages">
                <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size="limit"
                :current-page="currentPage"
                :total="dataCount">
                </el-pagination>
            </div>
        </div>
	</div>
</template>
<script>
    import {getBspsApi, deleteBspApi} from "../restfulapi/bspmagrApi"
    import handelResponse from "../restfulapi/handleResponse"
    export default {
        data() {
            return {
                tableData: [],
                dataCount: 1,
                currentPage: 0,
                limit: 15,
                configaction:'',
                keywords: '',
            }
        },
        methods: {
            search() {
                router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: this.currentPage }})
            },
            getKeywords() {
                let data = this.$route.query
                if (data) {
                    if (data.keywords) {
                        this.keywords = data.keywords
                    } else {
                        this.keywords = ''
                    }
                }
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
            handleCurrentChange(page) {
                router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: this.currentPage }})
            },
            confirmDelete(item) {
                _g.swalInfoDo("Delete").then((isDelete) => {
                    if(isDelete){
                        _g.openGlobalLoading();
                        deleteBspApi(item.rbid).then((res) => {
                            handelResponse(res, (data) => {
                                if(data.status === "success"){
                                    swal("", 'success', 'success').then(() => {
                                        this.getAllBsps();
                                    })
                                }else{
                                    _g.handleError(data);
                                }
                                
                            })
                        })
                    }   
                })
            },
            getAllBsps() {
                const data = {
                    keywords: this.keywords,
                    currentpage: this.currentPage,
                    limit: this.limit
                }
                getBspsApi(data).then((res) => {
                    handelResponse(res, (data) => {
                        if(data.status === "success"){
                            this.tableData = data.data;
                            this.dataCount = data.data.length;
                        }
                    })
                })
            }, 

            showAddDialog(){
                this.$router.push("/main/bspmagr/add");
            },  

            checkResult(val){
                if(val === "success"){
                    this.getAllBsps();
                }
            },
            init() {
                this.getCurrentPage(),
                this.getKeywords(),
                this.getAllBsps()
            
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
