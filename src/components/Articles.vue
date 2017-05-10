<template>

  <section>

    <el-table :data="articles" border style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <h2>Article Assets</h2>
          <div v-if="assetsAvaialble(props.row)">No assets</div>
          <ul class="files-list">
            <li v-if="props.row.url !== ''">
              <a :href="props.row.url" target="_blank"><i class="el-icon-share"></i> Article URL</a>
            </li>
            <li v-for="(file, index) in props.row.files">
              <a :href="file" target="_blank"><i class="el-icon-document"></i>File #{{index+1}}</a>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Article"></el-table-column>
      <el-table-column prop="publications" label="Publication"></el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope" class="center">
          <el-button type="primary" icon="plus" size="mini" @click="addProposition(scope.row)">Apply</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog -->
    <el-dialog title="Add proposition" v-model="propositionDialogVisible">
      <article-proposition-form :article="currentArticle" :visible="propositionDialogVisible" @close="closePropositionDialog"></article-proposition-form>
    </el-dialog>
    <!-- /Dialog -->

  </section>

</template>

<script>
import ArticlePropositionForm from './forms/ArticlePropositionForm';

export default {
  name: 'articles',
  props: ['type'],
  components: {
    ArticlePropositionForm,
  },
  data() {
    return {
      propositionDialogVisible: false,
      currentArticle: {},
    };
  },
  computed: {
    articles() {
      if (this.type === 'ownArticles') {
        return this.$store.getters.userArticles;
      } else {
        return this.$store.getters.articles;
      }
    },
  },
  methods: {
    addProposition(article) {
      this.propositionDialogVisible = true;
      this.currentArticle = article;
    },
    closePropositionDialog() {
      this.propositionDialogVisible = false;
    },
    assetsAvaialble(row) {
      return (row.url === '' && row.files.length === 0);
    },
  },
  mounted() {
    if (this.type === 'ownArticles') {
      this.$store.dispatch('getUserArticles');
    } else {
      this.$store.dispatch('getArticles');
    }
  },
};
</script>

<style scoped>
  .center {
    text-align: center;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .files-list {
    list-style: none;
  }
  .files-list li {
    margin: 5px;
    font-size: 16px;
    color: #48576a;
    line-height: 1.8;
    border-radius: 6px;
    transition: color .3s;
  }
  .files-list li:hover {
    background-color: #eef1f6;
    color: #20a0ff;
    cursor: pointer;
  }
  .files-list li a {
    display: block;
    padding: 5px;
  }
  .files-list li i {
    margin-right: 8px;
  }
</style>
