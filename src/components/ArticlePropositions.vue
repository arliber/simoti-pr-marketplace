<template>

  <el-row v-if="item.propositions.length > 0">
    <el-col :span="8">
      <el-menu id="propositions-groups">
        <el-menu-item :index="index.toString()"
                      v-for="(propositionGroup, index) in propositionGroups"
                      @click="propositionsSelected"
                      :key="propositionGroup.title"
                      class="proposition-group">
          {{propositionGroup.body}}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="16">
      <el-tabs v-if="currentPropositionUser !== -1" v-model="activeTab">
        <el-tab-pane label="Proposition" name="proposition">
          <article-proposition :propositions="selectedPropositions" class="small-screen-content"></article-proposition>
        </el-tab-pane>
        <el-tab-pane label="Reply to proposition" name="form">
          <article-proposition-form :item="item" @cancel="closeDialog" class="small-screen-content"></article-proposition-form>
        </el-tab-pane>
      </el-tabs>
      <el-alert v-else id="select-proposition" :closable="false"  type="info" show-icon
                title="Please select one of the propositions on the left">
      </el-alert>
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <el-alert title="No propositions yet" :closable="false" type="info" show-icon></el-alert>
    </el-col>
  </el-row>

</template>

<script>
  import ArticlePropositionForm from './forms/ArticlePropositionForm';
  import ArticleProposition from './ArticleProposition';

  export default {
    name: 'article-propositions',
    props: ['item', 'visible'],
    data() {
      return {
        activeTab: 'proposition',
        currentPropositionUser: -1,
      };
    },
    watch: {
      visible() {
        this.currentPropositionUser = -1;
      },
    },
    components: {
      ArticleProposition,
      ArticlePropositionForm,
    },
    computed: {
      propositionGroups() {
        return Array.from(this.item.propositions)
          .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
          .reduce((groups, proposition) => {
            if (!groups.find(item => item.userId === proposition.userId)) {
              groups.push({
                userId: proposition.userId,
                body: proposition.body.slice(0, 20),
              });
            }
            return groups;
          }, []);
      },
      selectedPropositions() {
        if (this.currentPropositionUser === -1) {
          return [];
        } else {
          return this.item.propositions
            .filter(item => item.userId === this.currentPropositionUser);
        }
      },
    },
    methods: {
      propositionsSelected(el) {
        this.currentPropositionUser = this.propositionGroups[Number(el.index)].userId;
      },
      closeDialog() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  #propositions-groups {
    min-height: 500px;
    border-top: 1px solid rgb(221, 209, 229);
    margin-top: 41px;
  }
  .el-dialog .el-tabs__header {
    background: none !important;
  }
  .proposition-group {
    border-bottom: 1px solid rgb(221, 209, 229)
  }
  #select-proposition {
    margin: 40px 10px;
  }
</style>
