<template>

  <el-row>
    <el-col>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Add proposition" name="form">
          <article-proposition-form :item="item" :visible="visible" @cancel="closeDialog" class="small-screen-content"></article-proposition-form>
        </el-tab-pane>
        <el-tab-pane label="Propositions History" name="proposition">
          <article-proposition :propositions="selectedPropositions" :showActions="false" class="small-screen-content"></article-proposition>
        </el-tab-pane>
      </el-tabs>
      </el-alert>
    </el-col>
  </el-row>

</template>

<script>
  import ArticlePropositionForm from './forms/ArticlePropositionForm';
  import ArticleProposition from './ArticleProposition';

  export default {
    name: 'article-propositions-slim',
    props: ['item', 'visible'],
    data() {
      return {
        activeTab: 'form',
      };
    },
    components: {
      ArticleProposition,
      ArticlePropositionForm,
    },
    computed: {
      selectedPropositions() {
        return this.item.propositions
              .filter(item => item.userId === this.$store.getters.user.email);
      },
    },
    mounted() {
      this.activeTab = this.selectedPropositions.length > 0 ? 'proposition' : 'form';
    },
    methods: {
      closeDialog() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .el-dialog .el-tabs__header {
    background: none !important;
  }
  #select-proposition {
    margin: 40px 10px;
  }
</style>
