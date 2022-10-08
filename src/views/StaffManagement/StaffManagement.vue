<template>
  <!-- 人力资源-员工管理页面 -->
  <div ref="contentBox" class="content-box">
    <!-- 员工管理-具体信息管理切换=》 员工管理-->
    <div
      v-if="!isshow"
      v-loading="loadingOne"
      :element-loading-text="loadingTitle"
      element-loading-spinner="el-icon-loading"
    >
      <cu-animation :type="'slideInRight'" :time="0.5">
        <div class="bodyTop">
          <div class="bodyTopOne">
            <div class="Onetitle">公司总人数</div>
            <div class="Onevlaue">{{ totalPeople }}</div>
          </div>
          <div class="bodyTopTwo">
            <cu-echart-pie
              v-if="educationPercentageData.length > 0"
              :idEchartPie="'idEducationPercentage'"
              :text="educationPercentageText"
              :titleLocation="educationPercentageTitleLocation"
              :valueData="educationPercentageData"
              :labelFormatter="educationPercentageLabelFormatter"
              :colors="educationPercentageColors"
              :textFontSize="'18'"
              :width="280"
              :height="124"
            ></cu-echart-pie>
          </div>

          <div class="bodyTopThree">
            <div class="bodyTopThreeTitle">性别占比</div>
            <div class="bodyTopThreeImg"></div>
            <div class="bodyTopThreeNan">{{ genderNan }}</div>
            <div class="bodyTopThreeNv">{{ genderNv }}</div>
          </div>
          <!-- 
 -->
        </div>
      </cu-animation>
      <cu-animation :type="'slideInRight'" :time="0.5">
        <div class="bodyCenter">
          <el-button
            type="primary"
            class="Hover buttonOne"
            @click="UserExcelApi"
            >导出员工数据</el-button
          >
          <el-button
            :disabled="htmlState != 2"
            type="primary"
            class="Hover buttonTwo"
            @click="drawer"
            >新建员工</el-button
          >
          <el-button
            type="primary"
            class="Hover buttonFive"
            @click="selectVisible = true"
            >过滤查询</el-button
          >
        </div>
      </cu-animation>
      <cu-animation :type="'slideInRight'" :time="0.5">
        <div class="bodyBottom">
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
            <template slot="Birthday" slot-scope="value">
              {{
                value.value.User.Birthday
                  ? new Date(value.value.User.Birthday).Format("yyyy-MM-dd")
                  : ""
              }}
            </template>
            <template slot="Phone" slot-scope="value">
              {{ value.value.User.Phone }}
            </template>
            <template slot="Addtime" slot-scope="value">
              {{
                value.value.User.Addtime
                  ? new Date(value.value.User.Addtime).Format("yyyy-MM-dd")
                  : ""
              }}
            </template>
            <template slot="EmployeeState" slot-scope="value">
              {{ value.value.User.EmployeeState }}
            </template>
            <template #IsState="value">
              <div class="spanChange">
                <span class="spanZZ" v-if="value.value.User.IsState == true">
                  在职
                </span>
                <span class="spanLZ" v-else> 离职 </span>
              </div>
            </template>
            <template slot="cz" slot-scope="value">
              <div class="tableButtonContent">
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  title="请确定是否转正改员工?"
                  @confirm="
                    UpdateUserEmployeeStateApi(value.value.User.UserId, '转正')
                  "
                >
                  <el-button
                    :disabled="
                      value.value.User.EmployeeState == '转正' || htmlState != 2
                    "
                    class="tableButton tableButtonOne"
                    type="primary"
                    slot="reference"
                    >转正</el-button
                  >
                </el-popconfirm>

                <el-button
                  class="tableButton tableButtonTwo ml_10"
                  type="primary"
                  @click="GetUserDetailsApi(value.value.User.UserId)"
                  >查看</el-button
                >
              </div>
            </template>
          </cu-table>
        </div>
      </cu-animation>
    </div>
    <!-- 员工管理-具体信息管理切换=》 具体信息管理-->
    <div
      v-else
      v-loading="loadingTwo"
      :element-loading-text="loadingTitle"
      element-loading-spinner="el-icon-loading"
    >
      <el-tabs
        v-model="activeName"
        :before-leave="isSelectOrAdd == '查看修改' ? null : beforeLeave"
        class="content-tabs"
      >
        <!-- element-loading-background="rgba(0, 0, 0, 0.8)" -->
        <el-tab-pane label="信息管理页" name="信息管理页">
          <cu-animation :type="'slideInRight'" :time="0.5">
            <div class="details">
              <div class="details_top">
                <el-form
                  :label-position="'right'"
                  :model="newStaff"
                  :rules="rulesNewStaff"
                  ref="ruleForm"
                  label-width="150px"
                  class="demo-ruleForm"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="员工ID">
                        <el-input
                          style="width: 310px"
                          disabled
                          v-model="newStaff.UserId"
                          placeholder="请输入员工ID"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="账号" prop="account">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.account"
                          placeholder="请输入账号"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="姓名" prop="name">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.name"
                          placeholder="请输入姓名"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="性别" prop="gender">
                        <el-select
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.gender"
                          clearable
                          placeholder="请选择性别"
                        >
                          <el-option value="男">男</el-option>
                          <el-option value="女">女</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="证件号" prop="id_card">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.id_card"
                          placeholder="请输入证件号"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="生日" prop="birthday">
                        <el-date-picker
                          :disabled="htmlState != 2"
                          type="date"
                          placeholder="选择生日日期"
                          v-model="newStaff.birthday"
                          style="width: 310px"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="部门" prop="department">
                        <el-select
                          :disabled="htmlState != 2"
                          v-model="newStaff.department"
                          placeholder="请选择部门"
                          @change="SelectPositionApi($event)"
                          style="width: 310px"
                        >
                          <el-option
                            v-for="(item, index) in departmentList"
                            :key="index"
                            :value="item.DepartmentId"
                            :label="item.DepartmentName"
                            style="
                              font-size: 18px;
                              line-height: 50px;
                              height: 50px;
                            "
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="职位" prop="PositionId">
                        <el-select
                          :disabled="htmlState != 2"
                          v-model="newStaff.PositionId"
                          placeholder="请选择职位"
                          style="width: 310px"
                        >
                          <el-option
                            v-for="(item, index) in positionList"
                            :key="index"
                            :value="item.PositionId"
                            :label="item.PositionName"
                            style="
                              font-size: 18px;
                              line-height: 50px;
                              height: 50px;
                            "
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="工作制" prop="WorkingSystem">
                        <el-select
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.WorkingSystem"
                          clearable
                          placeholder="请选择工作制"
                        >
                          <el-option value="标准工作制">标准工作制</el-option>
                          <el-option value="计时工作制">计时工作制</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="民族">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.ethnic"
                          placeholder="请输入民族"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="毕业学院">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.school"
                          placeholder="请输入毕业学院"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="学历">
                        <el-select
                          :disabled="htmlState != 2"
                          v-model="newStaff.education"
                          placeholder="请选择学历"
                          style="width: 310px"
                        >
                          <el-option
                            v-for="item in education"
                            :key="item.value"
                            :value="item"
                            style="
                              font-size: 18px;
                              line-height: 50px;
                              height: 50px;
                            "
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="政治面貌">
                        <el-select
                          :disabled="htmlState != 2"
                          v-model="newStaff.politics_status"
                          placeholder="请选择政治面貌"
                          style="width: 310px"
                        >
                          <el-option
                            v-for="item in politicsList"
                            :key="item.value"
                            :value="item"
                            style="
                              font-size: 18px;
                              line-height: 50px;
                              height: 50px;
                            "
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="婚否">
                        <el-select
                          :disabled="htmlState != 2"
                          v-model="newStaff.marital_status"
                          placeholder="请选择婚否"
                          style="width: 310px"
                        >
                          <el-option
                            value="已婚"
                            style="
                              font-size: 18px;
                              line-height: 50px;
                              height: 50px;
                            "
                          >
                          </el-option>
                          <el-option
                            value="未婚"
                            style="
                              font-size: 18px;
                              line-height: 50px;
                              height: 50px;
                            "
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="联系方式">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.phone"
                          placeholder="请输入联系方式"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="电子邮箱">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.mail"
                          placeholder="请输入电子邮箱"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="紧急联系人">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.emergency_name"
                          placeholder="请输入紧急联系人"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="紧急联系人电话">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 310px"
                          v-model="newStaff.emergency_phone"
                          placeholder="请输入紧急联系人电话"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="户籍地址">
                        <el-input
                          :disabled="htmlState != 2"
                          style="width: 100%"
                          v-model="newStaff.address"
                          placeholder="请输入户籍地址"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="提示">
                        <textarea
                          :disabled="htmlState != 2"
                          type="textarea"
                          style="
                            width: 750px;
                            outline: none;
                            border: 1px solid #dcdfe6;
                            border-radius: 6px;
                            height: 90px;
                            font-size: 18px;
                            padding: 10px;
                          "
                          v-model="newStaff.note"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="photo">
                  <el-upload
                    :disabled="htmlState != 2"
                    class="avatar-uploader"
                    action
                    :http-request="UploadPicturesApi"
                    :show-file-list="false"
                    :on-change="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <!-- :http-request="UploadPicturesApi" -->

                    <!-- http-request //这个是就上传文件的方法，把上传的接口写在这个方法里 action要写，不要-->
                    <div v-if="imageUrl">
                      <img
                        :src="imageUrl"
                        class="avatar"
                        style="
                          width: auto;
                          height: auto;
                          max-width: 178px;
                          max-height: 178px;
                          object-fit: cover;
                        "
                      />
                    </div>

                    <div v-else>
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p style="color: #8c939d; margin: 8px 14px">
                        图片大小不能超过 2MB
                      </p>
                    </div>
                  </el-upload>

                  <div class="password">
                    <el-button
                      :disabled="htmlState != 2"
                      type="primary"
                      @click="passwordVisible = true"
                      >修改密码</el-button
                    >
                    <div class="InputCheck">
                      <input
                        :disabled="htmlState != 2"
                        class="checkbox"
                        type="checkbox"
                        v-model="newStaff.IsState"
                      />离职停用
                    </div>
                  </div>
                </div>
              </div>
              <!-- 保存取消按钮 -->
              <div class="bottomButton">
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >下一步</el-button
                >
                <el-button @click="cancel">取消</el-button>
              </div>
            </div>
          </cu-animation>
        </el-tab-pane>
        <el-tab-pane label="权限管理页" name="权限管理页">
          <cu-animation :type="'slideInRight'" :time="0.5">
            <div class="jurisdictions">
              <div class="jurisdictionsTitle">快速选择标签权限</div>
              <el-tag
                v-for="tag in dynamicTags"
                :key="tag.RoleName"
                closable
                :effect="tag == tagStatus ? 'light' : 'plain'"
                :type="tag == tagStatus ? '' : 'info'"
                style="color: #606266"
                :disable-transitions="false"
                @close="htmlState != 2 ? null : DeleteRoleApi(tag)"
                @click="htmlState != 2 ? null : clickTag(tag)"
              >
                {{ tag.RoleName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="htmlState != 2 ? null : handleInputConfirm"
                @blur="htmlState != 2 ? null : handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                :disabled="htmlState != 2"
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ 添加快速选择标签</el-button
              >

              <hr style="margin-top: 10px" />
              <p style="font-size: 20px; margin: 10px 0">自定义权限</p>
              <div class="authorityManagement_form">
                <div class="authorityManagement_form_title">
                  <div class="authorityManagement_form_titleItem">序号</div>
                  <div class="authorityManagement_form_titleItem">名称</div>
                  <div class="authorityManagement_form_titleItem">权限状态</div>
                  <div
                    class="authorityManagement_form_titleItem"
                    @click="htmlState != 2 ? null : clickAllChange(0)"
                  >
                    禁止访问
                  </div>
                  <div
                    class="authorityManagement_form_titleItem"
                    @click="htmlState != 2 ? null : clickAllChange(1)"
                  >
                    可查看
                  </div>
                  <div
                    class="authorityManagement_form_titleItem"
                    @click="htmlState != 2 ? null : clickAllChange(2)"
                  >
                    可修改
                  </div>
                  <div
                    class="authorityManagement_form_titleItem"
                    @click="htmlState != 2 ? null : clickAllChange(3)"
                  >
                    审核权限
                  </div>
                </div>
                <div
                  class="authorityManagement_form_data"
                  :style="
                    40 * authorityManagement.length <
                    authorityManagement_form_dataHeight
                      ? {
                          height: 40 * authorityManagement.length + 'px',
                        }
                      : { height: authorityManagement_form_dataHeight + 'px' }
                  "
                >
                  <div
                    class="authorityManagement_form_dataItem"
                    v-for="(item, index) in authorityManagement"
                    :key="item + index"
                  >
                    <div class="authorityManagement_form_dataItemDiv">
                      {{ index + 1 }}
                    </div>
                    <div class="authorityManagement_form_dataItemDiv">
                      {{ item.name }}
                    </div>
                    <div
                      class="authorityManagement_form_dataItemDiv"
                      :style="{
                        color:
                          item.State == 0
                            ? '#F27042'
                            : item.State == 1
                            ? '#FFBD5E'
                            : item.State == 2
                            ? '#4CB3FB'
                            : null,
                      }"
                    >
                      {{
                        item.State == 0
                          ? "禁止访问"
                          : item.State == 1
                          ? "可查看"
                          : item.State == 2
                          ? "可修改"
                          : item.State
                      }}
                    </div>
                    <div class="authorityManagement_form_dataItemDiv">
                      <el-checkbox
                        :disabled="htmlState != 2"
                        v-model="item.NoAccess"
                        @change="checkboxChange(index, 0)"
                      ></el-checkbox>
                    </div>
                    <div class="authorityManagement_form_dataItemDiv">
                      <el-checkbox
                        :disabled="htmlState != 2"
                        v-model="item.viewable"
                        @change="checkboxChange(index, 1)"
                      ></el-checkbox>
                    </div>
                    <div class="authorityManagement_form_dataItemDiv">
                      <el-checkbox
                        :disabled="htmlState != 2"
                        v-model="item.canBeModified"
                        @change="checkboxChange(index, 2)"
                      ></el-checkbox>
                    </div>
                    <div class="authorityManagement_form_dataItemDiv">
                      <el-checkbox
                        :disabled="htmlState != 2"
                        v-model="item.CheckState"
                      ></el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottomButtonRight">
                <el-button
                  v-if="isSelectOrAdd == '添加'"
                  type="primary"
                  @click="InsertUserApi()"
                  >保存</el-button
                >
                <el-button
                  :disabled="htmlState != 2"
                  v-if="isSelectOrAdd == '查看修改'"
                  type="primary"
                  @click="UpdateUserApi()"
                  >确认修改</el-button
                >
                <el-button @click="cancel">取消</el-button>
              </div>
            </div>
          </cu-animation>
        </el-tab-pane>
      </el-tabs>
    </div>

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

    <!-- 修改密码弹框 -->
    <cu-dialog
      title="修改密码"
      :showClose="true"
      top="20vh"
      width="400px"
      :visible="passwordVisible"
      @handleClose="passwordHandleClose()"
      @handleOk="passwordHandleOk()"
    >
      <div class="passwordDialog">
        <span class="mr_10">新密码:</span>
        <el-input
          style="width: 200px"
          placeholder="请输入密码"
          v-model="newStaff.Password"
          show-password
        ></el-input>
      </div>

      <div class="passwordDialog mt_10">
        <span class="mr_10">确认新密码:</span>
        <el-input
          style="width: 200px"
          placeholder="请输入密码"
          v-model="newStaff.confirm_Password"
          show-password
        ></el-input>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  SelectUser,
  GetUserDetails,
  UserExcel,
  UploadPictures,
  InsertUser,
  UpdateUser,
  GetEducationProportion,
  GetGenderProportion,
  SelectDepartment,
  SelectPosition,
  LoadingPhoto,
  UpdateUserEmployeeState,
} from "@/api/erpApi/userApi";
import {
  SelectRole,
  SelectModule,
  DeleteRole,
  InsertRole,
  GetRoleDetails,
} from "@/api/erpApi/jurisdictionApi";
import axios from "axios";
export default {
  data() {
    return {
      htmlState: 0, //页面权限（0禁止，1查看，2修改）
      tableHeight: 0, //表格高度
      authorityManagement_form_dataHeight: 500, //自定义权限表内容高度
      loadingOne: false, //加载中 true 或 false
      loadingTwo: false, //加载中 true 或 false
      loadingTitle: "加载中，请稍后",
      totalPeople: 0, // 公司总人数
      // 学历占比饼图-标题
      educationPercentageText: "学位占比",
      // 学历占比饼图-标题定位：上 右 下 左 [null,null,null,center]
      educationPercentageTitleLocation: ["center", "28", null, null],
      // 学历占比饼图-数据
      educationPercentageData: [],
      // 学历占比饼图-颜色
      educationPercentageColors: [
        "#1DD19B",
        "#FFA728",
        "#109AF9",
        "#2400FF",
        "#F05C27",
      ],
      // 学历占比饼图-单位（人、位、个、箱......）
      educationPercentageLabelFormatter: "{b|{b}}:{c|{c}} 人\n\n",
      genderNan: "0%", // 性别占比-男
      genderNv: "0%", // 性别占比-女
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
          width: "80",
          align: "center",
        },
        {
          title: "性别",
          slot: "Gender",
          width: "120",
          align: "center",
        },
        {
          title: "生日",
          slot: "Birthday",
          width: "120",
          align: "center",
        },
        {
          title: "部门",
          key: "Department",
          width: "120",
          align: "center",
        },
        {
          title: "职位",
          key: "Position",
          width: "120",
          align: "center",
        },
        {
          title: "联系方式",
          slot: "Phone",
          width: "200",
          align: "center",
        },
        {
          title: "入职时间",
          slot: "Addtime",
          width: "120",
          align: "center",
        },
        {
          title: "雇员类型",
          slot: "EmployeeState",
          width: "120",
          align: "center",
        },
        {
          title: "状态",
          slot: "IsState",
          width: "120",
          align: "center",
        },
        {
          title: "操作",
          slot: "cz",
          align: "center",
        },
      ],
      // 表内容
      tableData: [],
      isshow: false, //员工管理-具体信息管理切换 false员工管理 true具体信息管理
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
      activeName: "信息管理页", //具体信息管理的默认页
      isSelectOrAdd: "添加", // 辨别哪个打开的弹框两个值：查看修改  添加
      departmentList: [], //部门数据
      positionList: [], //职位数据
      politicsList: ["群众", "共青团员", "中共党员"], //政治面貌数据
      education: ["专科以下", "专科", "本科", "研究生"], //学历数据

      isON: true, // 禁用开关
      imageUrl: "", //选择照片
      newStaff: {
        account: "", // 员工账号
        name: "", // 员工姓名
        gender: "", // 员工性别
        birthday: "", // 员工生日
        id_card: "", // 员工证件号
        politics_status: "", // 员工政治面貌
        ethnic: "", // 员工民族
        WorkingSystem: "", // WorkingSystem工作制
        marital_status: "", // 员工婚否
        phone: "", // 员工联系方式
        mail: "", // 员工电子邮箱
        emergency_name: "", // 员工紧急联系人
        emergency_phone: "", // 员工紧急联系人电话
        address: "", // 员工户籍地址
        note: "", // 员工备注
        department: "", // 员工部门
        PositionId: "", // 员工职位Id
        school: "", // 员工毕业学校
        education: "", // 员工学历
        UserId: "自动生成", //员工ID
        photo: "", //员工照片
        Password: "", //新密码
        confirm_Password: "", //确认新密码
        IsState: false, //离职停用 false为停用
      }, //新建员工信息
      // 新建员工表单验证规则
      rulesNewStaff: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        id_card: [
          { required: true, message: "请输入证件号", trigger: "change" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],
        PositionId: [
          { required: true, message: "请选择职业", trigger: "change" },
        ],
        WorkingSystem: [
          { required: true, message: "请输入工作制", trigger: "change" },
        ],
      },
      passwordVisible: false, //修改密码弹框
      total: 0,
      // 自定义权限-使用
      authorityManagement: [
        {
          ModuleId: "1",
          State: 0,
          name: "员工管理",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "2",
          State: 0,
          name: "考勤管理",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "3",
          State: 0,
          name: "资产管理",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "4",
          State: 0,
          name: "订单生成",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "5",
          State: 0,
          name: "订单归档",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "6",
          State: 0,
          name: "订单变更",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "7",
          State: 0,
          name: "联络函",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "8",
          State: 0,
          name: "印章申请",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "9",
          State: 0,
          name: "访客记录",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "10",
          State: 0,
          name: "被访人列表",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "11",
          State: 0,
          name: "角色管理",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
        {
          ModuleId: "12",
          State: 0,
          name: "设备配置",
          NoAccess: true,
          viewable: false,
          canBeModified: false,
          CheckState: false,
        },
      ],
      // 快速选择标签权限-使用
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      tagStatus: -1, // // 快速选择标签权限-选中状态使用
    };
  },
  mounted() {
    this.htmlState = this.$cu.menuHandle("员工管理"); //获取页面状态信息
    setTimeout(() => {
      this.handleHeight(); //自动获取高度
    }, 500);
    window.onresize = () => {
      this.handleHeight(); //自动获取高度
    };
    this.SelectUserApi(); // 查询用户-接口
    this.GetEducationProportionApi(); // 学历占比-接口
    this.GetGenderProportionApi(); // 性别占比-接口
    this.SelectDepartmentApi(); // 查询部门-接口
  },
  methods: {
    //自动获取高度
    handleHeight() {
      this.tableHeight =
        this.$refs.contentBox.offsetHeight - 124 - 30 - 40 - 147;
      this.authorityManagement_form_dataHeight =
        this.$refs.contentBox.offsetHeight - 338;
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
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 用户详情-接口
    GetUserDetailsApi(UserId) {
      this.loadingOne = true;
      this.loadingTitle = "加载详情数据中，请稍后...";
      let valueData = {
        Body: {
          User: {
            UserId: UserId,
          },
        },
      };
      GetUserDetails(valueData)
        .then((res) => {
          this.loadingOne = false;
          if (res.Code == 1) {
            this.isshow = true;
            this.activeName = "信息管理页"; //具体信息管理的默认页
            this.isSelectOrAdd = "查看修改";
            this.SelectRoleApi(); // 查询角色模板-接口
            // 信息管理页赋值
            this.assignment(res.Data);
            // 权限管理页赋值
            this.authorityManagement = this.selectGetRoleDetailsDataProcessing(
              res.Data.Modules
            );
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loadingOne = false;
          console.log(error);
        });
    },
    // 学历占比-接口
    GetEducationProportionApi() {
      GetEducationProportion()
        .then((res) => {
          if (res.Code == 1) {
            this.educationPercentageData = [];
            res.Data.forEach((element) => {
              element.name = element.Name;
              element.value = element.Number;
            });
            this.educationPercentageData = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 性别占比-接口
    GetGenderProportionApi() {
      GetGenderProportion()
        .then((res) => {
          if (res.Code == 1) {
            this.genderNan = res.Data[0].Proportion;
            this.genderNv = res.Data[1].Proportion;
            this.totalPeople = res.Data[0].Number + res.Data[1].Number;
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
          if (res.Code == 1) {
            this.departmentList = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询职位-接口
    SelectPositionApi(department_id, PositionId) {
      let valueData = {
        Body: {
          department_id: department_id, //部门ID
        },
      };
      SelectPosition(valueData)
        .then((res) => {
          if (res.Code == 1) {
            this.newStaff.PositionId = ""; //清空原来职位信息
            this.positionList = res.Data;
            if (PositionId) {
              this.newStaff.PositionId = PositionId; // 查看修改使用-员工职位Id
            }
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 上传照片-接口
    UploadPicturesApi(itemData) {
      this.loadingTwo = true;
      this.loadingTitle = "上传中，请稍后...";
      let FormDatas = new FormData(); //上传文件的需要formdata类型;所以要转
      FormDatas.append("formFile", itemData.file);
      FormDatas.append("FileName", itemData.file.name);
      UploadPictures(FormDatas)
        .then((res) => {
          this.loadingTwo = false;
          if (res.Code > 0) {
            this.newStaff.photo = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loadingTwo = false;
          console.log(error);
        });
    },
    // 导出用户信息-接口
    UserExcelApi() {
      this.loadingOne = true;
      this.loadingTitle = "导出中，请稍后...";
      UserExcel()
        .then((res) => {
          this.loadingOne = false;
          var name = res.headers["content-disposition"]; //获取文件名，（后台返回的文件名在响应头当中）
          name = decodeURIComponent(name); //由于中文通常都是乱码，所以需要解码
          if (name == "undefined") {
            name = "员工信息";
          } else {
            name = name.substring(name.indexOf("UTF-8''") + 7); //数据处理获得名字
          }
          this.downloadFile(res.data, name); //数据流都存在data中
        })
        .catch((error) => {
          this.loadingOne = false;
          console.log(error);
        });
    },
    // 添加用户-接口
    InsertUserApi() {
      let valueData = {
        Body: {
          User: {
            Account: this.newStaff.account, //	账号
            Name: this.newStaff.name, //	姓名
            Gender: this.newStaff.gender, //	性别
            Birthday: new Date(this.newStaff.birthday).Format("yyyy-MM-dd"), //	生日
            IdCard: this.newStaff.id_card, //	身份证号码
            PoliticsStatus: this.newStaff.politics_status, //	政治面貌
            Ethnic: this.newStaff.ethnic, //	名族
            WorkingSystem: this.newStaff.WorkingSystem, //	籍贯
            MaritalStatus: this.newStaff.marital_status, //	婚否
            Phone: this.newStaff.phone, //	联系方式
            Mail: this.newStaff.mail, //	电子邮箱
            EmergencyName: this.newStaff.emergency_name, //	紧急联系人
            EmergencyPhone: this.newStaff.emergency_phone, //	紧急联系电话
            Address: this.newStaff.address, //	户籍地址
            Note: this.newStaff.note, // 备注
            Department: this.newStaff.department, //	部门
            PositionId: this.newStaff.PositionId, //	职位
            School: this.newStaff.school, //	毕业学校
            Education: this.newStaff.education, //	学历
            Photo: this.newStaff.photo, //员工照片
            Password: this.newStaff.Password, //修改密码
            IsState: this.newStaff.IsState == false ? true : false, //离职停用 false为离职
          },
          Modules: this.tianjiachuli(this.authorityManagement),
        },
      };
      InsertUser(valueData)
        .then((res) => {
          if (res.Code > 0) {
            this.$message.success(res.Msg);
            this.pageindex = 1;
            this.SelectUserApi(); //查询用户-接口
            this.cancel(); // 重置新建员工模块
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tianjiachuli(valueData) {
      // Modules.ModuleId   //模块ID
      // Modules.State      //权限（0为禁止、1为只读、2为读写）
      // Modules.CheckState //审核权限
      // 将数据处理成后台只要的三个东西
      let data = [];
      valueData.forEach((element) => {
        let item = {};
        item.ModuleId = Number(element.ModuleId);
        item.State = Number(element.State);
        item.CheckState = Boolean(element.CheckState);
        data.push(item);
      });

      return data;
    },
    // 修改用户-接口
    UpdateUserApi() {
      let valueData = {
        Body: {
          User: {
            UserId: this.newStaff.UserId,
            Account: this.newStaff.account, //	账号
            Name: this.newStaff.name, //	姓名
            Gender: this.newStaff.gender, //	性别
            Birthday: new Date(this.newStaff.birthday).Format("yyyy-MM-dd"), //	生日
            IdCard: this.newStaff.id_card, //	身份证号码
            PoliticsStatus: this.newStaff.politics_status, //	政治面貌
            Ethnic: this.newStaff.ethnic, //	名族
            WorkingSystem: this.newStaff.WorkingSystem, //	籍贯
            MaritalStatus: this.newStaff.marital_status, //	婚否
            Phone: this.newStaff.phone, //	联系方式
            Mail: this.newStaff.mail, //	电子邮箱
            EmergencyName: this.newStaff.emergency_name, //	紧急联系人
            EmergencyPhone: this.newStaff.emergency_phone, //	紧急联系电话
            Address: this.newStaff.address, //	户籍地址
            Note: this.newStaff.note, // 备注
            Department: this.newStaff.department, //	部门
            PositionId: this.newStaff.PositionId, //	职位
            School: this.newStaff.school, //	毕业学校
            Education: this.newStaff.education, //	学历
            Photo: this.newStaff.photo, //员工照片
            Password: this.newStaff.Password, //修改密码
            IsState: this.newStaff.IsState == false ? true : false, //离职停用 false为离职
          },
          Modules: this.tianjiachuli(this.authorityManagement),
        },
      };
      UpdateUser(valueData)
        .then((res) => {
          if (res.Code > 0) {
            this.$message.success(res.Msg);
            this.pageindex = 1;
            this.SelectUserApi(); //查询用户-接口
            this.cancel(); // 重置新建员工模块
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 加载照片-接口
    LoadingPhotoApi(path) {
      this.loadingTwo = true;
      this.loadingTitle = "图片加载中，请稍后...";
      LoadingPhoto(path)
        .then((res) => {
          this.loadingTwo = false;
          this.imageUrl = URL.createObjectURL(res);
        })
        .catch((error) => {
          this.loadingTwo = false;
          console.log(error);
        });
    },
    // 查询角色模板-接口
    SelectRoleApi() {
      SelectRole()
        .then((res) => {
          if (res.Code > 0) {
            this.dynamicTags = res.Data;
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询模块-接口
    SelectModuleApi() {
      SelectModule()
        .then((res) => {
          if (res.Code > 0) {
            this.authorityManagement = this.SelectModuleApiDataProcessing(
              res.Data
            );
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除角色模板-接口
    DeleteRoleApi(tag) {
      let valueData = {
        Body: {
          role_id: tag.RoleId,
        },
      };
      DeleteRole(valueData)
        .then((res) => {
          if (res.Code > 0) {
            this.$message.success(res.Msg);
            this.SelectRoleApi(); // 查询角色模板-接口
          } else {
            this.$message.error(res.Msg);
          }
          this.SelectRoleApi(); // 查询角色模板-接口
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加角色模板-接口
    InsertRoleApi() {
      let valueData = {
        Body: {
          role_id: 0,
          role_name: this.inputValue,
          Modules: this.authorityManagement,
        },
      };
      InsertRole(valueData)
        .then((res) => {
          if (res.Code > 0) {
            this.$message.success(res.Msg);
            this.SelectRoleApi(); // 查询角色模板-接口
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 角色模板详情-接口
    GetRoleDetailsApi(tag) {
      this.loadingTwo = true;
      this.loadingTitle = "加载中，请稍后...";
      let valueData = {
        Body: {
          role_id: tag.RoleId,
        },
      };
      GetRoleDetails(valueData)
        .then((res) => {
          this.loadingTwo = false;
          if (res.Code > 0) {
            this.authorityManagement = this.GetRoleDetailsDataProcessing(
              res.Data
            );
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loadingTwo = false;
        });
    },
    // 试用/转正用户-接口
    UpdateUserEmployeeStateApi(UserId, EmployeeState) {
      this.loadingOne = true;
      this.loadingTitle = "执行中，请稍后...";
      let valueData = {
        Body: {
          User: {
            UserId: UserId,
            EmployeeState: EmployeeState,
          },
        },
      };
      UpdateUserEmployeeState(valueData)
        .then((res) => {
          this.loadingOne = false;
          if (res.Code == 1) {
            this.$message.success(res.Msg);
            this.pageindex = 1;
            this.SelectUserApi(); // 查询用户-接口
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loadingOne = false;
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
      this.SelectUserApi(); // 查询用户-接口
      this.selectVisible = false;
    },
    // 修改弹框-取消
    passwordHandleClose() {
      this.newStaff.Password = "";
      this.newStaff.confirm_Password = "";
      this.passwordVisible = false;
    },
    // 修改弹框-确定
    passwordHandleOk() {
      if (
        this.newStaff.Password == "" ||
        this.newStaff.confirm_Password == ""
      ) {
        this.$message.info("请输入完成再确定");
      } else if (this.newStaff.Password == this.newStaff.confirm_Password) {
        this.passwordVisible = false;
      } else {
        this.$message.info("两次密码不一致，请重新输入");
      }
    },
    // 查询模板-数据处理
    SelectModuleApiDataProcessing(valueData) {
      valueData.forEach((element, index) => {
        element.ModuleId = element.ModuleId;
        element.name = element.ModuleName;
        element.State = 0;
        element.NoAccess = true;
        element.viewable = false;
        element.canBeModified = false;
        element.CheckState = false;
      });
      return valueData;
    },
    // 角色模板详情-数据处理
    GetRoleDetailsDataProcessing(valueData) {
      valueData.forEach((element, index) => {
        element.name = element.ModuleName;
        element.ModuleId = element.BRoleModule.ModuleId;
        element.State = element.BRoleModule.State;
        if (element.BRoleModule.State == 0) {
          element.NoAccess = true;
          element.viewable = false;
          element.canBeModified = false;
          element.CheckState = false;
        } else if (element.BRoleModule.State == 1) {
          element.NoAccess = false;
          element.viewable = true;
          element.canBeModified = false;
          element.CheckState = false;
        } else if (element.BRoleModule.State == 2) {
          element.NoAccess = false;
          element.viewable = false;
          element.canBeModified = true;
          element.CheckState = false;
        }
      });
      return valueData;
    },
    // 查看修改中-角色模板详情-数据处理
    selectGetRoleDetailsDataProcessing(valueData) {
      console.log("valueData:", valueData);
      let values = [];
      valueData.forEach((element) => {
        if (element.Module.ModulePid != 0) {
          values.push(element);
        }
      });
      console.log("values:", values);
      values.forEach((element, index) => {
        element.name = element.Module.ModuleName;
        element.ModuleId = element.Module.ModuleId;
        element.CheckState = element.CheckState;
        if (element.State == 0) {
          element.NoAccess = true;
          element.viewable = false;
          element.canBeModified = false;
        } else if (element.State == 1) {
          element.NoAccess = false;
          element.viewable = true;
          element.canBeModified = false;
        } else if (element.State == 2) {
          element.NoAccess = false;
          element.viewable = false;
          element.canBeModified = true;
        }
      });
      return values;
    },
    // 表单验证
    submitForm(formName) {
      let isTrueFalse = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.activeName = "权限管理页";
          this.SelectRoleApi(); // 查询角色模板-接口
          this.SelectModuleApi(); //查询模板-接口
        } else {
          isTrueFalse = false;
        }
      });
      return isTrueFalse;
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 新建员工显示模块
    drawer() {
      this.isshow = !this.isshow;
      this.isSelectOrAdd = "添加";
      this.activeName = "信息管理页"; //具体信息管理的默认页
    },

    // 重置新建员工模块
    cancel() {
      this.isshow = false;
      this.resetForm("ruleForm"); //重置表单验证
      this.newStaff.account = ""; // 员工账号
      this.newStaff.name = ""; // 员工姓名
      this.newStaff.gender = ""; // 员工性别
      this.newStaff.birthday = ""; // 员工生日
      this.newStaff.id_card = ""; // 员工证件号
      this.newStaff.politics_status = ""; // 员工政治面貌
      this.newStaff.ethnic = ""; // 员工民族
      this.newStaff.WorkingSystem = ""; // WorkingSystem工作制
      this.newStaff.marital_status = ""; // 员工婚否
      this.newStaff.phone = ""; // 员工联系方式
      this.newStaff.mail = ""; // 员工电子邮箱
      this.newStaff.emergency_name = ""; // 员工紧急联系人
      this.newStaff.emergency_phone = ""; // 员工紧急联系人电话
      this.newStaff.address = ""; // 员工户籍地址
      this.newStaff.note = ""; // 员工备注
      this.newStaff.department = ""; // 员工部门
      this.newStaff.PositionId = ""; // 员工职位Id
      this.newStaff.school = ""; // 员工毕业学校
      this.newStaff.education = ""; // 员工学历
      this.newStaff.UserId = "自动生成"; //员工ID
      this.newStaff.photo = ""; //员工照片
      this.imageUrl = ""; //员工照片回显路径
      this.newStaff.Password = ""; //新密码
      this.newStaff.confirm_Password = ""; //确认新密码
      this.newStaff.IsState = false; //离职停用 false为停用
    },
    // 查看修改进入 赋值
    assignment(valueData) {
      this.newStaff.account = valueData.User.Account; // 员工账号
      this.newStaff.name = valueData.User.Name; // 员工姓名
      this.newStaff.gender = valueData.User.Gender; // 员工性别
      this.newStaff.birthday = new Date(valueData.User.Birthday); // 员工生日
      this.newStaff.id_card = valueData.User.IdCard; // 员工证件号
      this.newStaff.politics_status = valueData.User.PoliticsStatus; // 员工政治面貌
      this.newStaff.ethnic = valueData.User.Ethnic; // 员工民族
      this.newStaff.WorkingSystem = valueData.User.WorkingSystem; // WorkingSystem工作制
      this.newStaff.marital_status = valueData.User.MaritalStatus; // 员工婚否
      this.newStaff.phone = valueData.User.Phone; // 员工联系方式
      this.newStaff.mail = valueData.User.Mail; // 员工电子邮箱
      this.newStaff.emergency_name = valueData.User.EmergencyName; // 员工紧急联系人
      this.newStaff.emergency_phone = valueData.User.EmergencyPhone; // 员工紧急联系人电话
      this.newStaff.address = valueData.User.Address; // 员工户籍地址
      this.newStaff.note = valueData.User.Note; // 员工备注
      this.newStaff.department = valueData.Department; // 员工部门
      this.newStaff.school = valueData.User.School; // 员工毕业学校
      this.newStaff.education = valueData.User.Education; // 员工学历
      this.newStaff.UserId = valueData.User.UserId; //员工ID
      this.newStaff.photo = valueData.User.Photo; //员工照片
      this.LoadingPhotoApi(this.newStaff.photo); // 加载照片-接口
      this.newStaff.Password = ""; //新密码
      this.newStaff.confirm_Password = ""; //确认新密码
      this.newStaff.IsState = valueData.User.IsState == false ? true : false; //离职停用 false为停用
      this.departmentList.forEach((element) => {
        if (element.DepartmentName == this.newStaff.department) {
          this.SelectPositionApi(
            element.DepartmentId,
            valueData.User.PositionId
          );
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file[file.length - 1].raw);
    },

    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
    select() {
      // 选择不同的部门，出现相对于的职位
      var that = this;
      that.newStaff.position = "";
      for (var k in that.options) {
        if (this.newStaff.department === that.options[k].label) {
          that.positions = that.options[k].son;
        }
      }
      // 如果没有选择部门，那么职位将被禁用
      if (this.newStaff.department !== "") {
        this.isON = false;
      }
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

    //文件数据流有多种类型，需自己明确好
    downloadFile(data, name) {
      const contentType = "application/vnd.ms-excel application/x-excel";
      const blob = new Blob([data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    beforeLeave() {
      return this.submitForm("ruleForm");
    },
    // 快速选择标签权限-使用-开始
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.InsertRoleApi(); // 添加角色模板-接口
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    clickTag(tag) {
      this.tagStatus = tag;
      this.GetRoleDetailsApi(tag);
    },
    // 快速选择标签权限-使用-结束

    // 自定义权限
    checkboxChange(index, type) {
      this.authorityManagement[index].State = type;
      if (this.authorityManagement[index].State == 0) {
        this.authorityManagement[index].NoAccess = true;
        this.authorityManagement[index].viewable = false;
        this.authorityManagement[index].canBeModified = false;
        this.authorityManagement[index].CheckState = false;
      } else if (this.authorityManagement[index].State == 1) {
        this.authorityManagement[index].NoAccess = false;
        this.authorityManagement[index].viewable = true;
        this.authorityManagement[index].canBeModified = false;
        this.authorityManagement[index].CheckState = false;
      } else if (this.authorityManagement[index].State == 2) {
        this.authorityManagement[index].NoAccess = false;
        this.authorityManagement[index].viewable = false;
        this.authorityManagement[index].canBeModified = true;
        this.authorityManagement[index].CheckState = false;
      }
    },
    // 表头点击 全选事件
    clickAllChange(valueIndex) {
      if (valueIndex == 0) {
        //禁止访问
        this.authorityManagement.forEach((element) => {
          element.State = 0;
          element.NoAccess = true;
          element.viewable = false;
          element.canBeModified = false;
        });
      } else if (valueIndex == 1) {
        //可查看
        this.authorityManagement.forEach((element) => {
          element.State = 1;
          element.NoAccess = false;
          element.viewable = true;
          element.canBeModified = false;
        });
      } else if (valueIndex == 2) {
        //可修改
        this.authorityManagement.forEach((element) => {
          element.State = 2;
          element.NoAccess = false;
          element.viewable = false;
          element.canBeModified = true;
        });
      } else if (valueIndex == 3) {
        this.authorityManagement.forEach((element) => {
          // 审核权限
          element.CheckState = !element.CheckState;
        });
      }
    },
    // 清空条件按钮
    selectClear() {
      this.date = null; //入职时间
    },
    // 表格转正按钮
    becomeRegularWorker() {},
    // 过滤查询按钮
    filterQueryButton() {},
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
};
</script>

<style lang="scss" scoped>
@import "./StaffManagement.scss";
</style>
