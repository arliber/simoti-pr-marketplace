<template>

  <section id="dashboard">
    <article class="screen-content">
      <h1>Welcome to Simoti Agency Platform</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu quam sed libero condimentum venenatis in nec diam. Fusce auctor quis urna ultrices pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin auctor sagittis mi. Integer varius felis et justo iaculis consequat. Ut dignissim finibus lectus. Etiam sit amet placerat magna. Pellentesque ornare vitae purus quis ultrices. Morbi posuere velit sed mi vulputate scelerisque.</p>
    </article>

    <section id="tiles">
      <section>
        <h2>Publications</h2>
        <h3>41</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu quam sed libero!
          </p>
        </section>
      </section>
      <section>
        <h2>Publications</h2>
        <h3>41</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu quam sed libero!
          </p>
        </section>
      </section>
      <section>
        <h2>Publications</h2>
        <h3>41</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu quam sed libero!
          </p>
        </section>
      </section>
      <section>
        <h2>Publications</h2>
        <h3>41</h3>
        <section class="info">
          <h4>What's that?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu quam sed libero!
          </p>
        </section>
      </section>
    </section>

    <section class="screen-content" id="help">
      <el-button type="primary" @click="contactForm">Need help? Contact us!</el-button>
    </section>

    <section class="screen-content">
      <i class="el-icon-star-off"></i> What's new?
      <p>
        We now allow full control over what is getting airied via our propositions disucssion system!
        <br />
        You can easily Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <br />
      </p>
    </section>

  </section>

</template>

<script>
export default {
  name: 'dashboard',
  methods: {
    contactForm() {
      window.open('http://simoti.co/pages/contact/', '_blank');
    },
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
