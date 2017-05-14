<template>

  <el-row>
    <el-col>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Add proposition" name="form">
          <publication-proposition-form :item="item" :visible="visible" @cancel="closeDialog" class="small-screen-content"></publication-proposition-form>
        </el-tab-pane>
        <el-tab-pane label="Propositions History" name="proposition">
          <publication-proposition :propositions="selectedPropositions" :showActions="false" class="small-screen-content"></publication-proposition>
        </el-tab-pane>
      </el-tabs>
      </el-alert>
    </el-col>
  </el-row>

</template>

<script>
  import PublicationProposition from './PublicationProposition';
  import PublicationPropositionForm from '../forms/PublicationPropositionForm';

  export default {
    name: 'publication-propositions-slim',
    props: ['item', 'visible'],
    data() {
      return {
        activeTab: 'form',
      };
    },
    components: {
      PublicationProposition,
      PublicationPropositionForm,
    },
    computed: {
      selectedPropositions() {
        return this.item.propositions
              .filter(item => item.userId === this.$store.getters.user.email);
      },
    },
    mounted() {
      this.activeTab = this.selectedPropositions.length > 0 ? 'proposition' : 'form';
    },
    methods: {
      closeDialog() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .el-dialog .el-tabs__header {
    background: none !important;
  }
  #select-proposition {
    margin: 40px 10px;
  }
</style>
