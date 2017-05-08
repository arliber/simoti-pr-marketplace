<template>

  <el-tabs type="card">
    <el-tab-pane label="ARTICLES">
      <section class="screen-content">
        <el-button icon="plus" type="primary" class="add-button">Add an Article</el-button>
        <articles class="full-width-fix"></articles>
      </section>
    </el-tab-pane>
    <el-tab-pane label="COLUMNS">
      <section class="screen-content">
        <el-button icon="plus" type="primary" class="add-button">Add an Article</el-button>
        <publications class="full-width-fix"></publications>
      </section>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import articles from './Articles';
  import publications from './Publications';

  export default {
    name: 'assets',
    components: {
      articles,
      publications,
    },
  };
</script>

<style scoped>
.screen-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
  .full-width-fix {
    width: 100%
  }
  .add-button {
    margin-bottom: 20px;
  }
</style>
