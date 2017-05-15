<template>

  <section>
    <el-alert
      v-if="propositions.length === 0"
      title="No propositions made yet"
      :closable="false"
      type="info"
      show-icon>
    </el-alert>
    <section id="propositions" v-else>
      <el-button type="text" icon="arrow-left" @click="prev" :disabled="currentProposition === 0"></el-button>
      <section id="proposition">
        <el-alert v-if="propositions[currentProposition].isOwnersProposition" title="This is owners reply" type="info" :closable="false" id="your-reply"></el-alert>
        <i class="el-icon-edit"></i> <b>Title</b>
        <p>{{propositions[currentProposition].title | emptyPlaceholder}}</p>
        <i class="el-icon-more"></i> <b>URL</b>
        <p>{{propositions[currentProposition].url | emptyPlaceholder}}</p>
        <i class="el-icon-warning"></i> <b>Comment</b>
        <p>{{propositions[currentProposition].comment | emptyPlaceholder}}</p>
      </section>
      <el-button type="text" icon="arrow-right" @click="next" :disabled="currentProposition >= propositions.length - 1"></el-button>
    </section>
    <hr />
    <section id="status">
      <el-alert
        v-if="propositions[currentProposition].status === 'accepted'"
        title="This opportunity was accepted"
        :closable="false"
        type="success"
        show-icon>
      </el-alert>
      <el-alert
        v-if="propositions[currentProposition].status === 'rejected'"
        title="This opportunity was rejected"
        :closable="false"
        type="error"
        show-icon>
      </el-alert>
    </section>
    <section id="actions" v-if="showActions && propositions.length > 0">
      <el-button-group v-if="currentProposition === propositions.length - 1">
        <el-tooltip effect="dark" content="Consider replying to this proposition before rejecting" placement="top">
          <el-button @click="reject">Reject</el-button>
        </el-tooltip>
        <el-button type="primary" @click="accept">Accept</el-button>
      </el-button-group>
      <el-alert
        v-else
        title="Navigate to the latest proposition to accept it"
        :closable="false"
        type="info"
        show-icon>
      </el-alert>
    </section>
  </section>

</template>

<script>
  export default {
    name: 'publication-proposition',
    props: ['item', 'propositions', 'showActions'],
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
      reject() {
        const payload = {
          type: 'publications',
          userId: this.propositions[this.currentProposition].userId,
          itemId: this.item._id,
          status: 'rejected',
        };
        this.$store.dispatch('updatePropositionStatus', payload);
        this.$emit('close');
      },
      accept() {
        const payload = {
          type: 'publications',
          userId: this.propositions[this.currentProposition].userId,
          itemId: this.item._id,
          status: 'accepted',
        };
        this.$store.dispatch('updatePropositionStatus', payload);
        this.$emit('close');
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
    padding-top: 15px;
    display: flex;
    justify-content: center;
  }
  #your-reply {
    margin-bottom: 20px;
  }
  hr {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #d6cbe2, #8857bc, #d6cbe2);
  }
</style>
