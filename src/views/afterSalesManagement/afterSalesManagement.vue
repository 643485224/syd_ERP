<template>
  <div ref="contentBox" class="content-box">
    <el-tabs v-model="activeName" @tab-click="tabClick" class="content-tabs">
      <el-tab-pane label="售后月统计列表" name="elTabOne">
        <cu-animation :type="'slideInRight'" :time="0.5">
          <div class="content-icon">
            <div class="content-icon-item">
              <img
                class="content-icon-item-img"
                src="./image/afterSalesManagement-1.svg"
                alt=""
              />
              <div class="content-icon-item-text">
                <img src="./image/afterSalesManagement-4.svg" alt="" />
                <div class="textTitle">
                  <div>2022年</div>
                  <div>8月</div>
                </div>
                <img src="./image/afterSalesManagement-5.svg" alt="" />
              </div>
            </div>
            <div class="content-icon-item">
              <img
                class="content-icon-item-img"
                src="./image/afterSalesManagement-2.svg"
                alt=""
              />
              <div class="content-icon-item-textTitle">
                <div>故障起/事件</div>
                <div>6</div>
              </div>
            </div>
            <div class="content-icon-item">
              <img
                class="content-icon-item-img"
                src="./image/afterSalesManagement-3.svg"
                alt=""
              />
              <div class="content-icon-item-textTitle">
                <div>维修总金额</div>
                <div>￥999,999.00</div>
              </div>
            </div>
          </div>

          <div class="content-button">
            <el-button type="primary" class="Hover buttonOne" @click="ceshi"
              >导出列表</el-button
            >
            <el-button type="primary" class="Hover buttonTwo" @click="ceshi"
              >创建单据</el-button
            >
            <el-button type="primary" class="Hover buttonThree" @click="ceshi"
              >过滤查询</el-button
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
      </el-tab-pane>
      <el-tab-pane label="订单归档" name="elTabTwo"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 0, //表格高度
      activeName: "elTabOne", // 导航初始选中的模块
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "售后单号",
          key: "Numbering",
          align: "center",
        },
        {
          title: "设备SN号",
          key: "productName",
          align: "center",
        },
        {
          title: "客户",
          key: "model",
          align: "center",
        },
        {
          title: "联系人",
          key: "clientName",
          align: "center",
        },
        {
          title: "联系方式",
          key: "generateTime",
          align: "center",
        },
        {
          title: "机型",
          key: "deliverTime",
          align: "center",
        },
        {
          title: "返厂类型",
          key: "serialNumber",
          align: "center",
        },
        {
          title: "出厂日期",
          key: "guidangstate",
          align: "center",
        },
        {
          title: "在保类型",
          key: "guidangstate",
          align: "center",
        },
        {
          title: "维修物料名称",
          key: "guidangstate",
          align: "center",
          width: 200,
        },
        {
          title: "数量",
          key: "guidangstate",
          align: "center",
        },
        {
          title: "发起时间",
          key: "guidangstate",
          align: "center",
        },
        {
          title: "状态",
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
@import "./afterSalesManagement.scss";
</style>
