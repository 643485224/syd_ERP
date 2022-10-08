<template>
  <!-- 人力资源-发布通知页面 -->
  <div
    ref="contentBox"
    class="content-box"
    v-loading="loading"
    :element-loading-text="loadingTitle"
    element-loading-spinner="el-icon-loading"
  >
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne" @click="addButton"
          >发布通知</el-button
        >
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
          <template #InformName="value">
            {{ value.value.Inform.InformName }}
          </template>
          <template #InformType="value">
            {{ value.value.Inform.InformType }}
          </template>
          <template #InformTime="value">
            {{
              new Date(value.value.Inform.InformTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              )
            }}
          </template>
          <template #InformCheckState="value">
            <span
              style="color: #1dd19b"
              v-if="value.value.Inform.InformCheckState == true"
              >已审核</span
            >
            <span
              v-if="value.value.Inform.InformCheckState == false"
              style="color: #ffa728"
              >待审核</span
            >
          </template>

          <!-- 操作 -->
          <template #cz="value">
            <div class="tableButtonContent">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否审核该条通知?"
                @confirm="CheckInformApi(value.value.Inform.InformId)"
              >
                <el-button
                  :disabled="value.value.Inform.InformCheckState == true"
                  class="Hover tableButtonOne mr_10"
                  type="primary"
                  slot="reference"
                  >审核</el-button
                >
              </el-popconfirm>
              <el-button
                class="Hover tableButtonTwo"
                type="primary"
                @click="selectButton(value.value)"
                >查看</el-button
              >
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否删除该条通知?"
                @confirm="DeleteInformApi(value.value.Inform.InformId)"
              >
                <el-button
                  :disabled="value.value.Inform.InformCheckState == true"
                  class="Hover tableButtonThree ml_10"
                  type="primary"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </div>
          </template>
        </cu-table>
      </div>
    </cu-animation>
    <!-- 发布通知弹框 -->
    <el-drawer
      size="50%"
      title="我是标题 :with-header='false'将不显示"
      :visible.sync="drawerVisible"
      :wrapperClosable="false"
      :with-header="false"
    >
      <div
        class="elDrawerClass"
        v-loading="loadingDrawer"
        :element-loading-text="loadingDrawerTitle"
        element-loading-spinner="el-icon-loading"
      >
        <div>
          <el-form
            :label-position="'right'"
            :model="drawerFormModel"
            :rules="drawerFormRules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发布类型" prop="InformType">
                  <el-select
                    :disabled="ifButton == '查看'"
                    v-model="drawerFormModel.InformType"
                    placeholder="请选择发布类型"
                    @change="informTypeChange($event)"
                  >
                    <el-option value="放假">放假</el-option>
                    <el-option value="任命">任命</el-option>
                    <el-option value="通知">通知</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核人" prop="InformCheckId">
                  <el-select
                    :disabled="ifButton == '查看'"
                    v-model="drawerFormModel.InformCheckId"
                    placeholder="请选择审核人"
                    filterable
                    @change="InformCheckIdChange"
                  >
                    <el-option
                      v-for="(item, index) in drawerFormModel.InformCheckIdList"
                      :key="index"
                      :value="item.User.UserId"
                      :label="item.User.Name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工号">
                  <el-input
                    :disabled="true"
                    v-model="drawerFormModel.InformCheckIdUserNum"
                    placeholder="请输入工号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" v-if="drawerFormModel.InformType == '任命'">
              <el-col :span="6">
                <el-form-item label="任命人" prop="AppointorId">
                  <el-select
                    :disabled="ifButton == '查看'"
                    v-model="drawerFormModel.AppointorId"
                    clearable
                    filterable
                    placeholder="请选择任命人"
                    @change="AppointorIdChange"
                  >
                    <el-option
                      v-for="(item, index) in drawerFormModel.AppointorIdList"
                      :key="index"
                      :value="item.User.UserId"
                      :label="item.User.Name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="工号">
                  <el-input
                    :disabled="true"
                    v-model="drawerFormModel.AppointorIdUserNum"
                    placeholder="请输入工号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="任命部门" prop="DepartmentId">
                  <el-select
                    :disabled="ifButton == '查看'"
                    v-model="drawerFormModel.DepartmentId"
                    clearable
                    filterable
                    placeholder="请选择任命部门"
                    @change="DepartmentIdChange($event)"
                  >
                    <el-option
                      v-for="(item, index) in drawerFormModel.DepartmentIdList"
                      :key="index"
                      :value="item.DepartmentId"
                      :label="item.DepartmentName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="任命职位" prop="PositionId">
                  <el-select
                    :disabled="ifButton == '查看'"
                    v-model="drawerFormModel.PositionId"
                    clearable
                    filterable
                    placeholder="请选择任命职位"
                  >
                    <el-option
                      v-for="(item, index) in drawerFormModel.PositionIdList"
                      :key="index"
                      :value="item.PositionId"
                      :label="item.PositionName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" v-if="drawerFormModel.InformType == '放假'">
              <el-col :span="12">
                <el-form-item label="放假日期" prop="HolidayList">
                  <el-date-picker
                    :disabled="ifButton == '查看'"
                    popper-class="elDatePicker"
                    v-model="drawerFormModel.HolidayList"
                    type="datetimerange"
                    style="width: 100%"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="HolidayListChange"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="放假日期" prop="FillHolidayList">
                  <el-date-picker
                    :disabled="ifButton == '查看'"
                    popper-class="elDatePicker"
                    v-model="drawerFormModel.FillHolidayList"
                    type="datetimerange"
                    style="width: 100%"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="FillHolidayListChange"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="发布主题" prop="InformName">
                  <el-input
                    :disabled="ifButton == '查看'"
                    v-model="drawerFormModel.InformName"
                    placeholder="请输入发布主题"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="发布内容">
                  <mavon-editor
                    ref="md"
                    style="min-height: 500px"
                    :subfield="ifButton == '查看' ? false : true"
                    defaultOpen="preview"
                    v-model="drawerFormModel.InformContent"
                    :toolbars="toolbars"
                  >
                    <button
                      slot="left-toolbar-before"
                      type="buttton"
                      aria-hidden="true"
                      title="颜色"
                      class="op-icon"
                      style="position: relative"
                    >
                      <i class="el-icon-s-open"></i>
                      <el-color-picker
                        v-model="color1"
                        style="opacity: 0; positon: absolute; top: 0; left: 0"
                        @change="activeChange"
                      ></el-color-picker>
                    </button>
                  </mavon-editor>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="附件上传">
                  <el-upload
                    class="upload-demo"
                    action
                    multiple
                    :http-request="UploadFileApi"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="onRemove"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="mavonEditorClass"></div>
        <div class="flex_jc">
          <el-button
            v-if="ifButton == '添加'"
            type="primary"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button type="default" @click="cancel()">返回</el-button>
        </div>
      </div>
    </el-drawer>
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
          ><div class="dialogClass flex_ac">
            <span class="dialogTitle mr_10">发布日期:</span>
            <el-date-picker
              class="dialogContent"
              v-model="selectForm.date"
              type="date"
              placeholder="请选择日期"
            >
            </el-date-picker></div
        ></el-col>
        <el-col :span="8"
          ><div class="dialogClass flex_ac">
            <span class="dialogTitle mr_10">发布主题:</span>
            <el-input
              class="dialogContent"
              v-model="selectForm.InformName"
              placeholder="请输入发布主题"
            ></el-input></div
        ></el-col>
        <el-col :span="8"
          ><div class="dialogClass flex_ac">
            <span class="dialogTitle mr_10">发布类型:</span>
            <el-input
              class="dialogContent"
              v-model="selectForm.InformType"
              placeholder="请选择发布类型"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="mb_20">
        <el-col :span="8"
          ><div class="dialogClass flex_ac">
            <span class="dialogTitle mr_10">发布人:</span>
            <el-input
              class="dialogContent"
              v-model="selectForm.inform_user_name"
              placeholder="请输入发布人"
            ></el-input></div
        ></el-col>
        <el-col :span="8"
          ><div class="dialogClass flex_ac">
            <span class="dialogTitle mr_10">发布人部门:</span>
            <el-input
              class="dialogContent"
              v-model="selectForm.inform_user_department"
              placeholder="请输入发布人部门"
            ></el-input></div
        ></el-col>
      </el-row>
    </cu-dialog>
  </div>
</template>

<script>
import {
  SelectInform,
  SelectUserInform,
  InsertInform,
  CheckInform,
  DeleteInform,
  InsertInformRead,
} from "@/api/erpApi/noticeApi";
import {
  SelectUser,
  SelectModuleCheck,
  SelectDepartment,
  SelectPosition,
  UploadFile,
  DownloadFile,
} from "@/api/erpApi/userApi";

import marked from "marked";
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
          title: "主题",
          slot: "InformName",
          align: "center",
        },
        {
          title: "通知类型",
          slot: "InformType",
          width: "80",
          align: "center",
        },
        {
          title: "发布人姓名",
          key: "inform_user_name",
          width: "120",
          align: "center",
        },
        {
          title: "发布人部门",
          key: "inform_user_department",
          width: "120",
          align: "center",
        },
        {
          title: "发布人职位",
          key: "inform_user_position",
          align: "center",
          width: "120",
        },
        {
          title: "发布时间",
          slot: "InformTime",
          align: "center",
          width: "100",
        },
        {
          title: "审核人",
          key: "check_user_name",
          width: "120",
          align: "center",
        },
        {
          title: "审核人部门 ",
          key: "check_user_department",
          width: "120",
          align: "center",
        },
        {
          title: "审核人职位",
          key: "check_user_position",
          align: "center",
          width: "120",
        },
        {
          title: "状态",
          slot: "InformCheckState",
          width: "120",
          align: "center",
        },
        {
          title: "操作",
          slot: "cz",
          width: "240",
          align: "center",
        },
      ],
      // 表内容
      tableData: [],
      total: 0,
      pageindex: 1,
      pageSize: 10,
      selectVisible: false, //过滤查询弹框
      selectForm: {
        //过滤查询字段
        InformName: "", // 发布主题
        InformType: "", // 发布类型
        date: "", // 发布日期
        inform_user_name: "", // 发布人
        inform_user_department: "", // 发布人部门
      },
      color1: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        // superscript: true, // 上角标
        // subscript: true, // 下角标
        // quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        // link: true, // 链接
        // imagelink: true, // 图片链接
        // code: true, // code
        // table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      // 发布通知弹框
      drawerVisible: false,
      drawerFormModel: {
        InformName: "", //发布主题
        InformType: "", //发布类型
        InformCheckId: "", //	审核人ID
        InformCheckIdList: [], //审核人列表
        InformCheckIdUserNum: "", //审核人工号
        AppointorId: "", //任命人ID
        AppointorIdList: [], //任命人列表
        AppointorIdUserNum: "", //任命人工号
        DepartmentId: "", //部门id
        DepartmentIdList: [], //部门列表
        PositionId: "", //	职位ID
        PositionIdList: [], //	职位列表
        InformContent: "", //	发布内容
        InformAccessory: "", //	附件名称
        Holiday: "", //放假日期
        HolidayList: "", //放假日期列表
        FillHoliday: "", //补班日期
        FillHolidayList: "", //补班日期列表
        InformAccessoryPath: "", //	附件路径
      },

      // 发布通知表单验证规则
      drawerFormRules: {},

      loading: false,
      loadingTitle: "加载中，请稍后...",
      ifButton: "查看",
      loadingDrawer: false,
      loadingDrawerTitle: "加载中，请稍后...",
    };
  },
  mounted() {
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };

    this.SelectInformApi(); //查询通知-接口
    this.SelectUserApi(); //查询用户-接口（任命人列表使用）
    this.SelectModuleCheckApi(); //查询模块审核人-接口
    this.SelectDepartmentApi(); //查询部门-接口
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
    // 查询通知-接口
    SelectInformApi() {
      this.loading = true;
      this.loadingTitle = "加载中，请稍后...";
      let valueData = {
        Header: {
          pageIndex: this.pageindex,
          pageSize: this.pageSize,
        },
        Body: {
          Inform: {
            InformName: this.selectForm.InformName, //发布主题
            InformType: this.selectForm.InformType, //发布类型
          },
          date: this.selectForm.date, //发布日期
          inform_user_name: this.selectForm.inform_user_name, //发布人
          inform_user_department: this.selectForm.inform_user_department, //发布人部门
        },
      };
      SelectInform(valueData)
        .then((res) => {
          this.loading = false;
          if (res.Code == 1) {
            this.tableData = res.Data;
            this.total = res.Total;
            this.handleHeight(); // 根据浏览器大小计算表格高度
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    // 查询用户通知-接口
    SelectUserInformApi() {
      let valueData = {};
      SelectUserInform(valueData)
        .then((res) => {
          if (res.Code == 1) {
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 发布通知-接口
    InsertInformApi(valueData) {
      this.loading = true;
      this.loadingTitle = "加载中，请稍后...";
      InsertInform(valueData)
        .then((res) => {
          this.loading = false;
          if (res.Code == 1) {
            this.cancel(); // 重置发布通知
            this.$message.success(res.Msg);
            this.SelectInformApi(); // 查询通知-接口
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    // 审核通知-接口
    CheckInformApi(valueId) {
      this.loading = true;
      this.loadingTitle = "加载中，请稍后...";
      let valueData = {
        Body: {
          Inform: {
            InformId: valueId,
          },
        },
      };
      CheckInform(valueData)
        .then((res) => {
          this.loading = false;
          if (res.Code == 1) {
            this.$message.success(res.Msg);
            this.SelectInformApi(); // 查询通知-接口
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    // 删除通知-接口
    DeleteInformApi(valueId) {
      this.loading = true;
      this.loadingTitle = "加载中，请稍后...";
      let valueData = {
        Body: {
          Inform: {
            InformId: valueId,
          },
        },
      };
      DeleteInform(valueData)
        .then((res) => {
          this.loading = false;
          if (res.Code == 1) {
            this.$message.success(res.Msg);
            this.SelectInformApi(); // 查询通知-接口
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    // 查询用户-接口
    SelectUserApi() {
      let valueData = {
        Body: {
          //入职日期
          adddate: "",
          //部门
          department_name: "",
          //职位
          position_name: "",
          //是否在职
          is_state: "",
          User: {
            //性名
            Name: "",
            //姓别
            Gender: "",
            //雇员类型
            EmployeeState: "",
          },
        },
        Header: {
          pageIndex: 1,
          pageSize: 100000, //后台要求写死
        },
      };
      SelectUser(valueData)
        .then((res) => {
          this.drawerFormModel.AppointorIdList = [];
          if (res.Code == 1) {
            this.drawerFormModel.AppointorIdList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询部门-接口
    SelectDepartmentApi() {
      SelectDepartment()
        .then((res) => {
          this.drawerFormModel.DepartmentIdList = [];
          if (res.Code == 1) {
            this.drawerFormModel.DepartmentIdList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询职位-接口
    SelectPositionApi(DepartmentId) {
      let valueData = {
        Body: {
          department_id: DepartmentId, //部门ID
        },
      };
      SelectPosition(valueData)
        .then((res) => {
          this.drawerFormModel.PositionIdList = [];
          if (res.Code == 1) {
            this.drawerFormModel.PositionIdList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //查询模块审核人-接口
    SelectModuleCheckApi() {
      let valueData = {
        Body: {
          ModuleName: "发布通知",
        },
      };
      SelectModuleCheck(valueData)
        .then((res) => {
          this.drawerFormModel.InformCheckIdList = [];
          if (res.Code == 1) {
            this.drawerFormModel.InformCheckIdList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 通知已读-接口
    InsertInformReadApi() {
      let valueData = {};
      InsertInformRead(valueData)
        .then((res) => {
          if (res.Code == 1) {
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 上传文件-接口
    UploadFileApi(itemData) {
      this.loadingDrawer = true;
      this.loadingDrawerTitle = "附件上传中，请稍后...";
      let FormDatas = new FormData(); //上传文件的需要formdata类型;所以要转
      FormDatas.append("formFile", itemData.file);
      FormDatas.append("FileName", itemData.file.name);
      UploadFile(FormDatas)
        .then((res) => {
          this.loadingDrawer = false;
          if (res.Code == 1) {
            this.$message.success(res.Msg);
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loadingDrawer = false;
          console.log(error);
        });
    },
    // 过滤查询弹框-取消
    selectHandleClose() {
      this.selectVisible = false;
    },
    // 过滤查询弹框-确定
    selectHandleOk() {
      this.pageindex = 1;
      this.SelectInformApi();
    },
    ceshi(value) {
      this.$message.success(value);
    },
    // 分页-页大小改变回调
    handleSizeChange(val) {
      this.pageindex = 1;
      this.pageSize = val;
      this.SelectInformApi();
    },
    // 分页-页码改变回调
    handleCurrentChange(val) {
      this.pageindex = val;
      this.SelectInformApi();
    },

    // 表单验证
    submitForm(formName) {
      if (!this.drawerFormModel.InformType) {
        this.$message.info("发布类型不能为空");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.drawerFormModel.InformContent) {
            this.$message.info("发布内容不能为空");
            return;
          }
          let valueData = {
            Body: {
              Inform: {
                InformName: this.drawerFormModel.InformName, //	发布主题
                InformType: this.drawerFormModel.InformType, //	发布类型
                InformCheckId: Number(this.drawerFormModel.InformCheckId), //	审核人ID
                InformContent: this.drawerFormModel.InformContent, //	发布内容
                InformAccessory: this.drawerFormModel.InformAccessory, //	附件名称
                Holiday: this.drawerFormModel.Holiday, //	放假日期
                FillHoliday: this.drawerFormModel.FillHoliday, //	补班日期
                AppointorId: Number(this.drawerFormModel.AppointorId), //任命人ID
                PositionId: Number(this.drawerFormModel.PositionId), //职位ID
                InformAccessoryPath: this.drawerFormModel.InformAccessoryPath, //	附件路径
              },
            },
          };
          this.InsertInformApi(valueData);
        } else {
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 重置发布通知
    cancel() {
      this.drawerVisible = false;
      this.resetForm("ruleForm"); //重置表单验证
      this.drawerFormRules = {};
      this.drawerFormModel.InformName = ""; //发布主题
      this.drawerFormModel.InformType = ""; //发布类型
      this.drawerFormModel.InformCheckId = ""; //	审核人ID
      this.drawerFormModel.InformCheckIdUserNum = ""; //审核人工号
      this.drawerFormModel.AppointorId = ""; //任命人ID
      this.drawerFormModel.AppointorIdUserNum = ""; //任命人工号
      this.drawerFormModel.DepartmentId = ""; //部门id
      this.drawerFormModel.PositionId = ""; //	职位ID
      this.drawerFormModel.InformContent = ""; //	发布内容
      this.drawerFormModel.InformAccessory = ""; //	附件名称
      this.drawerFormModel.Holiday = ""; //放假日期
      this.drawerFormModel.HolidayList = ""; //放假日期列表
      this.drawerFormModel.FillHoliday = ""; //补班日期
      this.drawerFormModel.FillHolidayList = ""; //补班日期列表
      this.drawerFormModel.InformAccessoryPath = ""; //	附件路径
    },
    // 发布通知按钮
    addButton() {
      this.drawerVisible = true;
      this.ifButton = "添加";
    },
    // 查看按钮
    selectButton(value) {
      this.drawerVisible = true;
      this.ifButton = "查看";
      this.drawerFormModel.InformName = value.Inform.InformName; //发布主题
      this.drawerFormModel.InformType = value.Inform.InformType; //发布类型
      this.drawerFormModel.InformCheckId = value.Inform.InformCheckId; //	审核人ID
      this.drawerFormModel.InformCheckIdUserNum = value.check_user_num; //审核人工号
      this.drawerFormModel.AppointorId = value.Inform.InformId; //任命人ID
      this.drawerFormModel.AppointorIdUserNum = value.inform_user_num; //任命人工号

      this.drawerFormModel.InformContent = value.Inform.InformContent; //	发布内容
      this.drawerFormModel.Holiday = value.Inform.Holiday; //放假日期
      if (this.drawerFormModel.Holiday) {
        this.drawerFormModel.HolidayList = [
          this.drawerFormModel.Holiday.substr(
            0,
            this.drawerFormModel.Holiday.indexOf(";")
          ),
          this.drawerFormModel.Holiday.substr(
            this.drawerFormModel.Holiday.indexOf(";") + 1
          ),
        ]; //放假日期列表
      }

      this.drawerFormModel.FillHoliday = value.Inform.FillHoliday; //补班日期
      if (this.drawerFormModel.FillHoliday) {
        this.drawerFormModel.FillHolidayList = [
          this.drawerFormModel.FillHoliday.substr(
            0,
            this.drawerFormModel.FillHoliday.indexOf(";")
          ),
          this.drawerFormModel.FillHoliday.substr(
            this.drawerFormModel.FillHoliday.indexOf(";") + 1
          ),
        ]; //补班日期列表
      }

      this.drawerFormModel.DepartmentId = value.department_id; //部门id
      this.SelectPositionApi(this.drawerFormModel.DepartmentId);

      this.drawerFormModel.PositionId = value.Inform.PositionId; //	职位ID
      // this.drawerFormModel.InformAccessory = value.; //	附件名称
      // this.drawerFormModel.InformAccessoryPath = value.; //	附件路径
    },
    // 发布通知弹框-发布类型改变回调
    informTypeChange(value) {
      if (value == "放假") {
        this.drawerFormRules = {
          InformType: [
            { required: true, message: "请输入发布类型", trigger: "change" },
          ],
          InformCheckId: [
            { required: true, message: "请输入审核人ID", trigger: "change" },
          ],
          HolidayList: [
            { required: true, message: "请输入审核人ID", trigger: "change" },
          ],
          FillHolidayList: [
            { required: true, message: "请输入审核人ID", trigger: "blur" },
          ],
          InformName: [
            { required: true, message: "请输入发布主题", trigger: "blur" },
          ],
        };
      } else if (value == "任命") {
        this.drawerFormRules = {
          InformType: [
            { required: true, message: "请输入发布类型", trigger: "change" },
          ],
          InformCheckId: [
            { required: true, message: "请输入审核人ID", trigger: "change" },
          ],
          InformName: [
            { required: true, message: "请输入发布主题", trigger: "blur" },
          ],

          AppointorId: [
            { required: true, message: "请选择任命人", trigger: "change" },
          ],
          DepartmentId: [
            { required: true, message: "请选择任命部门", trigger: "change" },
          ],
          PositionId: [
            { required: true, message: "请选择任命职位", trigger: "change" },
          ],
        };
      } else if (value == "通知") {
        this.drawerFormRules = {
          InformType: [
            { required: true, message: "请输入发布类型", trigger: "change" },
          ],
          InformCheckId: [
            { required: true, message: "请输入审核人ID", trigger: "blur" },
          ],
          InformName: [
            { required: true, message: "请输入发布主题", trigger: "blur" },
          ],
        };
      }
    },
    // 发布通知弹框-审核人改变回调
    InformCheckIdChange(InformCheckId) {
      this.drawerFormModel.InformCheckIdList.forEach((element) => {
        if (element.User.UserId == InformCheckId) {
          this.drawerFormModel.InformCheckIdUserNum = element.User.UserNum;
        }
      });
    },
    // 发布通知弹框-任命人改变回调
    AppointorIdChange(AppointorId) {
      this.drawerFormModel.AppointorIdList.forEach((element) => {
        if (element.User.UserId == AppointorId) {
          this.drawerFormModel.AppointorIdUserNum = element.User.UserNum;
        }
      });
    },
    // 发布通知弹框-任命部门改变回调
    DepartmentIdChange(valueId) {
      this.drawerFormModel.PositionId = ""; //清空原来职位信息
      this.SelectPositionApi(valueId);
    },
    // 发布通知弹框-放假日期改变回调
    HolidayListChange(valueData) {
      if (valueData != null) {
        this.drawerFormModel.Holiday = valueData[0] + ";" + valueData[1];
      }
    },
    // 发布通知弹框-补班日期改变回调
    FillHolidayListChange(valueData) {
      if (valueData != null) {
        this.drawerFormModel.FillHoliday = valueData[0] + ";" + valueData[1];
      }
    },
    activeChange(e) {
      //点击颜色选择器，给富文本内压入一段自定义代码
      const insert_text = {
        prefix: ``,
        subfix: "",
        str: "",
      };
      const $vm = this.$refs.md;
      $vm.insertText($vm.getTextareaDom(), insert_text);

      let textarea = document.getElementsByClassName("auto-textarea-input")[0];
      let posStart = textarea.selectionStart;
      let posEnd = textarea.selectionEnd;
      // let posScroll = document.getElementsByClassName("v-note-edit")[0].scrollTop;
      // 获取文本域中未选中的的前半部分和后半部分，以被选中内容起始和结束位置做分割点
      let subStart = this.$refs.md.d_value.substring(0, posStart);
      let subCenter = this.$refs.md.d_value.substring(posStart, posEnd);
      let subEnd = this.$refs.md.d_value.substring(
        posEnd,
        this.$refs.md.d_value.length
      );
      // 拼接并替换文本域内容
      this.$refs.md.d_value =
        subStart +
        '<span style="color:' +
        e +
        ';">' +
        subCenter +
        "</span>" +
        subEnd;
    },
    // 上传文件-接口
    shangchuang(value) {
      console.log(value);
    },
    // 限定上传附件的格式以及大小
    beforeAvatarUpload(file) {
      const isPDF = file.type === "application/pdf";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPDF) {
        this.$message.error("上传的附件只能是 pdf 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的附件大小不能超过 2MB!");
      }
      return isPDF && isLt2M;
    },
    // 删除上传文件
    onRemove(file, fileList) {
      console.log("file:", file);
      console.log("fileList:", fileList);
      this.$message.success("已删除：" + file.name + "文件");
    },
  },
};
</script>

<style lang="less" scoped>
@import "./deliverAnAnnouncement.scss";
</style>
