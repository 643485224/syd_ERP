<template>
  <div>
    <!-- 饼图组件 -->
    <!-- <div id="idEchartPie"></div> -->
    <div :id="idEchartPie"></div>
  </div>
</template>
<script>
import { number } from "echarts";
export default {
  name: "cu-echart-pie",

  props: {
    idEchartPie: {
      type: String,
      default: "idEchartPie",
    },
    // 标题
    text: {
      type: String,
      default: "测试",
    },
    textFontSize: {
      type: String,
      default: "10",
    },
    // 子标题
    subtext: {
      type: String,
      default: " ",
    },
    // 标题定位：上 右 下 左 [null,null,null,center]
    titleLocation: {
      type: Array,
      default: function () {
        return ["center", "200", null, null];
      },
    },
    // 具体数值
    valueData: {
      type: Array,
      default: function () {
        return [
          {
            name: "用例1",
            value: 30,
          },
          {
            name: "用例2",
            value: 10,
          },
          {
            name: "用例3",
            value: 20,
          },
          {
            name: "用例4",
            value: 30,
          },
          {
            name: "用例5",
            value: 10,
          },
        ];
      },
    },
    // 颜色
    colors: {
      type: Array,
      default: function () {
        return ["#1DD19B", "#FFA728", "#109AF9", "#2400FF", "#F05C27"];
      },
    },
    // 单位（人、位、个、箱......）
    labelFormatter: {
      type: String,
      default: "{b|{b}}:{c|{c}} 人\n\n",
    },
    // 宽度
    width: {
      type: Number,
      default: 524,
    },
    // 高度
    height: {
      type: Number,
      default: 214,
    },
  },
  mounted() {
    this.echartsPie();
  },

  methods: {
    echartsPie() {
      var chartDom = document.getElementById(this.idEchartPie);
      var myChart = this.$echarts.init(chartDom, null, {
        height: this.height,
        width: this.width,
      });
      var option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          top: this.titleLocation[0],
          right: this.titleLocation[1],
          bottom: this.titleLocation[2],
          left: this.titleLocation[3],
          // 主标题文本样式设置
          textStyle: {
            fontSize: this.textFontSize,
            fontWeight: "bolder",
            // color: "#000080",
          },
          // 副标题文本样式设置
          subtextStyle: {
            // fontSize: 18,
            // color: "#8B2323",
          },
        },
        tooltip: {
          trigger: "item",
          confine: true, //将此限制打开后tooltip将不再溢出
        },

        legend: {
          top: "center", //控制图例出现的距离  默认左上角
          orient: "vertical",
          left: "10",
          height: 200,
          itemWidth: 10, //图例颜色块的宽度和高度
          itemHeight: 10,
          icon: "circle", // 图例前的图标为圆点
          itemGap: 13, //图例之间的间距
          formatter: function (name) {
            let data = option.series[0].data;
            // console.log(data, 'data')
            let total = 0;
            let tarValue;
            for (let i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            let v = tarValue + "人";
            //计算出百分比
            let p = Math.round((tarValue / total) * 100) + "%";
            // ${p}
            return `${name}  ${v}  `;
            //name是名称，v是数值
          },
        },
        color: this.colors,
        series: [
          {
            left: "140",
            type: "pie",
            radius: ["75%", "92%"],
            // // 鼠标移上去的item不会凸出了
            // hoverAnimation: false,
            label: {
              // 线上文字的样式
              show: false,
            },
            data: this.valueData,
            itemStyle: {
              emphasis: {
                shadowBlur: 1, //触摸放大
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
