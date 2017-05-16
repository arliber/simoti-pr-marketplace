<template>

  <section id="dashboard">
    <article class="screen-content">
      <h1>Welcome to Simoti Agency Platform <el-tag type="gray">BETA</el-tag></h1>
      <p>
        Simoti the Robot got your back & it's time to get some free mentions & quotes!
        How to get mentions?
        <ol>
          <li>Click 'Publish' on the top menu</li>
          <li>Overview the opportunities Simoti has for you, click 'Apply' on one of them</li>
          <li>Offer either a full article or a short description</li>
          <li>We will feedback you if it has been accepted & pending going live</li>
        </ol>
      </p>
    </article>

    <section id="tiles">
      <section>
        <h2>Publications</h2>
        <h3>{{this.metrics.totalPublications}}</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>Our constant growing amount of publications</p>
        </section>
      </section>
      <section>
        <h2>Articles</h2>
        <h3>{{metrics.totalArticles}}</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>
            About to air an article? upload it to Simoti <br />
            and let us offer you mentions (you get credits for that!)
          </p>
        </section>
      </section>
      <section>
        <h2>Pending Opportunities</h2>
        <h3>{{metrics.publicationsOpportunities.pending + metrics.articlesOpportunities.pending}}</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>The number of opportuntiies you applied for and waiting to go live</p>
        </section>
      </section>
      <section>
        <h2>Received propositions</h2>
        <h3>{{metrics.publicationsPropositions + metrics.articlesPropositions}}</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>Got columns? this is the number of propositions you have pending</p>
        </section>
      </section>
    </section>

    <section class="screen-content" id="help">
      <el-button type="primary" size="small" @click="contactForm">Need help? Contact us!</el-button>
    </section>

    <section class="screen-content">
      <h1><i class="el-icon-star-off"></i> What's new?</h1>
      <p>
        With Simoti the Robot our partners now can receive propositions to their columns, for each accepted & aired proposition (mention) they will be credited back with
        one free opportunity to use.
        <br />
        Simply a mention for a mention.
      </p>
    </section>

  </section>

</template>

<script>
import axios from 'axios';

export default {
  name: 'dashboard',
  data() {
    return {
      metrics: {
        totalArticles: 0,
        totalPublications: 0,
        publicationsOpportunities: {
          accepted: 0,
          rejected: 0,
          pending: 0,
        },
        articlesOpportunities: {
          accepted: 0,
          rejected: 0,
          pending: 0,
        },
        publicationsPropositions: 0,
        articlesPropositions: 0,
      },
    };
  },
  methods: {
    contactForm() {
      window.open('http://simoti.co/pages/contact/', '_blank');
    },
  },
  mounted() {
    return axios.get('/api/dashboard', {
      headers: {
        Authorization: `Bearer ${this.$store.getters.user.token}`,
      },
    }).then((res) => {
      this.metrics = res.data;
    });
  },
};
</script>

<style scoped>
#tiles {
  display: flex;
  flex-wrap: wrap;
  margin-left: -1px;
}
#tiles section {
  background: #F2EEF5;
  padding: 5px;
  text-align: center;
  flex-basis: 47%;
}
#tiles > section:nth-child(1) {
  border-top: 1px solid #DBC9EA;
  border-right: 1px solid #DBC9EA;
  border-bottom: 1px solid #DBC9EA;
}
#tiles > section:nth-child(2) {
  border-top: 1px solid #DBC9EA;
  border-bottom: 1px solid #DBC9EA;
  border-right: 1px solid #DBC9EA;
}
#tiles > section:nth-child(3) {
  border-bottom: 1px solid #DBC9EA;
  border-right: 1px solid #DBC9EA;
}
#tiles > section:nth-child(4) {
  border-bottom: 1px solid #DBC9EA;
  border-right: 1px solid #DBC9EA;
}
#tiles section h3 {
  font-size: 42px;
}
#tiles h4 {
  font-size: 13px;
  margin-bottom: 6px;
}
#tiles section p {
  margin-top: 0;
  font-size: 13px;
}
#tiles .info {
  border-top: 1px solid #DBC9EA;
  text-align: left;
  padding-left: 15px;
}
#help {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 18px;
}
</style>
