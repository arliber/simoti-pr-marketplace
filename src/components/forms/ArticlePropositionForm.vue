<template>

  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Content">
      <el-input type="textarea" v-model="form.body" :rows="6"></el-input>
    </el-form-item>

    <el-form-item label="Assets">

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
      <input type="file" name="file" multiple="multiple">

    </el-form-item>

    <el-form-item label="Placement">
      <el-input v-model="form.placement"></el-input>
    </el-form-item>

    <el-form-item label="Comments">
      <el-input type="textarea" v-model="form.comment"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
      <el-button @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import store from '../../store';

  export default {
    name: 'article-proposition-form',
    props: ['item', 'visible', 'inReplyToUser'],
    data() {
      return {
        form: {
          body: '',
          placement: '',
          comment: '',
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
        this.cancel();
        return Promise.resolve();
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
      },
      cancel() {
        this.clearForm();
        this.$emit('cancel');
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
          data.append('files', files[i]);
        }
        // Add current userId to distinguish between user and owner comment
        if (this.inReplyToUser && this.inReplyToUser) {
          data.append('inReplyToUser', this.inReplyToUser);
        }

        // Action
        const payload = {
          data,
          articleId: this.item._id,
        };
        store.dispatch('addArticleProposition', payload)
             .then(this.notifyOnSuccess)
             .then(() => {
               return store.dispatch('getUserArticles');
             })
             .then(() => {
               return store.dispatch('getArticles');
             })
             .catch(this.notifyOnError);
      },
    },
  };
</script>
