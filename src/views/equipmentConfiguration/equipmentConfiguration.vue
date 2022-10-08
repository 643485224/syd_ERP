<template>
  <!-- 项目资源-专利管理页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="centent_table">
        <cu-table
          :height="tableHeight"
          :tableHeader="tableHeader"
          :tableData="tableData"
        >
          <template #tableTop>
            <div class="buttonList">
              <el-button type="primary" class="buttonOne">添加设备</el-button>
            </div>
          </template>
          <template #url="value">
            <el-image
              style="width: 40px; height: 40px"
              :src="value.value.url"
              :preview-src-list="value.value.srcList"
            >
            </el-image>
          </template>
          <template #state="value">
            <div class="spanChange">
              <span class="spanZX" v-if="value.value.state == '在线'"></span>
              <span
                class="spanLX"
                v-else-if="value.value.state == '离线'"
              ></span>
              {{ value.value.state }}
            </div>
          </template>
          <template #cz="value">
            <div class="tableButtonContent">
              <el-button
                class="tableButton tableButtonTwo"
                type="primary"
                @click="ceshi(value.index)"
                >编辑名称</el-button
              >
            </div>
          </template>
        </cu-table>
      </div>
    </cu-animation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 0, //表格高度
      // 表头
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "名称",
          slot: "jobnumber",
          align: "center",
        },
        {
          title: "类型",
          slot: "name",
          align: "center",
        },
        {
          title: "设备IP地址",
          slot: "sex",
          align: "center",
        },
        {
          title: "物理地址（MAC）",
          key: "department",
          align: "center",
        },
        {
          title: "唯一码（SN）",
          key: "email",
          align: "center",
        },
        {
          title: "状态",
          slot: "state",
          align: "center",
        },
        {
          title: "操作",
          slot: "cz",
          width: "200",
          align: "center",
        },
      ],
      // 表内容
      tableData: [
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "离线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
        {
          jobnumber: "前台二楼人脸考勤机.0",
          name: "人脸考勤机",
          sex: "199.168.22.2",
          department: "EB:DF:E8:16:BA:5C",
          email: "FHAD-DAD2-021A",
          state: "在线",
        },
      ],
    };
  },
  methods: {
    // 根据浏览器大小计算表格高度
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 40 - 147;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  mounted() {
    setTimeout(() => {
      this.handleHeight();
    }, 100);
    window.onresize = () => {
      this.handleHeight();
    };
  },
};
</script>

<style lang="less" scoped>
@import "./equipmentConfiguration.scss";
</style>
