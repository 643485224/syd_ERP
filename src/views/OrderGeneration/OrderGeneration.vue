<template>
  <div ref="contentBox" class="content-box">
    <el-tabs v-model="activeName" @tab-click="tabClick" class="content-tabs">
      <el-tab-pane label="订单生成" name="elTabOne">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="content-condition">
            <div class="condition-item">
              <span>产品名称：</span>
              <el-input
                v-model="form.condition_one"
                placeholder="请输入产品名称"
              ></el-input>
            </div>
            <div class="condition-item">
              <span>订单编号：</span>
              <el-input
                v-model="form.condition_two"
                placeholder="请输入订单编号"
              ></el-input>
            </div>
            <div class="condition-item">
              <span>订单数量：</span>
              <el-input
                v-model="form.condition_three"
                placeholder="请输入订单数量"
              ></el-input>
            </div>
          </div>
          <div class="content-condition">
            <div class="condition-item">
              <span>产品型号：</span>
              <el-input
                v-model="form.condition_four"
                placeholder="请输入产品型号"
              ></el-input>
            </div>
            <div class="condition-item">
              <span>客户名称：</span>
              <el-input
                v-model="form.condition_five"
                placeholder="请输入客户名称"
              ></el-input>
            </div>
            <div class="condition-item">
              <span>交付时间：</span>
              <el-date-picker
                popper-class="elDatePicker"
                class="formSelectTime"
                v-model="form.condition_six"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                @change="pickerChange"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="content-button">
            <el-button type="primary" class="Hover buttonOne" @click="ceshi"
              >生成订单</el-button
            >
            <el-button type="primary" class="Hover buttonTwo" @click="ceshi"
              >查询订单</el-button
            >
            <el-button type="primary" class="Hover buttonThree" @click="ceshi"
              >修改订单</el-button
            >
          </div>
          <div class="content-table">
            <cu-table
              :height="tableHeight"
              tableTitle="生成列表"
              :tableHeader="tableHeader"
              :tableData="tableData"
            >
              <template slot="cz" slot-scope="value">
                <div class="tableButtonContent">
                  <el-button
                    class="tableButton tableButtonOne"
                    type="primary"
                    :disabled="value.index % 3 != 0"
                    @click="ceshi(value.index)"
                    >申请归档</el-button
                  >
                  <el-button
                    class="tableButton tableButtonTwo"
                    type="primary"
                    @click="ceshi(value.index)"
                    >复制编号</el-button
                  >
                </div>
              </template>
            </cu-table>
          </div>
        </cu-animation>
      </el-tab-pane>
      <el-tab-pane label="订单归档" name="elTabTwo">
        <div class="elTabThree">
          <cu-animation :type="'slideInRight'" :time="0.5">
            <div class="elTabThreeBodyLeft">
              <!-- 左侧部分-审核单据列表 -->
              <div class="elTabThreeBodyLeft_title">审核单据列表</div>
              <el-collapse :accordion="true">
                <el-collapse-item title="待审核" :name="1">
                  <div
                    :tabindex="index"
                    class="itemList"
                    v-for="(item, index) in auditedList"
                    :key="item + index"
                    @click="actinItem(item)"
                  >
                    <div>
                      <span>姓名：</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <div>
                      <span>部门：</span>
                      <span>{{ item.department }}</span>
                    </div>
                    <div>
                      <span>时间：</span>
                      <span>{{ item.timeValue }}</span>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="已审核" :name="2">
                  <div
                    :tabindex="index"
                    class="itemList"
                    v-for="(item, index) in auditedList"
                    :key="item + index"
                    @click="actinItem(item)"
                  >
                    <div>
                      <span>姓名：</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <div>
                      <span>部门：</span>
                      <span>{{ item.department }}</span>
                    </div>
                    <div>
                      <span>时间：</span>
                      <span>{{ item.timeValue }}</span>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </cu-animation>
          <cu-animation :type="'slideInRight'" :time="0.5">
            <div class="elTabThreeBodyRight">
              <!-- 右侧部分 -->
              <div class="rowBox">
                <span class="blueBox">订单编号：SEORD000001 </span>
              </div>
              <div class="rowBox">
                <div class="bottomBoxImg"></div>
              </div>
              <div class="rowBox">
                <span class="blueBox"
                  >深圳市赛义德信息技术股份集团有限公司</span
                >
              </div>
              <div class="rowBox">
                <div class="bottomBoxImg"></div>
              </div>
              <div class="rowBox">
                <span class="blueBox">订单负责人</span>
                <span class="rightBoxImg"></span>
                <span class="blueBox">赵七</span>
              </div>
              <div class="rowBox">
                <div class="colBoxImg"></div>
              </div>
              <div class="rowBox">
                <div class="bordertops"></div>
                <div class="colBox" :key="item" v-for="item in dataText">
                  <div class="bottomBoxImg"></div>
                  <span class="blueItemBox">商务人员</span>
                  <div class="bottomBoxImg"></div>
                  <span class="blueItemBox">张1</span>
                  <div
                    class="colBoxItem"
                    :key="items"
                    v-for="items in item.children"
                  >
                    <div class="colBoxImg"></div>
                    <div class="Hover greyItemBox" @click="ceshi(items.work)">
                      <span>{{ items.work }}</span
                      ><span>{{ items.number }}</span>
                    </div>
                  </div>
                  <div class="colBoxImg"></div>
                  <div class="Hover blueBox">上传完成</div>
                </div>
              </div>
            </div>
          </cu-animation>
        </div>
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
      // 条件mode
      form: {
        condition_one: "",
        condition_two: "",
        condition_three: "",
        condition_four: "",
        condition_five: "",
        condition_six: "",
      },
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "订单编号",
          key: "Numbering",
          align: "center",
        },
        {
          title: "产品名称",
          key: "productName",
          align: "center",
        },
        {
          title: "产品型号",
          key: "model",
          align: "center",
        },
        {
          title: "客户名称",
          key: "clientName",
          align: "center",
        },
        {
          title: "生成时间",
          key: "generateTime",
          align: "center",
        },
        {
          title: "交付时间",
          key: "deliverTime",
          align: "center",
        },
        {
          title: "订单序列号",
          key: "serialNumber",
          align: "center",
        },
        {
          title: "归档状态",
          key: "guidangstate",
          align: "center",
        },
        {
          title: "操作",
          slot: "cz",
          align: "center",
          width: "180px",
        },
      ],
      auditedList: [
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
      ],
      tableData: [
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
        {
          number: "1",
          Numbering: "SEORD0001",
          productName: "15寸桌面访客机",
          model: "DH-ASV2001A",
          clientName: "浙江大华技术股份有限公司",
          generateTime: "2022/06/15 11:11:11",
          deliverTime: "2022/06/15",
          serialNumber: "22061512341395",
          guidangstate: "归档中",
        },
      ],

      dataText: [
        {
          name: "张1",
          typeName: "商务人员",
          children: [
            {
              number: 1,
              work: "需求单",
            },
            {
              number: 2,
              work: "联络函",
            },
            {
              number: 3,
              work: "客户来往邮件",
            },
          ],
        },
        {
          name: "张2",
          typeName: "采购人员",
          children: [
            {
              number: 1,
              work: "采购单",
            },
            {
              number: 2,
              work: "物料收货单",
            },
          ],
        },
        {
          name: "张3",
          typeName: "工程人员",
          children: [
            {
              number: 1,
              work: "技术规格表",
            },
            {
              number: 2,
              work: "试装报告",
            },
            {
              number: 3,
              work: "硬件配置表",
            },
            {
              number: 3,
              work: "端口配置表",
            },
            {
              number: 3,
              work: "BOM表",
            },
            {
              number: 3,
              work: "变更单",
            },
            {
              number: 3,
              work: "客供物料清单",
            },
            {
              number: 3,
              work: "产品实物图",
            },
            {
              number: 3,
              work: "客户来往邮件",
            },
            {
              number: 3,
              work: "新物料测试报告",
            },
          ],
        },
        {
          name: "张4",
          typeName: "外观人员",
          children: [
            {
              number: 1,
              work: "产品效果图",
            },
            {
              number: 2,
              work: "丝印图纸",
            },
          ],
        },
        {
          name: "张5",
          typeName: "结构人员",
          children: [
            {
              number: 1,
              work: "结构图纸",
            },
            {
              number: 2,
              work: "产品尺寸图",
            },
          ],
        },
        {
          name: "张6",
          typeName: "电子人员",
          children: [
            {
              number: 1,
              work: "PCBA物料配套",
            },
          ],
        },
        {
          name: "张7",
          typeName: "品质人员",
          children: [
            {
              number: 1,
              work: "成品检验报告",
            },
            {
              number: 2,
              work: "特采单",
            },
            {
              number: 3,
              work: "纠正预防措施单",
            },
            {
              number: 3,
              work: "品质异常处理单",
            },
            {
              number: 3,
              work: "机柜异常处理单",
            },
            {
              number: 3,
              work: "客诉异常反馈单",
            },
            {
              number: 3,
              work: "产品包装实物图",
            },
          ],
        },
        {
          name: "张8",
          typeName: "软件人员",
          children: [
            {
              number: 1,
              work: "定制软件需求表",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleHeight() {
      this.tableHeight =
        this.$refs.contentBox.offsetHeight - 55 - 40 - 50 - 50 - 147;
    },
    tabClick(tab, event) {
      console.log(tab, event);
    },
    ceshi(value) {
      this.$message.success(value);
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
    }, 500);
    window.onresize = () => {
      this.handleHeight();
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./OrderGeneration.scss";
</style>
