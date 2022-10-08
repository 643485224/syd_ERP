<template>
  <!-- 财务管理-合同管理页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne"
          >导出申请列表</el-button
        >
        <el-button type="primary" class="Hover buttonTwo">添加合同</el-button>
        <el-button type="primary" class="Hover buttonFour">过滤查询</el-button>
      </div>
    </cu-animation>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="centent_table">
        <cu-table
          :height="tableHeight"
          :tableHeader="tableHeader"
          :tableData="tableData"
        >
          <template #tableTop>
            <div class="spanList">
              <span class="spanOne">医疗类合同：1</span>
              <span class="spanTwo">访客类合同：6</span>
              <span class="spanThree">政务类合同：6</span>
              <span class="spanFour">代加工类合同：1</span>
              <span class="spanFive">模块类合同：16</span>
            </div>
          </template>
          <template #state="value">
            <div class="spanChange">
              <span class="spanDSH" v-if="value.value.state == '待审核'">
                {{ value.value.state }}
              </span>
              <span class="spanYSX" v-else-if="value.value.state == '已生效'">
                {{ value.value.state }}
              </span>
            </div>
          </template>
          <template #cz="value">
            <div class="tableButtonContent">
              <el-button
                class="tableButton tableButtonOne"
                type="primary"
                @click="ceshi(value.index)"
                >审核</el-button
              >
              <el-button
                class="tableButton tableButtonTwo"
                type="primary"
                @click="ceshi(value.index)"
                >查看</el-button
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
          title: "合同编号",
          slot: "jobnumber",
          align: "center",
        },
        {
          title: "关联订单号",
          slot: "name",
          align: "center",
        },
        {
          title: "合作方",
          slot: "sex",
          align: "center",
        },
        {
          title: "设备名称",
          key: "department",
          align: "center",
        },
        {
          title: "设备型号",
          key: "email",
          align: "center",
        },
        {
          title: "数量",
          key: "shuliang",
          align: "center",
        },
        {
          title: "合同上传",
          key: "hetong",
          align: "center",
        },
        {
          title: "上传日期",
          key: "dateTime",
          align: "center",
        },
        {
          title: "合同类型",
          key: "tpyeName",
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
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "已生效",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "已生效",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "已生效",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
        },
        {
          jobnumber: "SYD-20220620－001",
          name: "SEORD00001",
          sex: "郑州大桥医院",
          department: "多功能自助终端",
          email: "HD05-08U",
          shuliang: "20台",
          hetong: "",
          dateTime: "2022-7-26",
          tpyeName: "医疗类",
          state: "待审核",
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
@import "./contractManagement.scss";
</style>
