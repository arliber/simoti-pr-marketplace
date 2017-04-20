<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">Add new opportunity</span>
    </div>

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Article title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="Article">

        <el-card>
          <el-input placeholder="URL" v-model="form.title">
            <template slot="prepend">http://</template>
          </el-input>
          OR
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">pdf/doc/docx files with a size less than 500kb</div>
          </el-upload>

        </el-card>
      </el-form-item>


      <el-form-item label="Publication name">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="Submission date">
          <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1"></el-date-picker>
      </el-form-item>
      <el-form-item label="Approx. air date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1"></el-date-picker>
      </el-form-item>

      <el-form-item label="Activity form">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="goTo('/opportunities')">Cancel</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'opportunityForm',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    onSubmit() {
      console.log('submit!');
    },
  },
};
</script>

<style scoped>
</style>
