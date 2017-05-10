<template>

  <section class="screen-content">
    <H2>New Publication</H2>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="URL">
        <el-input placeholder="URL" v-model="form.url">
          <template slot="prepend">http://</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Comments">
        <el-input type="textarea" v-model="form.comment"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="goTo('assets')">Cancel</el-button>
      </el-form-item>

    </el-form>
  </section>

</template>

<script>
import axios from 'axios';
import store from '../../store';

export default {
  name: 'article-form',
  data() {
    return {
      form: {
        name: '',
        url: '',
        comment: '',
      },
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    onSubmit() {
      const data = new FormData();
      Object.keys(this.form).forEach((key) => {
        data.append(key, this.form[key]);
      });

      axios.put('/api/publications', data, {
        headers: {
          Authorization: `Bearer ${store.getters.user.token}`,
        },
      }).then(() => {
        this.$message({
          showClose: true,
          message: 'The publication was added successfully',
          type: 'success',
        });
        this.$router.push('/assets');
      }).catch(() => {
        this.$message({
          showClose: true,
          message: 'Oops, something went wrong.. Please let us know',
          type: 'error',
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
