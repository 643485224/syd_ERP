<template>
  <!-- 访客管理-被访人管理 -->
  <div ref="contentBox" class="content-box">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="content_button">
        <el-button type="primary" class="Hover buttonOne"
          >导出被访客人名单</el-button
        >
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
          <template #url="value">
            <el-image
              style="width: 40px; height: 40px"
              :src="value.value.url"
              :preview-src-list="value.value.srcList"
            >
            </el-image>
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
          title: "照片",
          slot: "url",
          align: "center",
        },
        {
          title: "工号",
          key: "jobnumber",
          align: "center",
        },
        {
          title: "被访人姓名",
          key: "name",
          align: "center",
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
        },
        {
          title: "部门",
          key: "department",
          align: "center",
        },
        {
          title: "职位",
          key: "email",
          align: "center",
        },
        {
          title: "联系电话",
          key: "shuliang",
          align: "center",
        },
        {
          title: "被访次数",
          key: "hetong",
          align: "center",
        },
      ],
      // 表内容
      tableData: [
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
        },
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          srcList: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          jobnumber: "SYD-001",
          name: "张三",
          sex: "男",
          department: "研发部",
          email: "研发总监",
          shuliang: "18888888888",
          hetong: "8",
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
@import "./intervieweeManagement.scss";
</style>
