<template>
  <!-- 访客管理-访客记录 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne"
          >导出访客记录</el-button
        >
        <el-button type="primary" class="Hover buttonTwo">签离</el-button>
        <el-button type="primary" class="Hover buttonFour">过滤查询</el-button>
      </div>
    </cu-animation>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="centent_table">
        <cu-table
          :height="tableHeight"
          :tableHeader="tableHeader"
          :tableData="tableData"
        >
          <template #tableTop>
            <div class="spanList">
              <span class="spanOne">现场登记：1</span>
              <span class="spanTwo">预约登记：6</span>
              <span class="spanThree">拜访中：6</span>
              <span class="spanFour">已签退：1</span>
              <span class="spanFive">今日来访总数 ：16</span>
            </div>
          </template>
          <template #url="value">
            <el-image
              style="width: 40px; height: 40px"
              :src="value.value.url"
              :preview-src-list="value.value.srcList"
            >
            </el-image>
          </template>
          <template #state="value">
            <div class="spanChange">
              <span class="spanBFZ" v-if="value.value.state == '拜访中'">
                {{ value.value.state }}
              </span>
              <span class="spanYQT" v-else-if="value.value.state == '已签退'">
                {{ value.value.state }}
              </span>
              <span class="spanYYZ" v-else-if="value.value.state == '预约中'">
                {{ value.value.state }}
              </span>
            </div>
          </template>
          <template #cz="value">
            <div class="tableButtonContent">
              <el-button
                class="tableButton tableButtonTwo"
                type="primary"
                @click="ceshi(value.index)"
                >查看详细</el-button
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
          title: "识别照片",
          slot: "url",
          align: "center",
        },
        {
          title: "访客姓名",
          slot: "jobnumber",
          align: "center",
        },
        {
          title: "访客体温",
          slot: "name",
          align: "center",
        },
        {
          title: "访客联系方式",
          slot: "sex",
          align: "center",
        },
        {
          title: "拜访类型",
          key: "department",
          align: "center",
        },
        {
          title: "被访人姓名",
          key: "email",
          align: "center",
        },
        {
          title: "预约时间",
          key: "shuliang",
          align: "center",
          width: 100,
        },
        {
          title: "离访时间",
          key: "hetong",
          align: "center",
          width: 100,
        },
        {
          title: "状态",
          slot: "state",
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
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "已签退",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "预约中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "张三",
          name: "36.2℃",
          sex: "18888888888",
          department: "浏览参观",
          email: "李四",
          shuliang: "2022-07-30 08:47:25",
          hetong: "2022-07-30 12:02:24",
          state: "拜访中",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
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
@import "./visitorsRecord.scss";
</style>
