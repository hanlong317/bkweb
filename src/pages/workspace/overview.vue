<template>
   <div style="height: 800px" class="overview">
     <el-row :gutter="20">
       <el-col :span="6">
         <el-badge :value="toDoListValue" class="item">
         <li>
           <span>
             <router-link to="/overview" target="_blank">
               <i class="el-icon-document"></i>
               <el-row>
                 <span class="menu-text">
                 待审批
               </span>
               </el-row>
             </router-link>
           </span>
         </li>
         </el-badge>
       </el-col>
       <el-col :span="6"></el-col>
       <el-col :span="6"></el-col>
       <el-col :span="6"></el-col>
     </el-row>
   </div>
</template>

<script>
    export default {
        name: "overview",
      data(){
          return{
            toDoListValue:1,
          }
      }

    }
</script>

<style scoped>

  .overview li{
      width: 125px;
      height: 125px;
      display: inline-block;
      border-radius: 5px;
      margin-left: 125px;
      text-align: center;
      cursor: pointer;
      padding-top: 25px;
    box-shadow: 10px 10px 5px #888888;
    border: 1px solid rgba(125, 125, 125, 0.47);
    }
  .menu-text{
    line-height: 30px;
  }

  .el-icon-document{
    font-size: 45px;
  }
</style>
