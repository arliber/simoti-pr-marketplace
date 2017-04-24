<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">Opportunities</span>
      <el-button style="float: right;" type="primary" @click="goTo('/opportunity-form')"><i class="el-icon-plus"></i> Add</el-button>
    </div>

    <el-table :data="opportunities" border style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          {{props.row.status !== 'Ready' ? 'A notification will be sent once complete':'Notification sent, please check email'}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Article"></el-table-column>
      <el-table-column prop="publications" label="Publication"></el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope" class="center">
          <el-button type="primary" icon="plus" size="mini" @click="addProposal(scope.row)">Apply</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog -->
    <el-dialog title="Add proposal" v-model="proposalDialogVisible">
      <el-alert title="What is that?" type="info" description="Tell us a bit about the client and how he fits into the article. Provide the links to link to and the preferred placement in the article" :closeable="false" show-icon></el-alert>
      <el-form>
        <el-form-item label="Info">
          <el-input type="textarea" v-model="currentProposalInfo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="proposalDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitProposal">Apply</el-button>
      </span>
    </el-dialog>
    <!-- /Dialog -->

  </el-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'marketOpportunities',
  data() {
    return {
      proposalDialogVisible: false,
      currentProposition: {},
      currentProposalInfo: '',
    };
  },
  computed: {
    opportunities() {
      return this.$store.getters.marketOpportunities;
    },
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    addProposal(proposition) {
      this.proposalDialogVisible = true;
      this.currentProposition = proposition;
    },
    submitProposal() {
      this.proposalDialogVisible = false;
      this.$store.dispatch('addPropositionProposal', {
        proposalInfo: this.currentProposalInfo,
        opportunityId: this.currentProposition._id,
      });
    },
  },
  mounted() {
    axios.get('/api/opportunities', {
      headers: {
        Authorization: `Bearer ${this.$store.getters.user.token}`,
      },
    }).then((opportunities) => {
      this.$store.dispatch('setOpportunities', opportunities.data);
    });
  },
  created() {
    this.$emit('toggleView', 'withSidebar');
  },
};
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .center {
    text-align: center;
  }
</style>
