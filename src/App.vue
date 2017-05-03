<template>
  <div id="app">
    <main-menu></main-menu>
    <div id="bg-container">
      <section id="content-section">
        <notifications id="notifications"></notifications>
        <router-view id="content"></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu';
import Notifications from './components/Notifications';

export default {
  name: 'app',
  components: {
    MainMenu,
    Notifications,
  },
  data() {
    return {
      layoutSettings: {
        sidebarVisible: true,
        mainSectionWidth: 18,
      },
    };
  },
  watch: {
    $route: function (newRoute) { //eslint-disable-line
      this.toggleView(newRoute.name);
    },
  },
  created() {
    this.toggleView(this.$route.name);
  },
  methods: {
    toggleView(routeName) {
      if (routeName === 'login' || routeName === 'signup') {
        this.layoutSettings.sidebarVisible = false;
        this.layoutSettings.mainSectionWidth = 24;
      } else {
        this.layoutSettings.sidebarVisible = true;
        this.layoutSettings.mainSectionWidth = 18;
      }
    },
  },
};
</script>

<style>
body {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#bg-container {
  border-top: 1px solid #DBC9EA;
  background: url(assets/bg.jpg) center center repeat-y;
}

#content-section {
  width: 960px;
  margin: 0 auto;
  display: flex;
  flex: 1;
  min-height: 100vh;
}
#notifications {
  flex: 0 0 18em;
}
#content {
  flex: 1;
  background: #fff;
}
</style>
