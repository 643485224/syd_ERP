<template>
  <!-- 人力资源-考勤管理页面 -->
  <div ref="contentBox" class="content-box">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="content-tabs">
      <!-- 考勤名单列表 -->
      <el-tab-pane label="考勤名单列表" name="elTabOne">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="centent_bottom">
            <div class="bodyButton">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出原始数据</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >导出考勤确认表</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonThree"
                @click="transferPostButton"
                >导出考勤计算表</el-button
              >
            </div>
            <div class="bodyTable">
              <cu-table
                :height="tableHeight"
                :tableHeader="tableHeaderKQ"
                :tableData="tableDataKQ"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
              >
                <template #Birthday="value">{{
                  new Date(value.value.Birthday).Format("yyyy-MM-dd")
                }}</template>
                <template #Adddate="value">{{
                  new Date(value.value.Adddate).Format("yyyy-MM-dd")
                }}</template>
                <template #ck="value">
                  <div class="tableButtonContent">
                    <el-button
                      class="tableButton tableButtonTwo"
                      type="primary"
                      @click="ceshi(value.index)"
                      >查看详情</el-button
                    >
                  </div>
                </template>
              </cu-table>
            </div>
          </div>
        </cu-animation>
      </el-tab-pane>
      <!-- 原始记录 -->
      <el-tab-pane label="原始记录" name="elTabTwo">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="centent_bottom">
            <div class="bodyButton">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出原始数据</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >导出考勤确认表</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonThree"
                @click="transferPostButton"
                >导出考勤计算表</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonFive"
                @click="transferPostButton"
                >过滤查询</el-button
              >
            </div>
            <div class="bodyTable">
              <cu-table
                :height="tableHeight"
                :tableHeader="tableHeaderYS"
                :tableData="tableDataYS"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
              >
                <template #Birthday="value">{{
                  new Date(value.value.Birthday).Format("yyyy-MM-dd")
                }}</template>
                <template #Adddate="value">{{
                  new Date(value.value.Adddate).Format("yyyy-MM-dd")
                }}</template>
                <template #cz="value">
                  <div class="tableButtonContent">
                    <el-button
                      class="tableButton tableButtonTwo"
                      type="primary"
                      @click="ceshi(value.index)"
                      >查看图片</el-button
                    >
                  </div>
                </template>
              </cu-table>
            </div>
          </div>
        </cu-animation>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 0, //表格高度
      activeName: "elTabOne", // 导航初始选中的模块
      // 考勤名单列表-表头
      tableHeaderKQ: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "工号",
          slot: "id",

          align: "center",
        },
        {
          title: "姓名",
          slot: "name",
          width: "80",
          align: "center",
        },
        {
          title: "部门",
          key: "department",

          align: "center",
        },
        {
          title: "考勤方式",
          key: "getOffWork",

          align: "center",
        },
        // {
        //   title: "上班打卡/次",
        //   slot: "work",
        //
        //   align: "center",
        // },
        // {
        //   title: "下班打卡/次",
        //   key: "getOffWork",
        //
        //   align: "center",
        // },

        {
          title: "加班/时",
          key: "workOvertime",

          align: "center",
        },
        {
          title: "请假/天",
          key: "AskForLeave",

          align: "center",
        },
        {
          title: "出差/天",
          slot: "OnBusinessTrip",

          align: "center",
        },

        {
          title: "出勤天数",
          slot: "time",

          align: "center",
        },

        {
          title: "查看",
          slot: "ck",

          align: "center",
        },
      ],
      // 考勤名单列表-表内容
      tableDataKQ: [
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "12",
          getOffWork: "12",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
      ],
      // 原始记录列表-表头
      tableHeaderYS: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "工号",
          slot: "id",

          align: "center",
        },
        {
          title: "姓名",
          slot: "name",
          align: "center",
        },
        {
          title: "部门",
          key: "department",
          align: "center",
        },
        {
          title: "考勤方式",
          slot: "work",
          align: "center",
        },
        {
          title: "打卡时间 ",
          key: "getOffWork",
          align: "center",
        },
        {
          title: "出勤天数",
          key: "workOvertime",
          align: "center",
        },

        {
          title: "操作",
          slot: "cz",

          align: "center",
        },
      ],
      // 原始记录列表-表内容
      tableDataYS: [
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "钉钉",
          getOffWork: "2022-07-21 08:22:04",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "钉钉",
          getOffWork: "2022-07-21 08:22:04",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "钉钉",
          getOffWork: "2022-07-21 08:22:04",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "钉钉",
          getOffWork: "2022-07-21 08:22:04",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
        {
          id: "SYD-001",
          name: "张三",
          department: "研发部",
          work: "钉钉",
          getOffWork: "2022-07-21 08:22:04",
          workOvertime: "5",
          AskForLeave: "1",
          OnBusinessTrip: "2",
          type: "加班",
          time: "2022-06-06",
          state: "待通过",
          answer: "22",
          reality: "20",
        },
      ],
      isShow: false, //导航显示和隐藏
      currentIndex: "", //导航栏当前索引
      date_value: "", //日期
      time_value: [new Date(), new Date()], // 时间
      staffName: "", //员工名字
      department: "", //部门条件
      currentPage: 5, //分页
      content_title: [
        "工号",
        "姓名",
        "部门",
        "上班打卡/次",
        "下班打卡/次",
        "加班/时",
        "请假/天",
        "出差/天",
        "单据类型",
        "申请时间",
        "审核状态",
        "应出勤天数",
        "实出勤天数",
        "查看",
        "选择",
      ],
      drawer: false,
      activeNames1: ["1"], //加班审核单据列表的折叠面板
      activeNames2: ["1"], //加班审核单据列表的折叠面板
      activeNames3: ["1"], //加班审核单据列表的折叠面板
      work_name1: "", //加班申请单姓名
      work_name2: "", //请假申请单姓名
      work_name3: "", //出差申请单姓名
      work_department1: "", //加班申请单部门
      work_department2: "", //请假申请单部门
      work_department3: "", //出差申请单部门
      work_position1: "", //加班申请单职位
      work_position2: "", //请假申请单职位
      work_position3: "", //出差申请单职位
      typeOfLeave: ["事假", "病假"], // 请假类型
      checked: true, // 请假加班抵扣多选框
      typeOfLeave_value: "", // 请假类型选中的值
      businessTravelAddress: "", //出差地址
      transportation: ["火车", "高铁", "飞机"], // 出差交通工具
      transportation_value: "", //出差交通工具选中的值
      work_time1: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ], //加班的起始和结束时间
      work_time2: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ], //请假的起始和结束时间
      work_time3: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ], //出差的起始和结束时间
      work_duration1: "", // 加班时长
      work_duration2: "", // 请假时长
      work_duration3: "", // 出差时长
      textarea1: "", // 加班事由
      textarea2: "", // 请假事由
      textarea3: "", // 出差事由
      departmentHead1: [
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
      ], //加班部门负责人
      departmentHead2: [
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
      ], //请假部门负责人
      departmentHead3: [
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
      ], //出差部门负责人
      departmentHead_value1: "", //加班部门负责人选择的值
      departmentHead_value2: "", //请假部门负责人选择的值
      departmentHead_value3: "", //请假部门负责人选择的值
      administrativeOfficer1: [
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
      ], //加班行政人资负责人
      administrativeOfficer2: [
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
      ], //请假行政人资负责人
      administrativeOfficer3: [
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
        { name: "李四" },
      ], //出差行政人资负责人
      administrativeOfficer_value1: "", //加班行政人资负责人选择的值
      administrativeOfficer_value2: "", //请假行政人资负责人选择的值
      administrativeOfficer_value3: "", //出差行政人资负责人选择的值
      detailedProgress_textareaOne1: "", //加班单据进度详细里的事由textarea框1
      detailedProgress_textareaTwo1: "", //加班单据进度详细里的事由textarea框2
      detailedProgress_textareaThree1: "", //加班单据进度详细里的事由textarea框3
      detailedProgress_textareaOne2: "", //请假单据进度详细里的事由textarea框1
      detailedProgress_textareaTwo2: "", //请假单据进度详细里的事由textarea框2
      detailedProgress_textareaThree2: "", //请假单据进度详细里的事由textarea框3
      detailedProgress_textareaOne3: "", //出差单据进度详细里的事由textarea框1
      detailedProgress_textareaTwo3: "", //出差单据进度详细里的事由textarea框2
      detailedProgress_textareaThree3: "", //出差单据进度详细里的事由textarea框3
      pendingReview1: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //加班待审核数据
      pendingReview2: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //请假待审核数据
      pendingReview3: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //出差待审核数据
      audited1: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //加班已审核数据
      audited2: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //请假已审核数据
      audited3: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //出差已审核数据
      didNotPass1: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //加班未通过数据
      didNotPass2: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //请假未通过数据
      didNotPass3: [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //出差未通过数据
    };
  },
  methods: {
    // 根据浏览器大小计算表格高度
    handleHeight() {
      this.tableHeight =
        this.$refs.contentBox.offsetHeight - 40 - 15 - 40 - 147;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggle(index) {
      this.currentIndex = index;
      if (index == 1) {
        this.drawer = true;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    },
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  mounted() {
    setTimeout(() => {
      this.handleHeight();
    }, 500);
    window.onresize = () => {
      this.handleHeight();
    };
    // 初始化wowjs动画
    new this.$wow.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    }).init();
  },
};
</script>

<style lang="scss" scoped>
@import "./AttendanceManagement.scss";
</style>
