<template>
  <!-- 人力资源-通讯录管理页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne">导出通讯录</el-button>
        <el-button
          type="primary"
          class="Hover buttonTwo"
          @click="selectVisible = true"
          >过滤查询</el-button
        >
      </div>
    </cu-animation>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="centent_table">
        <cu-table
          :height="tableHeight"
          :tableHeader="tableHeader"
          :tableData="tableData"
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
          <template slot="UserNum" slot-scope="value">
            {{ value.value.User.UserNum }}
          </template>
          <template slot="Name" slot-scope="value">
            {{ value.value.User.Name }}
          </template>
          <template slot="Gender" slot-scope="value">
            {{ value.value.User.Gender }}
          </template>
          <template slot="Phone" slot-scope="value">
            {{ value.value.User.Phone }}
          </template>
          <template slot="Mail" slot-scope="value">
            {{ value.value.User.Mail }}
          </template>
          <template slot="EmergencyName" slot-scope="value">
            {{ value.value.User.EmergencyName }}
          </template>
          <template slot="EmergencyPhone" slot-scope="value">
            {{ value.value.User.EmergencyPhone }}
          </template>
          <template #IsState="value">
            <div class="spanChange">
              <span class="spanZZ" v-if="value.value.User.IsState == true">
                在职
              </span>
              <span class="spanLZ" v-else> 离职 </span>
            </div>
          </template>
        </cu-table>
      </div>
    </cu-animation>

    <!-- 过滤查询弹框 -->
    <cu-dialog
      title="过滤查询"
      :showClose="true"
      :visible="selectVisible"
      @handleClose="selectHandleClose()"
      @handleOk="selectHandleOk()"
    >
      <el-row :gutter="20" class="mb_20">
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">入职日期:</span>
            <el-date-picker
              style="width: 200px; height: 40px"
              v-model="selectForm.adddate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker></div
        ></el-col>
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">名字条件:</span>
            <el-input
              style="width: 200px; height: 40px"
              v-model="selectForm.Name"
              placeholder="请输入名字"
            ></el-input></div
        ></el-col>
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">性别条件:</span>
            <el-select
              style="width: 200px; height: 40px"
              v-model="selectForm.Gender"
              clearable
              placeholder="请选择性别"
            >
              <el-option value="全部">全部</el-option>
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20" class="mb_20">
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">部门条件:</span>
            <el-input
              style="width: 200px; height: 40px"
              v-model="selectForm.department_name"
              placeholder="请输入部门"
            ></el-input></div
        ></el-col>
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">职位条件:</span>
            <el-input
              style="width: 200px; height: 40px"
              v-model="selectForm.position_name"
              placeholder="请输入职位"
            ></el-input></div
        ></el-col>
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">雇员类型:</span>
            <el-select
              style="width: 200px; height: 40px"
              v-model="selectForm.EmployeeState"
              clearable
              placeholder="请选择雇员类型"
            >
              <el-option value="全部">全部</el-option>
              <el-option value="正式">正式</el-option>
              <el-option value="试用">试用</el-option>
            </el-select>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="flex_ac">
            <span class="mr_10">状态条件:</span>
            <el-select
              style="width: 200px; height: 40px"
              v-model="selectForm.is_state"
              clearable
              placeholder="请选择状态"
            >
              <el-option value="全部">全部</el-option>
              <el-option value="在职"> 在职 </el-option>
              <el-option value="离职"> 离职 </el-option>
            </el-select>
          </div></el-col
        >
      </el-row>
    </cu-dialog>
  </div>
</template>

<script>
import { SelectUser } from "@/api/erpApi/userApi";
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
          title: "工号",
          slot: "UserNum",
          width: "120",
          align: "center",
        },
        {
          title: "姓名",
          slot: "Name",
          align: "center",
        },
        {
          title: "性别",
          slot: "Gender",
          align: "center",
        },

        {
          title: "部门",
          key: "Department",
          align: "center",
        },
        {
          title: "职位",
          key: "Position",
          align: "center",
        },
        {
          title: "联系方式",
          slot: "Phone",
          width: "200",
          align: "center",
        },
        {
          title: "电子邮箱",
          slot: "Mail",
          align: "center",
        },
        {
          title: "紧急联系人",
          slot: "EmergencyName",
          align: "center",
        },
        {
          title: "紧急联系电话",
          slot: "EmergencyPhone",
          align: "center",
        },
        {
          title: "状态",
          slot: "IsState",
          align: "center",
        },
      ],
      // 表内容
      tableData: [],
      total: 0,
      pageindex: 1, //分页-页码
      pageSize: 10, //分页-每页条数
      selectVisible: false, //过滤查询弹框
      selectForm: {
        //过滤查询字段
        adddate: "", // 入职时间条件
        Name: "", // 姓名条件
        Gender: "", // 性别条件
        department_name: "", // 部门条件
        position_name: "", // 职位条件
        EmployeeState: "", // 雇员类型
        is_state: "", // 状态条件
      },
    };
  },
  mounted() {
    window.onresize = () => {
      this.handleHeight();
    };

    this.SelectUserApi(); // 查询用户-接口
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 根据浏览器大小计算表格高度
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 40 - 147;
    },
    // 查询用户-接口
    SelectUserApi() {
      let valueData = {
        Body: {
          //入职日期
          adddate: this.selectForm.adddate
            ? new Date(this.selectForm.adddate).Format("yyyy-MM-dd")
            : "",
          //部门
          department_name: this.selectForm.department_name,
          //职位
          position_name: this.selectForm.position_name,
          //是否在职
          is_state:
            this.selectForm.is_state == "全部" ? "" : this.selectForm.is_state,
          User: {
            //性名
            Name: this.selectForm.Name,
            //姓别
            Gender:
              this.selectForm.Gender == "全部" ? "" : this.selectForm.Gender,
            //雇员类型
            EmployeeState:
              this.selectForm.EmployeeState == "全部"
                ? ""
                : this.selectForm.EmployeeState,
          },
        },
        Header: {
          pageIndex: this.pageindex,
          pageSize: this.pageSize,
        },
      };
      SelectUser(valueData)
        .then((res) => {
          this.tableData = [];
          if (res.Code == 1) {
            this.tableData = res.Data;
            this.total = res.Total;
            this.handleHeight();
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageindex = 1;
      this.pageSize = val;
      this.SelectUserApi(); // 查询用户-接口
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.SelectUserApi(); // 查询用户-接口
    },

    // 过滤查询弹框-取消
    selectHandleClose() {
      this.selectVisible = false;
    },
    // 过滤查询弹框-确定
    selectHandleOk() {
      this.pageindex = 1;
      this.SelectUserApi(); // 查询用户-接口
      this.selectVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./AddressBook.scss";
</style>
