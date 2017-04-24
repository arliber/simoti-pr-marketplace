<template>
  <el-card class="box-card">
    <div slot="header">
      <span style="line-height: 36px;">My Columns</span>
    </div>
    <el-alert title="Unauthorized" type="warning" :closable="false" show-icon></el-alert>
  </el-card>
</template>

<script>
export default {
  name: 'myColumns',
  created() {
    this.$emit('toggleView', 'withSidebar');
  },
};
</script>

<style scoped>

</style>
