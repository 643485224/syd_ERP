<template>
  <!-- 人力资源-资产管理页面 -->
  <div ref="contentBox" class="content-box">
    <el-tabs
      v-model="activeName"
      @tab-click="tabClick($event)"
      class="content-tabs"
    >
      <!-- 资产库存列表 -->
      <el-tab-pane label="资产库存列表" name="资产库存列表">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="content_One">
            <div class="buttonList">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出列表</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >物品添加</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonThree"
                @click="transferPostButton"
                >数量添加</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonFour"
                @click="transferPostButton"
                >过滤查询</el-button
              >
            </div>
            <div class="tableBox">
              <cu-table
                :height="tableHeight"
                :tableHeader="tableHeaderZCKU"
                :tableData="tableDataZCKU"
              >
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
      <!-- 资产领用列表 -->
      <el-tab-pane label="资产领用列表" name="资产领用列表">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="content_Two">
            <div class="buttonList">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出列表</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >用品申领</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonThree"
                @click="transferPostButton"
                >新物品导入</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonFour"
                @click="transferPostButton"
                >删除</el-button
              >
            </div>
            <div class="tableBox">
              <cu-table
                :height="tableHeight"
                :tableHeader="tableHeaderZCLY"
                :tableData="tableDataZCLY"
              >
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
      <!-- 异常资产列表 -->
      <el-tab-pane label="异常资产列表" name="异常资产列表">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="content_Three">
            <div class="buttonList">
              <el-button
                type="primary"
                class="Hover buttonOne"
                @click="UserExcelApi"
                >导出列表</el-button
              >
              <el-button type="primary" class="Hover buttonTwo" @click="drawer"
                >用品申领</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonThree"
                @click="transferPostButton"
                >新物品导入</el-button
              >
              <el-button
                type="primary"
                class="Hover buttonFour"
                @click="transferPostButton"
                >删除</el-button
              >
            </div>
            <div class="tableBox">
              <cu-table
                :height="tableHeight"
                :tableHeader="tableHeaderYCZC"
                :tableData="tableDataYCZC"
              >
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
      <!-- 待审核资产列表 -->
      <el-tab-pane label="待审核资产列表" name="待审核资产列表">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="content_Three">
            <div class="tableBox">
              <cu-table
                :height="tableElTabFourHeight"
                :tableHeader="tableHeaderDSHZCLB"
                :tableData="tableDataDSHZCLB"
              >
                <template #ck="value">
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
          </div>
        </cu-animation>
      </el-tab-pane>
    </el-tabs>
    <!-- 资产库存列表-点击用品申领按钮显示的弹窗 -->
    <div class="thingPopup" v-show="isshow1">
      <div class="thingPopup_content">
        <!-- 弹窗上面的内容 -->
        <div class="thingPopup_content_top">
          <!-- 弹窗上面左边的信息 -->
          <div class="thingPopup_content_top_information">
            <p>
              <label for="">
                <span>物品代码</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品类别</span>
                <el-select v-model="itemCategory_value1" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in itemCategory1"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
            </p>
            <p>
              <label for="">
                <span>物品名称</span>
                <input type="text" />
              </label>
              <label for="">
                <span>规格型号</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>物品品牌</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品单位</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemUnit_value1"
                >
                  <el-option
                    v-for="(item, index) in itemUnit1"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
            </p>
            <p>
              <label for="">
                <span>领取数量</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品仓位</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>状态</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemStatus_value1"
                >
                  <el-option
                    v-for="(item, index) in itemStatus1"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
              <label for="">
                <span>领取人</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>部门</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemDepartment_value1"
                >
                  <el-option
                    v-for="(item, index) in itemDepartment1"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
              <label for="">
                <span>时间</span>
                <input type="text" />
              </label>
            </p>
          </div>
          <!-- 弹窗上面右边的上传头像 -->
          <div class="thingPopup_content_top_photo">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <!-- 弹窗按钮 -->
        <div class="thingPopup_content_btns">
          <button>提交</button>
          <button @click="cancel1">取消</button>
        </div>
      </div>
    </div>

    <!-- 资产领用列表-点击用品申领按钮显示的弹窗 -->
    <div class="thingPopup" v-show="isshow2">
      <div class="thingPopup_content">
        <!-- 弹窗上面的内容 -->
        <div class="thingPopup_content_top">
          <!-- 弹窗上面左边的信息 -->
          <div class="thingPopup_content_top_information">
            <p>
              <label for="">
                <span>物品代码</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品类别</span>
                <el-select v-model="itemCategory_value2" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in itemCategory2"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
            </p>
            <p>
              <label for="">
                <span>物品名称</span>
                <input type="text" />
              </label>
              <label for="">
                <span>规格型号</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>物品品牌</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品单位</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemUnit_value2"
                >
                  <el-option
                    v-for="(item, index) in itemUnit2"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
            </p>
            <p>
              <label for="">
                <span>领取数量</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品仓位</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>状态</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemStatus_value2"
                >
                  <el-option
                    v-for="(item, index) in itemStatus2"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
              <label for="">
                <span>领取人</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>部门</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemDepartment_value2"
                >
                  <el-option
                    v-for="(item, index) in itemDepartment2"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
              <label for="">
                <span>时间</span>
                <input type="text" />
              </label>
            </p>
          </div>
          <!-- 弹窗上面右边的上传头像 -->
          <div class="thingPopup_content_top_photo">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <!-- 弹窗按钮 -->
        <div class="thingPopup_content_btns">
          <button>提交</button>
          <button @click="cancel2">取消</button>
        </div>
      </div>
    </div>

    <!-- 异常资产列表-点击用品申领按钮显示的弹窗 -->
    <div class="thingPopup" v-show="isshow3">
      <div class="thingPopup_content">
        <!-- 弹窗上面的内容 -->
        <div class="thingPopup_content_top">
          <!-- 弹窗上面左边的信息 -->
          <div class="thingPopup_content_top_information">
            <p>
              <label for="">
                <span>物品代码</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品类别</span>
                <el-select v-model="itemCategory_value3" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in itemCategory3"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
            </p>
            <p>
              <label for="">
                <span>物品名称</span>
                <input type="text" />
              </label>
              <label for="">
                <span>规格型号</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>物品品牌</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品单位</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemUnit_value3"
                >
                  <el-option
                    v-for="(item, index) in itemUnit3"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
            </p>
            <p>
              <label for="">
                <span>领取数量</span>
                <input type="text" />
              </label>
              <label for="">
                <span>物品仓位</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>状态</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemStatus_value3"
                >
                  <el-option
                    v-for="(item, index) in itemStatus3"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
              <label for="">
                <span>领取人</span>
                <input type="text" />
              </label>
            </p>
            <p>
              <label for="">
                <span>部门</span>
                <el-select
                  clearable
                  placeholder="请选择"
                  v-model="itemDepartment_value3"
                >
                  <el-option
                    v-for="(item, index) in itemDepartment3"
                    :key="item + index"
                    :value="item"
                    style="font-size: 18px; height: 40px; line-height: 40px"
                  >
                  </el-option>
                </el-select>
              </label>
              <label for="">
                <span>时间</span>
                <input type="text" />
              </label>
            </p>
          </div>
          <!-- 弹窗上面右边的上传头像 -->
          <div class="thingPopup_content_top_photo">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <!-- 弹窗按钮 -->
        <div class="thingPopup_content_btns">
          <button>提交</button>
          <button @click="cancel3">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  InsertProperty,
  CheckProperty,
  SelectProperty,
  SelectPropertyReceive,
  SelectPropertyAnomaly,
  SelectPropertyCheck,
  InsertPropertyDetail,
  SelectPropertyWarehouse,
  SelectPropertyType,
} from "@/api/erpApi/assetsApi";
export default {
  data() {
    return {
      tableHeight: 0, //表格高度
      tableElTabFourHeight: 0, //待审核资产列表表格高度
      activeName: "资产库存列表", // 导航初始选中的模块
      // 查询条件
      seleclt: {
        relevance_nameLY: "", // 领用人姓名
        relevance_nameCL: "", // 处理人姓名
        PropertyName: "", // 物品名称
        pageIndex: 1, // 页码
        pageSize: 10, // 页大小
      },

      // 资产库存列表-表头
      tableHeaderZCKU: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "物品代码",
          key: "itemCode",
          align: "center",
        },
        {
          title: "物品类型",
          slot: "itemType",
          align: "center",
        },
        {
          title: "物品名称",
          key: "itemName",
          align: "center",
        },
        {
          title: "规格型号",
          slot: "specifications",
          align: "center",
        },
        {
          title: "品牌",
          key: "brand",
          align: "center",
        },
        {
          title: "数量",
          key: "quantity",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          align: "center",
        },
        {
          title: "查看",
          slot: "ck",
          align: "center",
        },
      ],
      // 资产库存列表-表内容
      tableDataZCKU: [
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          quantity: "1",
          unit: "台",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          quantity: "1",
          unit: "台",
        },
      ],
      // 资产领用列表-表头
      tableHeaderZCLY: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "物品代码",
          key: "itemCode",
          align: "center",
        },
        {
          title: "物品类型",
          slot: "itemType",
          align: "center",
        },
        {
          title: "物品名称",
          key: "itemName",
          align: "center",
        },
        {
          title: "物品名称",
          key: "itemName",
          align: "center",
        },
        {
          title: "规格型号",
          slot: "specifications",
          align: "center",
        },
        {
          title: "品牌",
          key: "brand",
          align: "center",
        },
        {
          title: "领用人",
          key: "employed",
          align: "center",
        },
        {
          title: "数量",
          key: "quantity",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          align: "center",
        },
        {
          title: "领取时间",
          key: "pickUpTime",
          align: "center",
        },
        {
          title: "查看",
          slot: "ck",
          align: "center",
        },
      ],
      // 资产领用列表-表内容
      tableDataZCLY: [
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          pickUpTime: "2022-03-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          pickUpTime: "2022-03-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          pickUpTime: "2022-03-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          pickUpTime: "2022-03-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          pickUpTime: "2022-03-01/08:30",
        },
      ],
      // 异常资产列表-表头
      tableHeaderYCZC: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "物品代码",
          key: "itemCode",
          align: "center",
        },
        {
          title: "物品类型",
          slot: "itemType",
          align: "center",
        },
        {
          title: "物品名称",
          key: "itemName",
          align: "center",
        },
        {
          title: "物品名称",
          key: "itemName",
          align: "center",
        },
        {
          title: "规格型号",
          slot: "specifications",
          align: "center",
        },
        {
          title: "品牌",
          key: "brand",
          align: "center",
        },
        {
          title: "领用人",
          key: "employed",
          align: "center",
        },
        {
          title: "数量",
          key: "quantity",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          align: "center",
        },
        {
          title: "状态",
          key: "state",
          align: "center",
        },
        {
          title: "报废时间",
          key: "pickUpTime",
          align: "center",
        },
        {
          title: "查看",
          slot: "ck",
          align: "center",
        },
      ],
      // 异常资产列表-表内容
      tableDataYCZC: [
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          employed: "张三",
          quantity: "1",
          unit: "台",
          state: "报废",
          pickUpTime: "2022-06-01/08:30",
        },
      ],
      // 待审核资产列表-表头
      tableHeaderDSHZCLB: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "物品代码",
          key: "itemCode",
          align: "center",
        },
        {
          title: "物品类型",
          slot: "itemType",
          align: "center",
        },
        {
          title: "物品名称",
          key: "itemName",
          align: "center",
        },
        {
          title: "规格型号",
          slot: "specifications",
          align: "center",
        },
        {
          title: "品牌",
          key: "brand",
          align: "center",
        },
        {
          title: "操作人",
          key: "caozuoren",
          align: "center",
        },
        {
          title: "数量",
          key: "quantity",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          align: "center",
        },
        {
          title: "类型",
          key: "typename",
          align: "center",
        },
        {
          title: "查看",
          slot: "ck",
          align: "center",
        },
      ],
      // 待审核资产列表-表内容
      tableDataDSHZCLB: [
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
        {
          id: "1",
          itemCode: "SYD- BG001",
          itemType: "办公电脑",
          itemName: "台式电脑",
          specifications: "戴尔ABC-123-001",
          brand: "戴尔",
          caozuoren: "张三",
          quantity: "1",
          unit: "台",
          typename: "添加",
        },
      ],
      isshow1: false, //资产库存列表-弹窗
      isshow2: false, //资产领用列表-弹窗
      isshow3: false, //异常资产列表-弹窗
      itemCategory1: ["办公电脑", "笔记本电脑", "台式电脑"], //资产库存列表-弹窗物品类别
      itemCategory2: ["办公电脑", "笔记本电脑", "台式电脑"], //资产领用列表-弹窗物品类别
      itemCategory3: ["办公电脑", "笔记本电脑", "台式电脑"], //异常资产列表-弹窗物品类别
      itemCategory_value1: "", //资产库存列表-弹窗物品类别选中的值
      itemCategory_value2: "", //资产领用列表-弹窗物品类别选中的值
      itemCategory_value3: "", //异常资产列表-弹窗物品类别选中的值
      itemUnit1: ["台", "台", "台"], //资产库存列表-弹窗物品单位
      itemUnit2: ["台", "台", "台"], //资产领用列表-弹窗物品单位
      itemUnit3: ["台", "台", "台"], //异常资产列表-弹窗物品单位
      itemUnit_value1: "", //资产库存列表-弹窗物品单位选中的值
      itemUnit_value2: "", //资产领用列表-弹窗物品单位选中的值
      itemUnit_value3: "", //异常资产列表-弹窗物品单位选中的值
      itemStatus1: ["领取", "领取", "领取"], //资产库存列表-弹窗物品状态
      itemStatus2: ["领取", "领取", "领取"], //资产领用列表-弹窗物品状态
      itemStatus3: ["领取", "领取", "领取"], //异常资产列表-弹窗物品状态
      itemStatus_value1: "", //资产库存列表-弹窗物品状态选中的值
      itemStatus_value2: "", //资产领用列表-弹窗物品状态选中的值
      itemStatus_value3: "", //异常资产列表-弹窗物品状态选中的值
      itemDepartment1: ["研发部", "研发部", "研发部"], //资产库存列表-弹窗物品部门
      itemDepartment2: ["研发部", "研发部", "研发部"], //资产领用列表-弹窗物品部门
      itemDepartment3: ["研发部", "研发部", "研发部"], //异常资产列表-弹窗物品部门
      itemDepartment_value1: "", //资产库存列表-弹窗物品部门选中的值
      itemDepartment_value2: "", //资产领用列表-弹窗物品部门选中的值
      itemDepartment_value3: "", //异常资产列表-弹窗物品部门选中的值
      imageUrl1: "", //资产库存列表-上传照片的路径
      imageUrl2: "", //资产领用列表-上传照片的路径
      imageUrl3: "", //异常资产列表-上传照片的路径
    };
  },
  methods: {
    // 添加资产-接口
    InsertPropertyApi() {
      InsertProperty()
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 审核资产-接口
    CheckPropertyApi() {
      CheckProperty()
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询资产库存-接口
    SelectPropertyApi() {
      let valueData = {
        Header: {
          pageIndex: this.seleclt.pageIndex, // 页码
          pageSize: this.seleclt.pageSize, // 页大小
        },
        Body: {
          Property: {
            PropertyName: this.seleclt.PropertyName, // 物品名称
          },
        },
      };
      SelectProperty(valueData)
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询资产领用-接口
    SelectPropertyReceiveApi() {
      let valueData = {
        Header: {
          pageIndex: this.seleclt.pageIndex, // 页码
          pageSize: this.seleclt.pageSize, // 页大小
        },
        Body: {
          relevance_name: this.seleclt.relevance_nameLY, // 领用人姓名
        },
      };
      SelectPropertyReceive(valueData)
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询资产异常-接口
    SelectPropertyAnomalyApi() {
      let valueData = {
        Header: {
          pageIndex: this.seleclt.pageIndex, // 页码
          pageSize: this.seleclt.pageSize, // 页大小
        },
        Body: {
          relevance_name: this.seleclt.relevance_nameCL, // 处理人姓名
        },
      };
      SelectPropertyAnomaly(valueData)
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询资产申请记录-接口
    SelectPropertyCheckApi() {
      SelectPropertyCheck()
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 申请资产-接口
    InsertPropertyDetailApi() {
      InsertPropertyDetail()
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询资产仓库-接口
    SelectPropertyWarehouseApi() {
      SelectPropertyWarehouse()
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询资产类别-接口
    SelectPropertyTypeApi() {
      SelectPropertyType()
        .then((res) => {
          if (res.Code == 1) {
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 根据浏览器大小计算表格高度
    handleHeight() {
      this.tableHeight =
        this.$refs.contentBox.offsetHeight - 40 - 15 - 40 - 147;
      this.tableElTabFourHeight = this.$refs.contentBox.offsetHeight - 40 - 147; //待审核资产列表表格高度
    },

    // 顶部tab点击回调
    tabClick(value) {
      this.pageIndex = 1;
      this.pageSize = 10;
      if (this.activeName == "资产库存列表") {
      } else if (this.activeName == "资产领用列表") {
      } else if (this.activeName == "异常资产列表") {
      } else if (this.activeName == "待审核资产列表") {
      }
    },
    ceshi(value) {
      this.$message.success(value);
    },
    suppliesClaim() {
      // 点击用品申领按钮显示弹窗
      this.isshow1 = !this.isshow1;
    },
    itemReturn() {
      // 点击物品归还按钮显示弹窗
      this.isshow2 = !this.isshow2;
    },
    itemRepair() {
      // 点击物品维修按钮显示弹窗
      this.isshow3 = !this.isshow3;
    },
    cancel1() {
      // 资产库存列表-点击取消按钮显示关闭弹窗
      this.isshow1 = !this.isshow1;
    },
    cancel2() {
      // 资产领用列表-点击取消按钮显示关闭弹窗
      this.isshow2 = !this.isshow2;
    },
    cancel3() {
      // 异常资产列表-点击取消按钮显示关闭弹窗
      this.isshow3 = !this.isshow3;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleAvatarSuccess1(res, file) {
      //资产库存列表-上传照片
      this.imageUrl1 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      //资产领用列表-上传照片
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      //异常资产列表-上传照片
      this.imageUrl3 = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
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
@import "./AssetManagement.scss";
</style>
