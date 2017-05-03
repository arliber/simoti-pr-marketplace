<template>
  <div class="screen-content">
    <ul id="options">
      <li v-bind:class="{'active-option': contentType === 'mention'}" @click="selectOption('mention')">
        <img src="../assets/mention.png"/>
        <p>Publish a Mention</p>
      </li>
      <li v-bind:class="{'active-option': contentType === 'full-article'}" @click="selectOption('full-article')">
        <img src="../assets/article.png"/>
        <p>Publish Full Article</p>
      </li>
    </ul>

    <articles v-if="contentType === 'mention'"></articles>

  </div>
</template>

<script>
import articles from './Articles';

export default {
  name: 'opportunities',
  components: {
    articles,
  },
  data() {
    return {
      contentType: 'mention',
    };
  },
  computed: {
    opportunities() {
      return this.$store.getters.personalOpportunities;
    },
  },
  methods: {
    selectOption(type) {
      this.contentType = type;
    },
  },
};
</script>

<style scoped>
  #options {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: space-between;
    color: #8B59B7;
    margin: 0 0 20px 0;
  }
  #options li {
    border-radius: 6px;
    border: 1px solid #8B59B7;
    flex-basis: 45%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
  }
  #options li.active-option {
    border-width: 3px;
    font-weight: bold;
  }
  #options li:hover {
    background: #F2EEF5;
  }
  #options li img {
    width: 80px;
    margin-right: 20px;
  }
</style>
