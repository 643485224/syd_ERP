<template>
  <div class="content-box">
    <div style="display: flex">
      <cu-calendar></cu-calendar>
      <el-button type="primary" @click="isdialog = true">弹框</el-button>
    </div>

    <cu-dialog
      :title="'日历'"
      :center="true"
      :showClose="true"
      :visible="isdialog"
      width="1060px"
      @handleOk="handleOk"
      @handleClose="handleClose"
    >
      <div>
        <cu-calendar></cu-calendar>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isdialog: false,
    };
  },
  methods: {
    handleOk() {
      this.isdialog = !this.isdialog;
    },
    handleClose() {
      this.isdialog = !this.isdialog;
    },
  },
};
</script>
<style lang="scss" scoped></style>
