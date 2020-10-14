<template>
  <el-container style="height: 100%">
    <el-header style="background-color: #2b85e4">
      <h1 class="header-h">后台控制系统 | Backstage control system</h1>
      <div style="
      position: relative;
      top: -30px;
      display: inline-block;
      color:white;
      left: 90%;">
        {{name}}
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(84, 92, 100);height: 100%">
        <el-menu
          :default-active="$route.meta.name"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
          ref="menu"
        >
          <!--这个:unique-opened和:router 这个属性比较重要-->
          <el-submenu index="workspace">
            <template slot="title">
              <span>工作台</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="overview">台账总览</el-menu-item>
              <el-menu-item index="toDoList">待审批</el-menu-item>
              <el-menu-item index="drafter">草稿箱</el-menu-item>
              <el-menu-item index="myApplication">我的申请</el-menu-item>
              <el-menu-item index="searchCenter">查找中心</el-menu-item>
              <el-menu-item index="relation">联系</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="employeeManage">人员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>任务</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">定时任务</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <span>在线帮助</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">在线客服</el-menu-item>
              <el-menu-item index="5-2">关于</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main >
        <router-view :list="list" :websocketsend="websocketsend" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "workspace",
      data(){
          return{
            name:this.$store.state.name,
            list:'',
          }
      },

      created() {
        this.initWebSocket();
      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },
      methods:{
        initWebSocket(){ //初始化weosocket
          const wsuri = this.$store.state.webSocketUrl+this.$store.state.userId;
          this.websock = new WebSocket(wsuri);
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onclose = this.websocketclose;
        },
        websocketonopen(){ //连接建立之后执行send方法发送数据
          let actions = {};
          actions.type="group";
          actions.tid="001";
          actions.name=this.$store.state.name;
          actions.data=this.$store.state.name + "加入群聊";
          this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror(){//连接建立失败重连
          this.initWebSocket();
        },
        websocketonmessage(e){ //数据接收
          const redata = e.data;
          let data = JSON.parse(redata);
          console.log(data,'data');
          this.list.push(data);
        },
        websocketsend(Data){//数据发送
          this.websock.send(Data);
        },
        websocketclose(e){  //关闭
          console.log('断开连接',e);
        },

      }
    }
</script>

<style scoped>
    .header-h{
      margin-left: 30px;
      margin-top: 12px;
      color: white;
    }
    .el-collapse-item__header{
      background-color: #2b85e4 ;
    }
    .el-collapse-item__header li{
    display: block;
    text-align: center;
    height: 30px;
    background: #919191;
    font-size: 18px;
  }
</style>
