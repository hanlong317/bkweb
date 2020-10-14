<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>配置</el-breadcrumb-item>
            <el-breadcrumb-item>人员配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="search-button">
            <el-button icon="el-icon-search" type="primary">搜索</el-button>
            <el-button>重置</el-button>
        </div>
        <el-table :data="tableData" :height="$store.state.height">
            <el-table-column label="昵称" prop="name"></el-table-column>
            <el-table-column label="账号" prop="userName"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="编辑" >
                <template slot-scope="scope">
                    <a onclick="edit(scope.row)">编辑</a>
                    <a onclick="delete(scope.row)">删除</a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="$store.state.pageSizes"
                :page-size="pageVo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Employee",
        data(){
            return{
                tableData:[],
                total:0 ,
                pageVo : {
                    pageNum : 0 ,
                    pageSize : 10 ,
                    model : {} ,
                },
            }
        },
        created() {
            this.search();
        },
        methods:{
            search() {
                this.$ajax.post("/bkwsp/base/tm-employee/batch/v1",this.pageVo).then(response => {
                    console.log(response,"response");
                    this.tableData = response.list;
                    this.total = response.size
                })
            },
            handleSizeChange(val) {
                this.pageVo.pageSize=val;
                console.log(`每页 ${val} 条`);
                this.search();
            },
            handleCurrentChange(val) {
                this.pageVo.pageNum=val;
                console.log(`当前页: ${val}`);
                this.search();
            },
            edit(e){

            },
            delete(e){

            }
        }
    }
</script>

<style scoped>

</style>
