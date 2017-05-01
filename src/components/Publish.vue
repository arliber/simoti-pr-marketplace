<template>

  <el-tabs type="card" class="options">
    <el-tab-pane label="FIND OPPORTUNITIES">
      <opportunities></opportunities>
    </el-tab-pane>
    <el-tab-pane label="STATUS">STATUS</el-tab-pane>
  </el-tabs>

</template>

<script>
import Opportunities from './Opportunities';

export default {
  name: 'publish',
  components: {
    opportunities: Opportunities,
  },
};
</script>

<style>
  .options .el-tabs__header {
    background: #F2F2F2;
    padding-left: 40px;
    border-color: #DBC9EA;
  }
  .options .el-tabs__item.is-active {
    background: #fff;
    border-radius: 0 !important;
  }
</style>
