<template>
  <!-- 订单管理-订单变更页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne">导出列表</el-button>
        <el-button type="primary" class="Hover buttonTwo">ECR申请</el-button>
        <el-button type="primary" class="Hover buttonThree">ECN申请</el-button>
        <el-button type="primary" class="Hover buttonFour">过滤查询</el-button>
        <el-button type="primary" class="Hover buttonFive">删除</el-button>
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
            {{ value.value.state }}
          </template>
          <template #cz="value">
            <div class="tableButtonContent">
              <el-button
                class="tableButton tableButtonOne"
                type="primary"
                :disabled="value.index % 3 != 0"
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
          title: "变更编号",
          slot: "jobnumber",
          align: "center",
        },
        {
          title: "申请人",
          slot: "name",
          align: "center",
        },
        {
          title: "申请部门",
          slot: "sex",
          align: "center",
        },
        {
          title: "变更类型",
          key: "department",
          align: "center",
        },
        {
          title: "变更订单号",
          key: "Position",
          align: "center",
        },
        {
          title: "关联客户",
          slot: "phone",
          align: "center",
        },
        {
          title: "发起时间",
          key: "email",
          align: "center",
        },
        {
          title: "审核状态",
          key: "emergencyContact",
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
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
        },
        {
          id: "1",
          jobnumber: "SYD-GCBG00001",
          name: "张三",
          sex: "研发部",
          department: "ECN",
          Position: "SEORD000001",
          phone: "深圳市赛义德信息技术有限公司",
          email: "2022-06-16",
          emergencyContact: "已审核",
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
@import "./OrderChange.scss";
</style>
