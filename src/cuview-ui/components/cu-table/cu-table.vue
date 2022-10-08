<template>
  <div>
    <div class="Title">{{ tableTitle }}</div>
    <div class="elPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <slot name="tableTop"></slot>
      <!-- 做一个插槽，方便插入自定义的按钮或文字描述 
      外部使用：  <template #tableTop>
                  放置内容
                 </template>-->
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :height="height < 200 ? 200 : height"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
    >
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          v-if="item['key'] == 'index'"
          :key="index"
          :label="item['title']"
          type="index"
          :width="item['width']"
          :align="item.align"
        ></el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.key ? item.key : item.slot"
          :label="item.title"
          :width="item.width"
          :align="item.align"
        >
          <!-- 头部 -->
          <template #header>
            <slot :name="'H' + [item.slot]">
              {{ item.title }}
            </slot>
          </template>
          <!-- 内容 -->
          <template slot-scope="scope">
            <slot :name="[item.slot]" :value="scope.row" :index="scope.$index">
              {{
                scope.row[item.slot]
                  ? scope.row[item.slot]
                  : scope.row[item.key]
              }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "cu-table",

  props: {
    tableTitle: {
      type: String,
      default: "内容列表",
    },
    tableHeader: {
      type: Array,
      default: () => [
        {
          title: "用例1",
          slot: "date",
        },
        {
          title: "用例2",
          slot: "name",
        },
        {
          title: "用例3",
          key: "address",
        },
      ],
    },
    tableData: {
      type: Array,
      default: () => [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    },
    total: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 476,
    },
  },
  methods: {
    // 表头单元格样式回调
    headerCellStyle({ row, rowIndex }) {
      return "background-color: #F3F3F3;font-family: 'Microsoft YaHei';font-style: normal;font-weight: 400;font-size: 14px;";
    },
    // 单元格样式回调
    cellStyle({ row, rowIndex }) {
      // return "text-align: center;";
    },
    // 每页条数改变回调
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    // 页码改变回调
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.Title {
  margin: 10px 0px;
  font-family: "Microsoft YaHei";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  /* 文字主题色 */
  color: rgba(0, 0, 0, 0.85);
}
.elPagination {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

// 滚动条样式
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #f3f3f3;
  // border-radius: 8px;
}
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px; // 横向滚动条
  height: 10px; // 纵向滚动条 必写
}
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #60626680;
}
// 有滚动条时，多出来的一块
::v-deep th.el-table__cell.gutter {
  background: #f3f3f3;
}
</style>
