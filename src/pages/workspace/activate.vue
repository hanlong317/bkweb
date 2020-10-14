<template>
  <div>
    激活成功，点击<a :href=$store.state.webServer > 请登录</a>
  </div>

</template>

<script>
export default {
  data(){
    return {
      activeName:'activate',
      message:''
    }
  },
  mounted() {
    this.search();
  },
  methods : {
    search(){
      let userId=this.$route.query.userId;
      console.log(userId,"userId");
      this.$ajax.get("/bkwsp/base/tm-employee/activate/"+userId).then(response=>{
        this.message=response;
        if(this.message == '激活成功'){

        }
      }).then(response=>{

      })
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
    color:white;
    font-size: 20px;
  }
  .login .el-tabs__item{
    font-size: 20px;
    color: #30313378;
  }
</style>
