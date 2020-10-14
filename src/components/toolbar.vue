<template>
  <div class="toolbar">
    <el-tooltip v-for="(item,index) in toolbarList" :key="index" class="item" :content="item.tip" placement="left">
      <el-button type="primary" :icon="item.icon" @click="item.click"></el-button>
    </el-tooltip>
  </div>
</template>
<style lang="scss">
.toolbar {
  width: 40px;
  margin-left: 3px;
  background: #409eff;
  .el-button {
    margin: 2px 0px;
    /*width: 40px;*/
    padding: 11px;
    text-align: center;
    i {
      font-weight: bold;
      color: #fff !important;
    }
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
<script>
export default {
  props: ["toolbarList"]
};
</script>
