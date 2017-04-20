<template>
  <div id="app">
    <main-menu></main-menu>
    <el-row>
      <el-col :span="4">
        <sidebar></sidebar>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'app',
  components: {
    MainMenu,
    Sidebar,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
