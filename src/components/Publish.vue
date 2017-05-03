<template>
  <el-tabs type="card">
    <el-tab-pane label="FIND OPPORTUNITIES">
      <opportunities></opportunities>
    </el-tab-pane>
    <el-tab-pane label="STATUS">Status</el-tab-pane>
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

</style>
