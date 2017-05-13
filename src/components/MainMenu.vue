<template>
   <el-menu default-active="0" class="main-menu" mode="horizontal" :router="true">
     <el-menu-item index="1" @click="goTo('/')" class="logo"><img src="../assets/logo-white-small.png" id="logo"/></el-menu-item>
     <el-menu-item index="/" v-if="isAuthenticated"><i class="el-icon-menu"></i> DASHBOARD</el-menu-item>
     <el-menu-item index="publish" v-if="isAuthenticated"><i class="el-icon-upload"></i>PUBLISH</el-menu-item>
     <el-menu-item index="assets" v-if="isAuthenticated"><i class="el-icon-plus"></i> OFFER</el-menu-item>
     <!-- User management section -->
     <el-menu-item v-if="!isAuthenticated" @click="goTo('login')" index="4" class="push-right">Login</el-menu-item>
     <el-menu-item v-if="!isAuthenticated" @click="goTo('signup')" index="5" class="push-right">Signup</el-menu-item>

     <el-menu-item v-if="isAuthenticated" index="4" class="push-right" id="avatar-logout" @click="logout">
       <!--<img :src="'https://api.adorable.io/avatars/50/' + user.email" :alt="user.email" class="avatar"/>-->
       <el-tooltip effect="dark" :content="user.email" placement="left">
           <div>Logout</div>
       </el-tooltip>
     </el-menu-item>

  </el-menu>
</template>

<script>
import auth from '../services/auth';

export default {
  name: 'main-menu',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedin;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    logout() {
      auth.logout('/login');
      this.$message({
        showClose: true,
        message: 'You\'ve been logged out',
        type: 'success',
      });
    },
  },
};
</script>

<style scoped>
  .main-menu {
    background: #fff;
    padding: 6px 0px;
    width: 960px;
    margin: 0 auto;
  }
  .main-menu .el-menu-item.logo:hover {
    border-color: #fff;
    background: none;
  }
  .el-menu--horizontal .el-menu-item.push-right {
    float: right;
  }
  .main-menu .el-menu-item:hover {
    /*border-bottom: 5px solid #8B59B7;*/
  }
  #avatar-logout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #avatar-logout img {
    margin-right: 12px;
    height: 65%;
    border-radius: 4px;
  }
  #logo {
    padding-top: 4px;
  }
</style>
