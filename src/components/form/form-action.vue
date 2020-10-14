<template>
  <!-- 按钮菜单 start -->
  <div class="form-action">
    <ul class="action-list">
      <li>
        <el-tooltip class="item" effect="blue" content="提交" placement="left">
          <a href="javascript:;" onclick="submit">
            <i class="el-icon-check"></i>
          </a>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="blue" content="关闭" placement="left">
          <a href="#">
            <i class="el-icon-close"></i>
          </a>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="blue" content="删除" placement="left">
          <a href="#" class="delete">
            <i class="el-icon-delete2"></i>
          </a>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="blue" content="保存" placement="left">
          <a href="#">
            <i class="fa fa-save"></i>
          </a>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="blue" content="打印" placement="left">
          <a href="javascript:;" @click="print">
            <i class="fa fa-print"></i>
          </a>
        </el-tooltip>
      </li>
      <li class="title">
        Lessons Learned
      </li>
      <li>
        <el-tooltip class="item" effect="blue" content="Top" placement="left">
          <a @click="goTop" class="top">
            <Icon type="arrow-up-a"></Icon>
          </a>
        </el-tooltip>
      </li>
    </ul>
  </div>
  <!-- 按钮菜单 end -->
</template>

<script>
export default {
  name: 'header',
  methods:{
    //go top
    goTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
      submit(){
          alert(1);
          this.$confirm('确认提交').then(_ => {
              this.$ajax.post(this.$store.state.wspServer + "/rest/lessons-learned/saveModel", this.model).then(response => {
                  this.$message.success(response.message)
              }, response => {
                  this.$message.error("error")
              });
              this.close();
          }).catch(_ => {
          });

      },
      print(){
        window.print();
      }
  }
}
</script>

<style scoped src="../../../static/css/request-form.css">
</style>
