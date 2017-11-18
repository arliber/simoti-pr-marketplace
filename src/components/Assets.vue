<template>

  <el-tabs type="card">
    <el-tab-pane label="ARTICLES">
      <section class="screen-content">
        <el-button icon="plus" type="primary" class="add-button" @click="goTo('article')">
          Add an Article
        </el-button>
        <articles class="full-width-fix" type="ownArticles"></articles>
      </section>
    </el-tab-pane>
    <el-tab-pane label="COLUMNS">
      <section class="screen-content">
        <el-button icon="plus" type="primary" class="add-button" @click="goTo('publication')">
          Add a Column
        </el-button>
        <publications class="full-width-fix" type="ownPublications"></publications>
      </section>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import articles from './Articles/Articles';
  import publications from './Publications/Publications';

  export default {
    name: 'assets',
    components: {
      articles,
      publications,
    },
    methods: {
      goTo(path) {
        this.$router.push(path);
      },
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
