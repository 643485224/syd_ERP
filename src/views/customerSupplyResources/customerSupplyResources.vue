<template>
  <!-- 订单管理-客供资源管理 -->
  <div ref="contentBox" class="content-box">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="content-tabs">
      <!-- 客户列表 -->
      <el-tab-pane label="客户列表" name="elTabOne">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="centent_bottom">
            <div class="bodyButton">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出列表</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >新建客户</el-button
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
                :tableHeader="tableHeaderKQ"
                :tableData="tableDataKQ"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
              >
                <template #url="value">
                  <el-image
                    style="width: 40px; height: 40px"
                    :src="value.value.url"
                    :preview-src-list="value.value.srcList"
                  >
                  </el-image>
                </template>
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
      <!-- 供应商管理 -->
      <el-tab-pane label="供应商管理" name="elTabTwo">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="centent_bottom">
            <div class="bodyButton">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出列表</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >新建供应商</el-button
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
                <template #url="value">
                  <el-image
                    style="width: 40px; height: 40px"
                    :src="value.value.url"
                    :preview-src-list="value.value.srcList"
                  >
                  </el-image>
                </template>
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
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 0, //表格高度
      activeName: "elTabOne", // 导航初始选中的模块
      // 客户列表-表头
      tableHeaderKQ: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "客户名称",
          slot: "id",
          align: "center",
          width: "240px",
        },
        {
          title: "所属行业",
          slot: "name",
          align: "center",
        },
        {
          title: "合作开始时间",
          key: "department",
          align: "center",
        },
        {
          title: "联系人",
          key: "work",
          align: "center",
          width: "120px",
        },
        {
          title: "联系方式",
          key: "getOffWork",
          align: "center",
          width: "200px",
        },
        {
          title: "地址",
          key: "workOvertime",
          align: "center",
          width: "240px",
        },
        {
          title: "企业资质",
          slot: "url",
          align: "center",
        },
        {
          title: "操作",
          slot: "ck",
          align: "center",
        },
      ],
      // 客户列表-表内容
      tableDataKQ: [
        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
      ],
      // 供应商管理列表-表头
      tableHeaderYS: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "客户名称",
          slot: "id",
          align: "center",
          width: "240px",
        },
        {
          title: "合作业务",
          slot: "name",
          align: "center",
        },
        {
          title: "合作开始时间",
          key: "department",
          align: "center",
        },
        {
          title: "联系人",
          key: "work",
          align: "center",
          width: "120px",
        },
        {
          title: "联系方式",
          key: "getOffWork",
          align: "center",
          width: "200px",
        },
        {
          title: "地址",
          key: "workOvertime",
          align: "center",
          width: "240px",
        },
        {
          title: "企业资质",
          slot: "url",
          align: "center",
        },
        {
          title: "操作",
          slot: "ck",
          align: "center",
        },
      ],
      // 供应商管理列表-表内容
      tableDataYS: [
        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },

        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          id: "某某某某某某某某有限责任公司",
          name: "城市建设",
          department: "2022-07-26",
          work: "张三",
          getOffWork: "13000001234",
          workOvertime: "某某省某某市某某区某某街道某某园区某某楼几号   ",
          AskForLeave: "1",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
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
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //加班待审核数据
      pendingReview2: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //请假待审核数据
      pendingReview3: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //出差待审核数据
      audited1: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //加班已审核数据
      audited2: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //请假已审核数据
      audited3: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //出差已审核数据
      didNotPass1: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //加班未通过数据
      didNotPass2: [
        {
          name: "某某某某某某某某有限责任公司",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ], //请假未通过数据
      didNotPass3: [
        {
          name: "某某某某某某某某有限责任公司",
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
@import "./customerSupplyResources.scss";
</style>
