<template>
  <!-- 人力资源-员工资源申请页面 -->
  <div class="content-box">
    <el-tabs
      v-model="activeName"
      @tab-click="tabClick($event)"
      class="content-tabs"
    >
      <!-- 加班申请 -->
      <el-tab-pane label="加班申请" name="加班申请">
        <cu-requisition
          :title="'加班记录申请'"
          :form="form"
          :pendingReviewList="pendingReviewList"
          :rejectedList="rejectedList"
          :auditedList="auditedList"
          @actinItem="actinItem"
          @submitButton="submitButton"
          @agreeButton="agreeButton"
          @rejectButton="rejectButton"
        ></cu-requisition>
      </el-tab-pane>
      <!-- 请假申请 -->
      <el-tab-pane label="请假申请" name="请假申请">
        <cu-requisition
          :title="'请假申请单'"
          :form="form"
          :pendingReviewList="pendingReviewList"
          :rejectedList="rejectedList"
          :auditedList="auditedList"
          @actinItem="actinItem"
          @submitButton="submitButton"
          @agreeButton="agreeButton"
          @rejectButton="rejectButton"
        ></cu-requisition>
      </el-tab-pane>
      <!-- 出差申请 -->
      <el-tab-pane label="出差申请" name="出差申请">
        <cu-requisition
          :title="'出差申请单'"
          :form="form"
          :pendingReviewList="pendingReviewList"
          :rejectedList="rejectedList"
          :auditedList="auditedList"
          @actinItem="actinItem"
          @submitButton="submitButton"
          @agreeButton="agreeButton"
          @rejectButton="rejectButton"
        ></cu-requisition>
      </el-tab-pane>
      <!-- 补卡申请 -->
      <el-tab-pane label="补卡申请" name="补卡申请">
        <cu-requisition :title="'补卡申请单'"></cu-requisition>
      </el-tab-pane>
      <!-- 转岗申请 -->
      <el-tab-pane label="转岗申请" name="转岗申请">
        <cu-requisition :title="'转岗申请单'"></cu-requisition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  InsertApply,
  SelectApply,
  OneCheckApply,
  TwoCheckApply,
} from "@/api/erpApi/applyApi";
import { SelectUser, SelectDepartmentHead } from "@/api/erpApi/userApi";
export default {
  data() {
    return {
      htmlState: 0, //页面权限（0禁止，1查看，2修改）
      activeName: "加班申请", // 导航初始选中的模块
      vuex_user: this.$store.state.vuex_user, //获取当前登录用户信息
      endApplyId: null,
      form: {
        ifTrueOrFalse: true,
        timeList: ["", ""], //日期时间
        Start: "", //开始时间
        Finish: "", //结束时间
        Duration: 0, //时长  1.5
        DurationName: "", //时长 1小时30分
        departmentHeadList: [], //部门负责人 选择器数据
        administrativeHrOfficerList: [], //行政人资负责人 选择器数据
        AskForLeaveList: [
          "调休",
          "病假",
          "事假",
          "婚假",
          "丧假",
          "产假",
          "护理假（男方）",
          "带薪年休假",
          "工伤假",
        ], //请假类型 选择器数据
        AskForLeave: "", //请假类型
        WorkOve: false, //加班抵扣
        Address: "", //地址
        TrafficTools: "", //交通方式
        TrafficToolsList: [
          "高铁",
          "火车",
          "飞机",
          "船",
          "打车",
          "班车",
          "公交车",
          "摩托车",
          "自驾",
          "步行",
        ], //交通方式 选择器数据
        cardDate: "", // 补卡日期
        cardTime: "", // 补卡时间
        takeEffectTime: "", //生效时间
        ApplyTypeId: "", //申请类型：1为加班，2为请假，3为出差
        apply_type_name: "", //	申请类别
        role: "", //	所属角色
        // 进度详情数据
        apply_id: "", //申请ID
        user_id: "", //申请人ID
        apply_type_id: "", //申请类别ID
        apply_name: "", //	申请人姓名
        apply_department: "", //	申请人部门
        apply_position: "", //	申请人职位
        apply_note: "", //	申请备注
        addtime: "", //	申请时间

        one_check_id: "", //一级审核人ID
        one_name: "", //一级审核人姓名
        one_department: "", //一级审核人部门
        one_position: "", //一级审核人职位
        one_check_state: "", //一级审核状态
        one_check_note: "", //一级审核备注
        one_check_time: "", //一级审核时间

        two_check_id: "", //    二级审核人ID
        two_check_state: "", //	二级审核状态
        two_name: "", //	二级审核人姓名
        two_department: "", //	二级审核人部门
        two_position: "", //	二级审核人职位
        two_check_note: "", //	二级审核备注
        two_check_time: "", //	二级审核时间
      },
      pendingReviewList: [], //待审核
      rejectedList: [], //已驳回
      auditedList: [], //已审核
    };
  },
  mounted() {
    this.htmlState = this.$cu.menuHandle("员工资源申请"); //获取页面权限信息
    this.form.apply_name = this.vuex_user.Name; //获取当前登录名字
    this.form.apply_department = this.vuex_user.Department; //获取当前登录部门
    this.form.one_position = this.vuex_user.Position; //获取当前登录职业
    this.SelectApplyApi(); // 查询申请-接口 1为加班，2为请假，3为出差
    this.SelectUserApi(); // 查询用户-接口
    this.SelectDepartmentHeadApi(); // 查询部门负责人-接口
  },
  methods: {
    // 查询用户-接口
    SelectUserApi() {
      let valueData = {
        Body: {
          adddate: "", //入职日期
          department_name: "行政人资", //部门
          position_name: "行政经理", //职位
          is_state: "", // //是否在职
          User: {
            Name: "", //性名
            Gender: "", //姓别

            EmployeeState: "", //雇员类型
          },
        },
        Header: {
          pageIndex: 1,
          pageSize: 10000,
        },
      };
      SelectUser(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.form.administrativeHrOfficerList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询部门负责人-接口
    SelectDepartmentHeadApi() {
      let valueData = {
        Body: {
          department_name: this.form.apply_department,
        },
      };
      SelectDepartmentHead(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.form.departmentHeadList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 提交申请-接口
    InsertApplyApi(valueData) {
      InsertApply(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.$message.success(res.Msg);
            this.SelectApplyApi();
            this.newButton();
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询申请-接口
    SelectApplyApi() {
      let valueId; //申请类型：1为加班，2为请假，3为出差
      if (this.activeName == "加班申请") {
        valueId = 1;
      } else if (this.activeName == "请假申请") {
        valueId = 2;
      } else if (this.activeName == "出差申请") {
        valueId = 3;
      } else if (this.activeName == "补卡申请") {
      } else if (this.activeName == "转岗申请") {
      }
      let valueData = {
        Body: {
          UserApply: {
            ApplyTypeId: valueId, //申请类型：1为加班，2为请假，3为出差
          },
        },
        Header: {
          pageIndex: 1,
          pageSize: 10000,
        },
      };
      SelectApply(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.handleDistinguish(res.Data);
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 一级审核-接口
    OneCheckApplyApi(valueData) {
      OneCheckApply(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.$message.success(res.Msg);
            this.SelectApplyApi();
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 二级审核-接口
    TwoCheckApplyApi(valueData) {
      TwoCheckApply(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.$message.success(res.Msg);
            this.SelectApplyApi();
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 数据处理-区分：待审核；已驳回；已审核
    handleDistinguish(valueData) {
      this.pendingReviewList = []; //待审核
      this.rejectedList = []; //已驳回
      this.auditedList = []; //已审核
      valueData.forEach((element) => {
        if (element.apply_id == this.endApplyId) {
          this.actinItem(element);
        }
        if (element.two_check_state == "") {
          this.pendingReviewList.push(element); //待审核
        } else if (element.two_check_state == "False") {
          this.rejectedList.push(element); //已驳回
        } else if (element.two_check_state == "True") {
          this.auditedList.push(element); //已审核
        }
      });
      console.log("this.pendingReviewList:", this.pendingReviewList);
      console.log("this.rejectedList:", this.rejectedList);
      console.log("this.auditedList:", this.auditedList);
    },

    // 顶部tab点击回调
    tabClick(value) {
      this.newButton();
      if (this.activeName == "加班申请") {
        this.SelectApplyApi(); // 查询申请-接口
      } else if (this.activeName == "请假申请") {
        this.SelectApplyApi(); // 查询申请-接口
      } else if (this.activeName == "出差申请") {
        this.SelectApplyApi(); // 查询申请-接口
      } else if (this.activeName == "补卡申请") {
      } else if (this.activeName == "转岗申请") {
      }
    },
    // 提交按钮
    submitButton(value) {
      if (this.activeName == "加班申请") {
        if (!value.Start || !value.Finish) {
          this.$message.error("日期时间不能为空");
          return;
        }
        if (!value.apply_note) {
          this.$message.error("申请事由不能为空");
          return;
        }
        let valueData = {
          Body: {
            UserApply: {
              Start: new Date(value.Start), //开始时间
              Finish: new Date(value.Finish), //结束时间
              Duration: value.Duration, //时长
              ApplyNote: value.apply_note, //申请事由
              OneCheckId: value.one_check_id, // value.one_check_id, //一级审核人ID(部门负责人id)
              TwoCheckId: value.two_check_id, //value.two_check_id, //二级审核人ID(行政人资负责人id)
              ApplyTypeId: 1, //申请类型：1为加班，2为请假，3为出差
            },
          },
        };
        this.InsertApplyApi(valueData); //提交申请-接口
      } else if (this.activeName == "请假申请") {
        if (!value.AskForLeave) {
          this.$message.error("请假类型不能为空");
          return;
        }
        if (!value.Start || !value.Finish) {
          this.$message.error("日期时间不能为空");
          return;
        }
        if (!value.apply_note) {
          this.$message.error("申请事由不能为空");
          return;
        }
        let valueData = {
          Body: {
            UserApply: {
              AskForLeave: value.AskForLeave, // 请假类型
              WorkOve: value.WorkOve, // 加班抵扣
              Start: value.Start, //开始时间
              Finish: value.Finish, //结束时间
              Duration: value.Duration, //时长
              ApplyNote: value.apply_note, //申请事由
              OneCheckId: value.one_check_id, //一级审核人ID(部门负责人id)
              TwoCheckId: value.two_check_id, //二级审核人ID(行政人资负责人id)
              ApplyTypeId: 2, //申请类型：1为加班，2为请假，3为出差
            },
          },
        };
        this.InsertApplyApi(valueData); //提交申请-接口
        console.log(value);
      } else if (this.activeName == "出差申请") {
        if (!value.Address) {
          this.$message.error("出差地址不能为空");
          return;
        }
        if (!value.TrafficTools) {
          this.$message.error("交通方式不能为空");
          return;
        }
        if (!value.Start || !value.Finish) {
          this.$message.error("日期时间不能为空");
          return;
        }
        if (!value.apply_note) {
          this.$message.error("申请事由不能为空");
          return;
        }
        let valueData = {
          Body: {
            UserApply: {
              Address: value.Address, // 出差地址
              TrafficTools: value.TrafficTools, // 交通方式
              Start: value.Start, //开始时间
              Finish: value.Finish, //结束时间
              Duration: value.Duration, //时长
              ApplyNote: value.apply_note, //申请事由
              OneCheckId: value.one_check_id, //一级审核人ID(部门负责人id)
              TwoCheckId: value.two_check_id, //二级审核人ID(行政人资负责人id)
              ApplyTypeId: 3, //申请类型：1为加班，2为请假，3为出差
            },
          },
        };
        // this.InsertApplyApi(valueData); //提交申请-接口
      } else if (this.activeName == "补卡申请") {
      } else if (this.activeName == "转岗申请") {
      }
    },

    actinItem(item) {
      this.form.ifTrueOrFalse = true;
      this.form.Start = item.start;
      this.form.Finish = item.finish;
      this.form.timeList = [item.start, item.finish];
      this.form.Duration = item.duration;
      this.form.DurationName = item.duration + " 小时";
      this.form.AskForLeave = item.AskForLeave;
      this.form.role = item.role; //	所属角色
      this.form.apply_id = item.apply_id; //申请ID
      this.form.user_id = item.user_id; //申请人ID
      this.form.apply_type_id = item.apply_type_id; //申请类别ID
      this.form.apply_name = item.apply_name; //	申请人姓名
      this.form.apply_department = item.apply_department; //	申请人部门
      this.form.apply_position = item.apply_position; //	申请人职位
      this.form.apply_note = item.apply_note; //	申请备注
      this.form.addtime = item.addtime; //	申请时间
      this.form.one_check_id = item.one_check_id; //一级审核人ID
      this.form.one_name = item.one_name; //一级审核人姓名
      this.form.one_department = item.one_department; //一级审核人部门
      this.form.one_position = item.one_position; //一级审核人职位
      this.form.one_check_state = item.one_check_state + ""; //一级审核状态
      this.form.one_check_note = item.one_check_note; //一级审核备注
      this.form.one_check_time = item.one_check_time; //一级审核时间
      this.form.two_check_id = item.two_check_id; //    二级审核人ID
      this.form.two_check_state = item.two_check_state + ""; //	二级审核状态
      this.form.two_name = item.two_name; //	二级审核人姓名
      this.form.two_department = item.two_department; //	二级审核人部门
      this.form.two_position = item.two_position; //	二级审核人职位
      this.form.two_check_note = item.two_check_note; //	二级审核备注
      this.form.two_check_time = item.two_check_time; //	二级审核时间
    },
    // 同意按钮
    agreeButton(valueData) {
      this.endApplyId = valueData.apply_id;
      if (valueData.one_check_state == "") {
        let apiData = {
          Body: {
            UserApply: {
              ApplyId: valueData.apply_id,
              OneCheckNote: valueData.one_check_note, //审核原因
              OneCheckState: true, //审核状态：true为同意，false为驳回
            },
          },
        };
        this.OneCheckApplyApi(apiData); //一级审核
      } else {
        let apiData = {
          Body: {
            UserApply: {
              ApplyId: valueData.apply_id,
              TwoCheckNote: valueData.two_check_note, //审核原因
              TwoCheckState: true, //审核状态：true为同意，false为驳回
            },
          },
        };
        this.TwoCheckApplyApi(apiData); //二级审核
      }
    },
    // 驳回按钮
    rejectButton(valueData) {
      this.endApplyId = valueData.apply_id;
      if (valueData.one_check_state == "") {
        let apiData = {
          Body: {
            UserApply: {
              ApplyId: valueData.apply_id,
              OneCheckNote: valueData.one_check_note, //审核原因
              OneCheckState: false, //审核状态：true为同意，false为驳回
            },
          },
        };
        this.OneCheckApplyApi(apiData); //一级审核
      } else {
        let apiData = {
          Body: {
            UserApply: {
              ApplyId: valueData.apply_id,
              TwoCheckNote: valueData.two_check_note, //审核原因
              TwoCheckState: false, //审核状态：true为同意，false为驳回
            },
          },
        };
        this.TwoCheckApplyApi(apiData); //二级审核
      }
    },
    // 重置数据
    newButton() {
      this.form.timeList = ["", ""]; //日期时间
      this.form.Start = ""; //开始时间
      this.form.Finish = ""; //结束时间
      this.form.Duration = 0; //时长  1.5
      this.form.DurationName = ""; //时长 1小时30分
      this.form.AskForLeave = ""; //请假类型
      this.form.WorkOve = false; //加班抵扣
      this.form.Address = ""; //地址
      this.form.TrafficTools = ""; //交通方式
      this.form.cardDate = ""; // 补卡日期
      this.form.cardTime = ""; // 补卡时间
      this.form.takeEffectTime = ""; //生效时间
      this.form.ApplyTypeId = ""; //申请类型：1为加班，2为请假，3为出差
      this.form.apply_type_name = ""; //	申请类别
      this.form.role = ""; //	所属角色
      // 进度详情数据
      this.form.apply_id = ""; //申请ID
      this.form.user_id = ""; //申请人ID
      this.form.apply_type_id = ""; //申请类别ID
      this.form.apply_note = ""; //	申请备注
      this.form.addtime = ""; //	申请时间
      this.form.one_check_id = ""; //一级审核人ID
      this.form.one_name = ""; //一级审核人姓名
      this.form.one_department = ""; //一级审核人部门
      this.form.one_position = ""; //一级审核人职位
      this.form.one_check_state = ""; //一级审核状态
      this.form.one_check_note = ""; //一级审核备注
      this.form.one_check_time = ""; //一级审核时间
      this.form.two_check_id = ""; //    二级审核人ID
      this.form.two_check_state = ""; //	二级审核状态
      this.form.two_name = ""; //	二级审核人姓名
      this.form.two_department = ""; //	二级审核人部门
      this.form.two_position = ""; //	二级审核人职位
      this.form.two_check_note = ""; //	二级审核备注
      this.form.two_check_time = ""; //	二级审核时间
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./employeeApplication.scss";
</style>
