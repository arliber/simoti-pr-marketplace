<template>

  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Title">
      <el-input v-model="form.placement"></el-input>
    </el-form-item>

    <el-form-item label="Article">

      <el-card>
        <el-input placeholder="URL" v-model="form.url">
          <template slot="prepend">http://</template>
        </el-input>
        OR
        <el-upload
          drag
          ref="uploader"
          :auto-upload="false"
          :multiple="true"
          :file-list="form.files"
          action="/">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">pdf/doc/docx files with a size less than 500kb</div>
        </el-upload>

      </el-card>
    </el-form-item>

    <el-form-item label="Comments">
      <el-input type="textarea" v-model="form.comment"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
      <el-button @click="close">Cancel</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import store from '../../store';

  export default {
    name: 'publication-proposition-form',
    props: ['article', 'visible'],
    data() {
      return {
        form: {
          title: '',
          url: '',
          comment: '',
          files: [],
        },
      };
    },
    watch: {
      visible() {
        this.clearForm();
      },
    },
    methods: {
      notifyOnSuccess() {
        this.$message({
          showClose: true,
          message: 'The proposition was added successfully',
          type: 'success',
        });
        this.close();
      },
      notifyOnError() {
        this.$message({
          showClose: true,
          message: 'Oops, something went wrong.. Please let us know',
          type: 'error',
        });
      },
      clearForm() {
        this.form.body = '';
        this.form.placement = '';
        this.form.comment = '';
        this.form.files = [];
      },
      close() {
        this.clearForm();
        this.$emit('close');
      },
      onSubmit() {
        const data = new FormData();
        // Static data
        Object.keys(this.form).forEach((key) => {
          data.append(key, this.form[key]);
        });
        // Files
        const files = document.querySelector('input[name=file]').files;
        for (let i = 0; i < files.length; i += 1) {
          data.append('file', files[i]);
        }
        // Action
        const payload = {
          data,
          articleId: this.article._id,
        };
        store.dispatch('addArticleProposition', payload)
             .then(this.notifyOnSuccess)
             .catch(this.notifyOnError);
      },
    },
  };
</script>

<style scoped>
</style>
