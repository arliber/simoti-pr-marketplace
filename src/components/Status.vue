<template>

  <section class="screen-content">
    <el-table :data="items" border style="width: 100%">
      <el-table-column label="Type">
        <template scope="scope">
          <el-tag type="primary">{{scope.row.type | capitalize}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Title" :formatter="titleColumn"></el-table-column>
      <el-table-column label="Publication"></el-table-column>
      <el-table-column label="Status"></el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope" class="center">
          <el-button type="primary" icon="plus" size="mini" @click="addProposition(scope.row)">Apply</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>

</template>

<script>

export default {
  name: 'status',
  data() {
    return {
      propositionDialogVisible: false,
      currentArticle: {},
    };
  },
  computed: {
    items() {
      return this.$store.getters.opportunitiesWithPropositions;
    },
  },
  methods: {
    titleColumn(row) {
      if (row.type === 'mention') {
        return row.title;
      }
      const lastProposition = Array.from(row.propositions)
                .sort((a, b) => a.createDate - b.createDate)
                .find(proposition => proposition.userId === this.$store.getters.user.email);
      return lastProposition ? lastProposition.title : '-';
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  mounted() {
    this.$store.dispatch('getArticles');
    this.$store.dispatch('getPublications');
  },
};
</script>

<style scoped>

</style>
