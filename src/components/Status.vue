<template>

  <section class="screen-content">
    <el-table :data="items" border style="width: 100%">
      <el-table-column label="Type">
        <template scope="scope">
          <el-tag type="primary">{{scope.row.type | capitalize}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Title" :formatter="titleColumn"></el-table-column>
      <el-table-column label="Publication" prop="publication"></el-table-column>
      <el-table-column label="Status">
        <template scope="scope">
          <el-tag :type="itemStatus(scope.row).label">{{itemStatus(scope.row).text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope" class="center">
          <el-button type="text" @click="showDialog(scope.row)">Show Proposition</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog -->
    <el-dialog title="Article Propositions" v-model="dialogVisible">
      <article-propositions-slim
        v-if="currentItemType === 'mention'"
        :item="currentItem"
        :visible="dialogVisible"
        @close="closeDialog">
      </article-propositions-slim>
      <publication-propositions-slim
        v-else
        :item="currentItem"
        :visible="dialogVisible"
        @close="closeDialog">
      </publication-propositions-slim>
    </el-dialog>

  </section>

</template>

<script>
import ArticlePropositionsSlim from './Articles/ArticlePropositionsSlim';
import PublicationPropositionsSlim from './Publications/PublicationPropositionsSlim';

export default {
  name: 'status',
  components: {
    ArticlePropositionsSlim,
    PublicationPropositionsSlim,
  },
  data() {
    return {
      dialogVisible: false,
      isItemOwner: false,
      currentItem: {},
      currentItemType: '',
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
                .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
                .find(proposition => proposition.userId === this.$store.getters.user.email);
      return lastProposition ? lastProposition.title : '-';
    },
    itemStatus(row) {
      const statusMap = {
        pending: {
          text: 'Pending',
          label: 'warning',
        },
        ready: {
          text: 'Ready',
          label: 'primary',
        },
        accepted: {
          text: 'Accepted',
          label: 'Success',
        },
        rejected: {
          text: 'Rejected',
          label: 'danger',
        },
      };
      const lastProposition = Array.from(row.propositions)
        .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        .find(proposition => proposition.userId === this.$store.getters.user.email);
      if (lastProposition) {
        if (lastProposition.status === 'pending' && lastProposition.isOwnersProposition) {
          return statusMap.ready;
        } else {
          return statusMap[lastProposition.status];
        }
      } else {
        return statusMap.pending;
      }
    },
    showDialog(item) {
      this.dialogVisible = true;
      this.currentItem = item;
      this.currentItemType = item.type;
    },
    closeDialog() {
      this.dialogVisible = false;
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
