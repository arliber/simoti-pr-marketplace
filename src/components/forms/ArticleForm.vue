<template>

  <section class="screen-content">
    <H2>New Article</H2>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Article title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="Article">

        <el-card>
          <el-input placeholder="URL" v-model="form.url">
            <template slot="prepend">http://</template>
          </el-input>
          OR
          <!--<el-upload
            drag
            ref="uploader"
            :auto-upload="false"
            :multiple="true"
            action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">pdf/doc/docx files with a size less than 500kb</div>
          </el-upload>-->
          <br /><input type="file" name="file" multiple="multiple">
        </el-card>
      </el-form-item>


      <el-form-item label="Publication name">
        <el-input v-model="form.publication"></el-input>
      </el-form-item>

      <el-form-item label="Submission date">
          <el-date-picker type="date" placeholder="Pick a date" v-model="form.submissionDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="Approx. air date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="form.airDate"></el-date-picker>
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
        title: '',
        url: '',
        publication: '',
        submissionDate: '',
        airDate: '',
        comment: '',
      },
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    /* clearFileList(file, Filelist) { // Use on-change ?
      console.log('Clearing list..');
      // this.$refs.uploader.uploadFiles = [];
    },*/
    onSubmit() {
      const data = new FormData();
      // Static data
      Object.keys(this.form).forEach((key) => {
        data.append(key, this.form[key]);
      });
      // Files
      const files = document.querySelector('input[name=file]').files;
      for (let i = 0; i < files.length; i += 1) {
        data.append('files', files[i]);
      }

      axios.put('/api/articles', data, {
        headers: {
          Authorization: `Bearer ${store.getters.user.token}`,
        },
      }).then(() => {
        this.$message({
          showClose: true,
          message: 'The article was added successfully',
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
