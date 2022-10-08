<template>
  <!-- 工作台 -->
  <div class="content-box">
    <div class="home">
      <!-- 顶部姓名和当前时间 -->
      <cu-animation :type="'rotateInDownLeft'" :time="0.8">
        <div class="home-top">
          <div class="home-top-title">
            <div class="home-top-title-user">
              <div>张三/研发部</div>
            </div>
            <div class="home-top-title-attendance">
              <div class="home-top-title-attendance-border">
                <div>5天</div>
                <div>在职工龄</div>
              </div>
              <div class="home-top-title-attendance-border">
                <div>5h</div>
                <div>剩余年假</div>
              </div>
              <div class="home-top-title-attendance-border">
                <div>5h</div>
                <div>剩余加班补休</div>
              </div>
            </div>
            <div class="home-top-title-time">
              <div>{{ newTime }}&nbsp; {{ newWeek }}</div>
              <div>{{ newDate }}</div>
            </div>
          </div>
          <div class="home-top-information">
            <div>
              真正想要的东西，不只是踮踮脚尖那么简单，所有的收获一定要全力以赴，奋不顾身。
            </div>
          </div>
        </div>
      </cu-animation>
      <cu-animation :type="'fadeInRightBig'" :time="0.6">
        <div class="home-center">
          <div class="home-center-body">
            <div class="home-center-body-itmeOne">
              <div class="home-center-body-itmeOne-title">快捷方式</div>
              <div class="home-center-body-itmeOne-svg">
                <img
                  v-for="item in SvgArrOne"
                  :key="item.name"
                  :src="item.svg"
                  alt=""
                  @click="svgClick(item.name)"
                />
              </div>
              <div class="home-center-body-itmeOne-svg">
                <img
                  v-for="item in SvgArrTwo"
                  :key="item.name"
                  :src="item.svg"
                  alt=""
                  @click="svgClick(item.name)"
                />
              </div>
            </div>
            <div class="home-center-body-itmeTwo">
              <div class="home-center-body-itmeTwo-title">订单任务</div>
              <div class="home-center-body-itemTwo-echart">
                <div id="echartPie"></div>
              </div>
            </div>
            <div class="home-center-body-itmeThree">
              <div class="home-center-body-itmeThree-title">今日打卡</div>
              <div class="home-center-body-itmeThree-time">
                <img src="./image/GZSJ.svg" alt="" />
                <div class="home-center-body-itmeThree-time-textbody">
                  <div class="home-center-body-itmeThree-time-textItem">
                    <img src="./image/Zao.svg" alt="" />
                    <div class="one">上午班</div>
                    <div class="two">未打卡</div>
                    <div class="three">至</div>
                    <div class="four">12:01:11</div>
                  </div>
                  <div class="home-center-body-itmeThree-time-textItem">
                    <img src="./image/Xia.svg" alt="" />
                    <div class="one">下午班</div>
                    <div class="two">13:28:21</div>
                    <div class="three">至</div>
                    <div class="four">未打卡</div>
                  </div>
                  <div class="home-center-body-itmeThree-time-textItem">
                    <img src="./image/Jia.svg" alt="" />
                    <div class="one">加班</div>
                    <div class="two">08:28:31</div>
                    <div class="three">至</div>
                    <div class="four">12:01:11</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cu-animation>

      <cu-animation :type="'rotateInUpLeft'" :time="0.8">
        <div class="home-bottom">
          <div class="home-bottom-body">
            <div class="home-bottom-body-itmeOne">
              <div class="itemTitle">
                <img src="./image/DaiBan.svg" alt="" />
                <div class="titleOne">我的代办事项</div>
                <div class="titleTwo">(共5条事项未处理)</div>
              </div>
              <div class="itemContent">
                <div
                  class="itemList"
                  :key="item"
                  v-for="item in [1, 2, 3, 4, 5, 6, 7]"
                >
                  <div class="itemListLeft">
                    <div class="itemListLeftOne">[请假] 张三发起了请假申请</div>
                    <div class="itemListLeftTwo">状态: <span>待完成</span></div>
                    <div class="itemListLeftThree">2022-06-16</div>
                  </div>
                  <div class="itemListRight">
                    <el-button type="primary">查看详情</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="home-bottom-body-itmeTwo">
              <div class="itemTitle">
                <div class="left">
                  <img src="./image/TongZi.svg" alt="" />
                  <div class="titleOne">通知</div>
                  <div class="titleTwo">(剩余5条事项未阅读)</div>
                </div>
                <div class="right">
                  <div>更多 》</div>
                </div>
              </div>
              <div class="itemContent">
                <div
                  class="itemList"
                  :key="item"
                  v-for="item in [1, 2, 3, 4, 5, 6, 7]"
                >
                  <div class="itemListLeft">
                    <div class="itemListLeftOne">[放假] 春节放假通知</div>
                    <!-- <div class="itemListLeftTwo">状态: <span>待完成</span></div> -->
                    <div class="itemListLeftThree">
                      春节放假从哪天开始哪天结束，关好水电注意安全啥啥啥
                      春节放假从哪天开始哪天结束，关好水电注意安全啥啥啥
                    </div>
                  </div>
                  <div class="itemListRight">
                    2022-06-16
                    <!-- <el-button type="primary">查看详情</el-button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cu-animation>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionLine: {
        title: {
          subtext: "单位：元", // 副标题
          top: 2, // 定位
          left: 150, // 定位
          subtextStyle: {
            // 副标题样式
            color: "#808080",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: "充值金额： {c}元",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          //坐标轴颜色
          axisLine: {
            lineStyle: {
              color: "#BBBBBB",
            },
          },
          data: ["07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25"],
        },
        yAxis: {
          show: true,

          type: "value",
          // max : 9000,
          min: 0,
          // boundaryGap: [0, 1],//图像上下居中
          boundaryGap: [0, "30%"],
          //默认以千分位显示，不想用的可以在这加一段
          axisLabel: {
            //调整左侧Y轴刻度， 直接按对应数据显示
            show: true,
            showMinLabel: true,
            showMaxLabel: true,
            formatter: function (value) {
              return value;
            },
          },
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#BBBBBB",
              width: 1, //这里是为了突出显示加上的
            },
          },
        },
        series: [
          {
            data: [3100, 4700, 3200, 3000, 3000, 3000, 3000],
            type: "line",
            symbol: "none", //折线点是否显示
            itemStyle: {
              normal: {
                color: "#F77681", //折线点的颜色
                lineStyle: {
                  color: "#F77681", //折线的颜色
                },
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(247,118,129,0.7000)" },
                  { offset: 0.5, color: "pink" },
                  { offset: 1, color: "rgba(247,118,129,0)" },
                ]),
              },
            },
          },
        ],
      },
      newTime: new Date(), //动态时间时分秒 'hh:mm:ss'
      newDate: new Date().Format("yyyy-MM-dd"), //动态日期年月日 'yyyy-MM-dd'
      newWeek: this.$cu.timeAllFounctioncu.getWeekMethod(new Date()), //动态星期 '星期六'
      //  快捷方式第一列内容
      SvgArrOne: [
        {
          name: "打卡记录",
          svg: require("./image/DKJL.svg"),
        },
        {
          name: "加班申请",
          svg: require("./image/JBSQ.svg"),
        },
        {
          name: "请假申请",
          svg: require("./image/QJSQ.svg"),
        },
        {
          name: "出差申请",
          svg: require("./image/CCSQ.svg"),
        },
        {
          name: "用品申领",
          svg: require("./image/YPSL.svg"),
        },
      ],
      // 快捷方式第二列内容
      SvgArrTwo: [
        {
          name: "用品归换",
          svg: require("./image/YPGH.svg"),
        },
        {
          name: "联络函申请",
          svg: require("./image/LLHSQ.svg"),
        },
        {
          name: "ECN申请",
          svg: require("./image/ECNSQ.svg"),
        },
        {
          name: "ECR申请",
          svg: require("./image/ECRSQ.svg"),
        },
        {
          name: "添加功能",
          svg: require("./image/TJGN.svg"),
        },
      ],
      // 饼图
      chartOption: {},

      home_form_data: [
        {
          what: "[请假]",
          initiate: "张三发起了请假申请",
          state: "状态:",
          stateDate: "待完成",
          time: "2022-06-01",
        },
        {
          what: "[请假]",
          initiate: "张三发起了请假申请",
          state: "状态:",
          stateDate: "待完成",
          time: "2022-06-01",
        },
        {
          what: "[请假]",
          initiate: "张三发起了请假申请",
          state: "状态:",
          stateDate: "待完成",
          time: "2022-06-01",
        },
        {
          what: "[请假]",
          initiate: "张三发起了请假申请",
          state: "状态:",
          stateDate: "待完成",
          time: "2022-06-01",
        },
        {
          what: "[请假]",
          initiate: "张三发起了请假申请",
          state: "状态:",
          stateDate: "待完成",
          time: "2022-06-01",
        },
        {
          what: "[请假]",
          initiate: "张三发起了请假申请",
          state: "状态:",
          stateDate: "待完成",
          time: "2022-06-01",
        },
      ], //表单数据
      isOn: false, //弹出窗开关
    };
  },
  methods: {
    // 快捷方式点击回调
    svgClick(valueName) {
      console.log("ssssssssssss");
      this.$message.success("点击了：" + valueName);
    },
    echartsPie() {
      var chartDom = document.getElementById("echartPie");
      var myChart = this.$echarts.init(chartDom, null, {
        height: 214,
        width: 524,
      });
      var option = {
        title: {
          text: "订单任务",
          // subtext: "触摸可看详细数值",
          right: "180",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },

        legend: {
          bottom: "50", //控制图例出现的距离  默认左上角
          orient: "vertical",
          left: "30",
          height: 200,
          itemWidth: 10, //图例颜色块的宽度和高度
          itemHeight: 10,
          icon: "circle", // 图例前的图标为圆点
          itemGap: 15, //图例之间的间距
        },
        color: ["#1DD19B", "#FFA728", "#109AF9", "#2400FF", "#F05C27"],
        series: [
          {
            left: "80",
            name: "订单任务",
            type: "pie",
            radius: ["40%", "50%"],
            labelLine: {
              // 图形外文字线
              normal: {
                length: 16,
                length2: 90,
                lineStyle: {
                  // color: "#1DD19B",
                  // color: [
                  //   "#1DD19B",
                  //   "#FFA728",
                  //   "#109AF9",
                  //   "#2400FF",
                  //   "#F05C27",
                  // ],
                },
              },
            },
            label: {
              // 线上文字的样式
              normal: {
                formatter: "{b|{b}}:{c|{c}} 个\n\n", // 线上文字
                borderWidth: 10,
                borderRadius: 4,
                padding: [0, -80],
                rich: {
                  a: {
                    color: "#000000",
                    fontSize: 12,
                    lineHeight: 20,
                  },
                  b: {
                    color: "#000000",
                    fontSize: 12,
                    lineHeight: 20,
                  },
                  c: {
                    color: "#000000",
                    fontSize: 12,
                    lineHeight: 20,
                  },
                  d: {
                    color: "#000000",
                    fontSize: 12,
                    lineHeight: 20,
                  },
                },
              },
            },
            data: [
              { value: 10, name: "在生产中" },
              { value: 25, name: "待归档" },
              { value: 20, name: "已归档" },
              { value: 30, name: "变更单" },
              { value: 15, name: "联络函" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },

    open() {
      this.isOn = !this.isOn; // 点击图标+显示弹窗
    },
    sure() {
      this.isOn = !this.isOn; // 点击确定隐藏弹窗
    },
    cancel() {
      this.isOn = !this.isOn; // 点击取消隐藏弹窗
    },
  },
  // 挂载时间
  mounted() {
    console.log("固定第一个获取权限：", this.$store.state.vuex_menu[0]); //获取状态信息

    console.log("获取权限：", this.$route.params); //获取状态信息
    this.echartsPie();
    let that = this;
    this.timer = setInterval(function () {
      that.newTime = new Date().Format("hh:mm:ss");
    });
  },
  // 销毁时清除计时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
