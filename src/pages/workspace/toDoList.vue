<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>工作台</el-breadcrumb-item>
      <el-breadcrumb-item>待审批</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="from-search">
        <el-col :span="2" class="label-content">主题:</el-col>
        <el-col :span="4" class="right-content">
          <el-input v-model="pageVo.model.subject" size="small"></el-input>
        </el-col>
    </div>
    <div class="search-button">
      <el-button icon="el-icon-search" type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </div>
    <el-table :data="tableData" :height="$store.state.height">
      <el-table-column label="主题" prop="subject"></el-table-column>
      <el-table-column label="提交日期" prop="requestDate"></el-table-column>
      <el-table-column label="提交编号" prop="requestNo"></el-table-column>
      <el-table-column label="提交人" prop="drafter"></el-table-column>
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
        name: "toDoList",
      data(){
          return  {
            total:1,
            pageVo : {
              pageNum : 0 ,
              pageSize : 10 ,
              model : {
                subject:'',
              } ,
            },
            tableData:[
              {
                subject:'***的第一次提交',
                requestDate:'2020/08/21',
                requestNo:'TJ-2020-08-001',
                drafter:'小明',
              }

            ]
          }
      },
      beforeRouteEnter(to,form,next){
          next(vm=>{
            vm.search();
          })
      },
      methods:{
        search(){

        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style scoped>
   .label-content{
     font-size: 18px;
     text-align: right;
     padding-right: 10px;
     color: #2a2a2a;
   }
   .right-content{

   }
  .from-search{
      display: block;
  }
  .search-button{
    margin-top: 60px;
    margin-bottom: 30px;
    display: inline-block;
    position: relative;
    left: 20%;
  }
</style>
