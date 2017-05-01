<template>

  <div id="opportunities">
    <el-table :data="opportunities" border style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        {{props.row.status !== 'Ready' ? 'A notification will be sent once complete':'Notification sent, please check email'}}
      </template>
    </el-table-column>
    <el-table-column prop="title" label="Article"></el-table-column>
    <el-table-column prop="publications" label="Publication"></el-table-column>
    <el-table-column prop="status" label="Status" width="100"
                     :filters="filters"
                     :filter-method="filterStatus">
      <template scope="scope">
        <el-tag
          :type="statusType(scope.row.status)"
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
 <!-- <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">My Articles</span>
      <el-button style="float: right;" type="primary" @click="goTo('/opportunity-form')"><i class="el-icon-plus"></i> Add</el-button>
    </div>

  </el-card>-->

</template>

<script>
import axios from 'axios';

export default {
  name: 'opportunities',
  data() {
    return {
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'In progress', value: 'In progress' },
        { text: 'Ready', value: 'Ready' },
      ],
    };
  },
  computed: {
    opportunities() {
      return this.$store.getters.personalOpportunities;
    },
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    filterStatus(value, row) {
      return row.tag === value;
    },
    statusType(status) {
      const types = {
        Pending: 'gray',
        'In progress': 'warning',
        Ready: 'success',
      };
      return types[status];
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
};
</script>

<style>
  #opportunities {
    margin: 20px 0 0 20px;
  }
</style>
