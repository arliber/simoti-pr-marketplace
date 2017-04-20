<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">Opportunities</span>
      <el-button style="float: right;" type="primary" @click="goTo('/opportunity-form')"><i class="el-icon-plus"></i> Add</el-button>
    </div>
    <div class="text item">
      test
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'opportunities',
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
