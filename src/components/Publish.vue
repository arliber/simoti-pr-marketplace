<template>
  <el-tabs type="card">
    <el-tab-pane label="FIND OPPORTUNITIES">
      <opportunities></opportunities>
    </el-tab-pane>
    <el-tab-pane label="STATUS">
      <status></status>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Opportunities from './Opportunities';
import Status from './Status';

export default {
  name: 'publish',
  components: {
    Opportunities,
    Status,
  },
};
</script>

<style>

</style>
