<template>
  <div id="app">
    <main-menu></main-menu>
    <div class="bg-container">
      <el-row id="content-section">
        <el-col :span="6" v-if="layoutSettings.sidebarVisible">
          <notifications></notifications>
        </el-col>
        <el-col :span="layoutSettings.mainSectionWidth" id="main-content">
          <router-view></router-view>
        </el-col>
      </el-row>
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
.bg-container {
  border-top: 1px solid #DBC9EA;
  background: url(assets/bg.png) center center repeat-y;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
}
#content-section {
  width: 960px;
  margin: 0 auto;
}
#main-content {
  /*padding: 30px;*/
}
</style>
