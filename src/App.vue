<template>
  <div id="app">
    <main-menu></main-menu>
    <el-row>
      <el-col :span="6" v-if="layoutSettings.sidebarVisible">
        <sidebar></sidebar>
      </el-col>
      <el-col :span="layoutSettings.mainSectionWidth" id="main-content">
        <router-view v-on:toggleView="toggleView"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu';
import Sidebar from './components/Sidebar';

export default {
  name: 'app',
  components: {
    MainMenu,
    Sidebar,
  },
  data() {
    return {
      layoutSettings: {
        sidebarVisible: true,
        mainSectionWidth: 18,
      },
    };
  },
  methods: {
    toggleView(layoutType) {
      if (layoutType === 'wide') {
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
#main-content {
  padding: 30px;
}
</style>
