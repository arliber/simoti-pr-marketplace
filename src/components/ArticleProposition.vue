<template>

  <section>
    <section id="propositions">
      <el-button type="text" icon="arrow-left" @click="prev" :disabled="currentProposition === 0"></el-button>
      <section id="proposition">
        <el-alert v-if="propositions[currentProposition].isOwnersProposition" title="This is your reply" type="info" :closable="false" id="your-reply"></el-alert>
        <i class="el-icon-edit"></i> <b>Body</b>
        <p>{{propositions[currentProposition].body | emptyPlaceholder}}</p>
        <i class="el-icon-more"></i> <b>Placement</b>
        <p>{{propositions[currentProposition].placement | emptyPlaceholder}}</p>
        <i class="el-icon-warning"></i> <b>Comment</b>
        <p>{{propositions[currentProposition].comment | emptyPlaceholder}}</p>
      </section>
      <el-button type="text" icon="arrow-right" @click="next" :disabled="currentProposition >= propositions.length - 1"></el-button>
    </section>
    <section id="actions" v-if="showActions">
      <el-button-group v-if="currentProposition === propositions.length - 1">
        <el-tooltip effect="dark" content="Consider replying to this proposition before rejecting" placement="top">
          <el-button>Reject</el-button>
        </el-tooltip>
        <el-button type="primary">Accept</el-button>
      </el-button-group>
      <el-alert
        v-else
        title="Navigate to latest propositions from that user to accept it"
        :closable="false"
        type="info"
        show-icon>
      </el-alert>
    </section>
  </section>

</template>

<script>
  export default {
    name: 'article-proposition',
    props: ['propositions', 'showActions'],
    data() {
      return {
        currentProposition: 0,
      };
    },
    watch: {
      propositions() {
        this.currentProposition = this.propositions.length - 1;
      },
    },
    mounted() {
      // First run does not trigger the watcher
      this.currentProposition = this.propositions.length - 1 || 0;
    },
    computed: {
      propositionsLength() {
        return this.propositions.length || 0;
      },
      currentProposition() {
        if (this.currentSelectedProposition === -1) {
          return this.propositions.length - 1;
        } else {
          return this.currentSelectedProposition;
        }
      },
    },
    filters: {
      emptyPlaceholder(value) {
        return value === '' ? 'No data' : value;
      },
    },
    methods: {
      next() {
        this.currentProposition = this.currentProposition + 1;
      },
      prev() {
        this.currentProposition = this.currentProposition - 1;
      },
    },
  };
</script>

<style scoped>
  #propositions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #proposition {
    flex-basis: 100%;
    margin: 0 15px;
  }
  #proposition p {
    margin-left: 20px;
  }
  #actions {
    border-top: 1px solid rgb(221, 209, 229);
    padding-top: 15px;
    display: flex;
    justify-content: center;
  }
  #your-reply {
    margin-bottom: 20px;
  }
</style>
