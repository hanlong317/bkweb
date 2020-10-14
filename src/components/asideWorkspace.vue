<template>
  <div class="globl-aside">
    <el-menu ref="menu" :router="true" :default-active="$route.meta.name" class="el-menu-vertical-demo" :unique-opened="true" background-color="rgba(0,0,0,0)" text-color="#130b2a" active-text-color="#fff">

      <el-submenu index="toDoList1">
        <template slot="title">
          <i class="fa fa-edit"></i>
          <span>工作台</span>
          <!-- <div class="redLine"></div> -->
        </template>
        <el-menu-item index="toDoList">待办任务 <span class="numCir"></span></el-menu-item>
        <el-menu-item class="registerStyle">
          <router-link :to="{path: '/form/atwcreate'}" target="_blank">
           申请创建
          </router-link>
        </el-menu-item>
        <el-menu-item index="drafts">草稿箱<span class="numCir">{{$store.state.draftBoxCount}}</span></el-menu-item>
        <el-menu-item index="myApplicationTracking">我的申请</el-menu-item>
        <el-menu-item index="applicationTracking" >申请单跟踪<span class="numCir">{{$store.state.applicationTrackingCount}}</span></el-menu-item>
        <el-menu-item index="searchCenter">查询中心</el-menu-item>
        <el-menu-item index="outOffice">外出授权</el-menu-item>
      </el-submenu>

      <el-submenu index="news">
        <template slot="title">
          <i class="fas fa-clipboard-check"></i>
          <span>业务处理</span>
          <!-- <div class="redLine"></div> -->
        </template>
        <!--<el-menu-item index="proStatusReport">报表参考1</el-menu-item>-->
        <el-menu-item index="fullFieldReport">报表查询</el-menu-item>
      </el-submenu>
      <el-submenu index="config" >
        <template slot="title">
          <i class="fas fa-cog"></i>
          <span>应用配置</span>
          <!-- <div class="redLine"></div> -->
        </template>
        <el-menu-item index="department" >部门</el-menu-item>
        <el-menu-item index="platform" >平台</el-menu-item>
        <el-menu-item index="carModel" >车系</el-menu-item>
        <el-menu-item index="plant" >工厂</el-menu-item>
        <el-menu-item index="plantConfig" >工厂审批配置</el-menu-item>
        <el-menu-item index="mos" >MOS订单负责人配置</el-menu-item>
        <el-menu-item index="role" >角色配置</el-menu-item>
      </el-submenu>
      <el-submenu index="manager">
        <template slot="title">
          <i class="fas fa-wrench"></i>
          <span>管理工具</span>
          <!-- <div class="redLine"></div> -->
        </template>
        <el-menu-item index="resources" >定义功能项</el-menu-item>
        <el-menu-item index="roles" >功能角色授权</el-menu-item>
        <el-menu-item index="administrator" >系统管理员</el-menu-item>
        <el-menu-item index="outOfAdministrator" >管理员工作授权</el-menu-item>
        <el-menu-item index="jobEdit">申请单编辑路由</el-menu-item>
        <el-menu-item index="operatorLog">管理员操作日志</el-menu-item>
      </el-submenu>
      <el-menu-item index="onlineHelp">
        <i class="fas fa-question-circle"></i>
        <span slot="title">在线帮助</span>
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script>
// import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    // ...mapGetters("NPP",["getAside"]),
    // getOpens() {
    //   return this.getAside.map(item => {
    //     return item.name;
    //   });
    // }
  },
  data(){
    return {
      // getAside: [
        // {
        //   langKey: '流程管理',
        //   name: '流程管理',
        //   child: [
        //     {
        //       langKey: '流程管理',
        //       name: '/workspace/work/processBizManage',
        //     },
        //   ]
        // },]
    }
  }
};
</script>
<style scoped>
  .numCir {
    /* margin-top:10px; */
    float: right;
    line-height: 60px;
    /* color: #409eff; */
    color: red;
  }
  .redLine {
    height: 60px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>