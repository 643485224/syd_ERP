<template>
  <!-- 高级设置-系统日志页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne">导出日志</el-button>
        <el-button type="primary" class="Hover buttonFive">清空日志</el-button>
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
          <template #state="value">
            <div class="spanChange">
              <span class="spanYSH" v-if="value.value.state == '已审核'">
                {{ value.value.state }}
              </span>
              <span class="spanDSH" v-else-if="value.value.state == '待审核'">
                {{ value.value.state }}
              </span>
              <span class="spanBTG" v-else-if="value.value.state == '不通过'">
                {{ value.value.state }}
              </span>
            </div>
          </template>
          <template #cz="value">
            <div class="tableButtonContent">
              <el-button
                class="tableButton tableButtonTwo"
                type="primary"
                @click="ceshi(value.index)"
                >查看详细</el-button
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
          title: "优先层级",
          slot: "jobnumber",
          align: "center",
        },
        {
          title: "时间",
          slot: "name",
          align: "center",
          width: 100,
        },
        {
          title: "用户",
          slot: "sex",
          align: "center",
        },
        {
          title: "来源IP地址",
          key: "department",
          align: "center",
        },
        {
          title: "时间内容",
          key: "email",
          align: "center",
        },
      ],
      // 表内容
      tableData: [
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
        },
        {
          jobnumber: "更新",
          name: "2022-07-30 09:49:24",
          sex: "system",
          department: "199.168.22.62",
          email:
            "网络时间获取成功，设备时间已更新为2022-07-03 08:30:00，时区为：GMT+8:00 北京 ",
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
@import "./systemLog.scss";
</style>
