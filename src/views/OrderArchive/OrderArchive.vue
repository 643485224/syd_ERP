<template>
  <!-- 订单管理-软件项目页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne">导出列表</el-button>
        <el-button type="primary" class="Hover buttonTwo">新建任务</el-button>
        <el-button type="primary" class="Hover buttonFour">过滤查 询</el-button>
      </div>
    </cu-animation>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="centent_table">
        <cu-table
          :height="tableHeight"
          :tableHeader="tableHeader"
          :tableData="tableData"
        >
          <template #jindu="value">
            <el-progress
              color="#1DD19B"
              :percentage="value.value.jindu"
            ></el-progress>
          </template>
          <template #State="value">
            <div class="spanChange">
              <span class="spanWKS" v-if="value.value.State == '未开始'">
                {{ value.value.State }}
              </span>
              <span class="spanJXZ" v-else-if="value.value.State == '进行中'">
                {{ value.value.State }}
              </span>
              <span class="spanQX" v-else-if="value.value.State == '取消'">
                {{ value.value.State }}
              </span>
              <span class="spanWC" v-else-if="value.value.State == '完成'">
                {{ value.value.State }}
              </span>
            </div>
          </template>
          <template #cz="value">
            <div class="tableButtonContent">
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
          title: "项目名称",
          key: "jobnumber",
          align: "center",
        },
        {
          title: "负责人",
          key: "name",
          align: "center",
        },
        {
          title: "需求分类",
          key: "sex",
          align: "center",
        },
        {
          title: "平台",
          key: "department",
          align: "center",
        },
        {
          title: "开始时间",
          key: "Position",
          align: "center",
        },
        {
          title: "交付时间",
          key: "phone",
          align: "center",
        },
        {
          title: "工时",
          key: "email",
          align: "center",
        },
        {
          title: "进度",
          slot: "jindu",
          align: "center",
          width: "160",
        },
        {
          title: "状态",
          slot: "State",
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
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "未开始",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 100,
          State: "进行中",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "取消",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
        },
        {
          id: "1",
          jobnumber: "浙江杭州恒生项目...",
          name: "张三",
          sex: "软件定制",
          department: "离线 ",
          Position: "2022-07-26",
          phone: "2022-08-26 ",
          email: "3.5h",
          jindu: 80,
          State: "完成",
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
@import "./OrderArchive.scss";
</style>
