<template>
  <el-card class="box-card">
    <div slot="header">
      <span style="line-height: 36px;">Settings</span>
    </div>
    <el-alert title="Unauthorized" type="warning" :closable="false" show-icon></el-alert>
  </el-card>
</template>

<script>
export default {
  name: 'settings',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
