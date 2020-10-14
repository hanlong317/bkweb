<template>
  <div class="beijing">
    <div class="nianfen"></div>
    <div class="login">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-input v-model="model.userName" placeholder="试试邮箱、账号" prefix-icon="el-icon-user"  style="margin-top: 10px;"></el-input>
          <el-input v-model="model.passWord" placeholder="密码" prefix-icon="el-icon-lock"  style="margin-top: 10px;"></el-input>
          <el-button size="medium" type="primary" @click="logining" style="width: 100%;margin-top: 10px;">登录</el-button>
          <el-checkbox v-model="isMemory" style="float: left;margin-top: 10px;color: white">记住密码</el-checkbox>
          <el-link href="https://element.eleme.io" target="_blank" style="float: right;margin-top: 10px;color: white">忘记密码?</el-link>
          <div style="margin-top: 50px;width: 100%;">
              <div style="display: inline-block;float: left;color:white;">—————</div>
              <div style="color: white;font-size: 13px;width: 150px;display: inline-block">
                <div style="margin:0 auto;text-align: center;">使用第三方账号登录</div></div>
              <div style="display: inline-block;float: right;color:white;">—————</div>
          </div>
          <a  target="_blank"><el-image style="width: 40px;height: 40px;" src="../../../static/phone/wechat.png"></el-image></a>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-input v-model="model.email" placeholder="填写邮箱"  @blur="checkEmail" prefix-icon="el-icon-user"  style="margin-top: 10px;"></el-input>
          <el-input v-model="model.name" placeholder="昵称" prefix-icon="el-icon-user"  style="margin-top: 10px;"></el-input>
          <el-input v-model="model.userName" @blur="checkUserName" placeholder="账号" prefix-icon="el-icon-user"  style="margin-top: 10px;"></el-input>
          <el-input v-model="model.passWord" placeholder="填写密码" prefix-icon="el-icon-user"  style="margin-top: 10px;"></el-input>
          <el-input v-model="model.eqPassWord" placeholder="确认密码" prefix-icon="el-icon-user"  style="margin-top: 10px;"></el-input>
          <el-button size="medium" type="primary" @click="register" style="width: 100%;margin-top: 10px;">注册</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      activeName:'login',
      model:{
        name:'',
        userName:'',
        passWord:'',
        userId:'',
        eqPassWord:'',
      },
      isMemory:'',
    }
  },
  methods : {
    handleClick(e){
      console.log(e,"e");
      console.log(this.activeName,'activeName');
    },
    logining(){
      if(this.activeName != 'login'){
          return;
      }
      let flag=true;
      if(this.model.userName == ''){
          this.$message.error("账号必填");
          flag=false;
      }
      if(this.model.passWord == ''){
        this.$message.error("密码必填");
          flag=false;
      }
      if(flag){
        this.$ajax.get("/bkwsp/base/tm-employee/login/"+this.model.userName+"/"+this.model.passWord).then(response=>{
          let employee =  response.data;
          if(employee != null){
            this.$message({
              message:response.message,
              type:'success'
            });
            this.$store.commit("USER_SIGN_IN",response.data);
            // this.$store.state.name = response.name;
            // this.$store.state.userId = response.userId;
            this.$router.push("/overview");
          }else{
            this.$message({
              message:response.message,
              type:'warning'
            });
          }
         //
        },error => {
          console.log("111111");
          this.$message.error("账号或者密码错误！")
        })
      }
    },
    checkUserName(){
      if(this.model.userName != ''){
        this.$ajax.get("/bkwsp/base/tm-employee/checkUserName/"+this.model.userName).then(response=>{
          if(response.data){
            this.$message.error("该账号已存在！");
            this.model.userName = "";
          }
        }).then(response=>{

        })
      }

    },
    checkEmail(){
      if(this.model.email != ''){
        this.$ajax.get("/bkwsp/base/tm-employee/checkEmail/"+this.model.email).then(response=>{
          console.log(response.data,'response');
          if(response.data){
            this.$message.error("该邮箱以注册！");
            this.model.email = "";
          }
        }).then(response=>{

        })
      }
    },
    register(){
      if(this.activeName != 'register'){
          return;
      }
      let flag=true;
      if(this.model.email == ''){
        this.$message.error("邮箱必填");
        flag=false;
      }
      if(this.model.name == ''){
        this.$message.error("昵称必填");
        flag=false;
      }
      if(this.model.passWord == ''){
        this.$message.error("密码必填");
        flag=false;
      }
      if(this.model.eqPassWord != this.model.passWord){
        this.$message.error("密码要一致");
        flag=false;
      }
      if(flag){
        this.$ajax.post("/bkwsp/base/tm-employee/register",this.model).then(response=>{
            console.log(response,"response");
            if(response.userId != null && response.userId != ''){
              this.$message({
                message:"注册成功，请激活后登陆！！",
                type:'success'
              });
              this.activeName = 'login';
              this.model.email = '';
              this.model.name = '';
              this.model.userName='';
              this.model.passWord = "";
              alert("请在邮箱激活账号后重新登陆，谢谢！")
            }

        }).then(response=>{

        })
      }
    }
  }
}
</script>
<style>
  .login{
    width: 20%;
    height: 300px;
    position: absolute;
    top: 250px;
    left: 800px;
  }
  .el-divider--horizontal{
    margin-top: 50px;
  }
  .el-divider__text.is-center{
    font-size: 12px;
  }
  .beijing{
    background-image: url("../../../static/phone/index_bg.jpg");
    width:100% ;
    height:100vh;
    z-index: -1;
    background-repeat: no-repeat;
    background-size:100% 100%;
    background-attachment:fixed;
  }
  .nianfen{
    background-image: url("../../../static/phone/banner.png");
    width: 400px;
    height: 350px;
    background-repeat: no-repeat;
    background-size:100% 100%;
    position: absolute;
    top: 200px;
    left:300px;
  }
  .login .el-tabs__item.is-active{
    color:white;                                                                                                 `
    font-size: 20px;
  }
  .login .el-tabs__item{
    font-size: 20px;
    color: #30313378;
  }
</style>
