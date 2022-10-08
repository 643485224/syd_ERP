import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入wow.js;
import wow from "wowjs";
//引入animated动画库
import animated from "animate.css";
// 引入axios插件
import axios from "axios";
// 引入全局uView 自定义组件，方法
import cuView from './cuview-ui'
import './style.scss'
import './margin_padding.scss' //各种margin 与 padding
import store from './store'
import * as echarts from 'echarts'
import VueDragResize from 'vue-drag-resize'
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// Vue.config.productionTip = false //productionTip设置为 false ，可以阻止 vue 在启动时生成生产提示
Vue.use(mavonEditor);
Vue.component('vue-drag-resize', VueDragResize)
Vue.use(cuView)
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(animated);

Vue.prototype.$echarts = echarts //挂载到Vue实例上面
Vue.prototype.$axios = axios;
// 日期格式化
Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$wow = wow;
  },
}).$mount("#app");
