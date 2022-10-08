<template>
  <!-- 项目资源-专利管理页面 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne">导出列表</el-button>
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
              金额合计：<span class="spanFour">0.00</span>元
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
              <span class="spanYX" v-if="value.value.state == '有效'">
                {{ value.value.state }}
              </span>
              <span class="spanSX" v-else-if="value.value.state == '失效'">
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
                >缴费</el-button
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
          title: "产权名称",
          slot: "jobnumber",
          align: "center",
        },
        {
          title: "专利号/登记号",
          slot: "name",
          align: "center",
        },
        {
          title: "授权日期",
          slot: "sex",
          align: "center",
        },
        {
          title: "类型",
          key: "department",
          align: "center",
        },
        {
          title: "产权人",
          key: "email",
          align: "center",
        },
        {
          title: "数量",
          key: "shuliang",
          align: "center",
        },

        {
          title: "累计金额/元",
          key: "tpyeName",
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
          jobnumber: "赛义德智慧医疗自助终端管理系统V1.0",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "失效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "失效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "失效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "失效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
        },
        {
          jobnumber: "Android版访客管理...",
          name: "ZL 2018 2 0670437.X",
          sex: "2022-07-27",
          department: "软件著作权",
          email: "深圳市赛义德信息技术有限公司",
          shuliang: "1",
          hetong: "自主研发",
          state: "有效",
          tpyeName: "0.00￥",
          dengji: "张三",
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
@import "./paymentManagement.scss";
</style>
