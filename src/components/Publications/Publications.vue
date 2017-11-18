<template>

  <section>

    <el-table :data="publications" border style="width: 100%">
      <el-table-column type="expand">
        <template scope="scope">
          {{scope.row.comment}}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope" class="center">
          <el-button type="text" @click="showDialog(scope.row)">
            {{actionButtonText}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog -->
    <el-dialog title="Add proposition" v-model="dialogVisible" size="large">
      <publication-propositions
        v-if="isItemOwner"
        :item="currentItem"
        :visible="dialogVisible"
        @close="closeDialog">
      </publication-propositions>
      <publication-propositions-slim
        v-else
        :item="currentItem"
        :visible="dialogVisible"
        @close="closeDialog">
      </publication-propositions-slim>
    </el-dialog>
    <!-- /Dialog -->

  </section>

</template>

<script>
import PublicationPropositions from './PublicationPropositions';
import PublicationPropositionsSlim from './PublicationPropositionsSlim';

export default {
  name: 'publications',
  props: ['type'],
  components: {
    PublicationPropositions,
    PublicationPropositionsSlim,
  },
  data() {
    return {
      dialogVisible: false,
      isItemOwner: false,
      currentItem: {},
    };
  },
  computed: {
    publications() {
      if (this.type === 'ownPublications') {
        return this.$store.getters.userPublications;
      } else {
        return this.$store.getters.publications;
      }
    },
    actionButtonText() {
      return this.type === 'ownPublications' ? 'Show Propositions' : 'Add Proposition';
    },
  },
  methods: {
    showDialog(item) {
      this.dialogVisible = true;
      this.currentItem = item;
      this.isItemOwner = this.currentItem.userId === this.$store.getters.user.email;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    assetsAvaialble(row) {
      return (row.url === '' && row.files.length === 0);
    },
  },
  mounted() {
    if (this.type === 'ownPublications') {
      this.$store.dispatch('getUserPublications');
    } else {
      this.$store.dispatch('getPublications');
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
