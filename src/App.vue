<template>
  <div id="app">
    <!-- 全局鼠标移动-彩色拖尾 -->
    <cu-hoverItem></cu-hoverItem>
    <!-- 全局鼠标移动-星星拖尾 -->
    <!-- <cu-hoverItemX></cu-hoverItemX> -->
    <!-- 全局鼠标 点击爆炸波纹 -->
    <cu-clickBone></cu-clickBone>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted() {
    //连接websocket
    let that = this;
    let ws = new WebSocket("ws://199.168.22.62:9000");
    ws.onopen = function (e) {
      ws.send("{ws://199.168.22.62:9000}");
    };
    ws.onmessage = function (e) {
      console.log("1:", e);
      console.log("2:", e.data);
      var data_list = JSON.parse(e.data);
      console.log("3:", data_list); //处理消息，在页面展示内容（自由扩展）
      ws.send("{1}"); //发送消息给后台
      that.$message.success("接收到新的通知" + data_list[0].device_name);
    };
    ws.onerror = function (e) {
      alert("网络连接错误！");
    };
    ws.onclose = function (e) {
      alert("服务器断开！");
    };
  },
};
</script>
<style lang="less">
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #515a6e;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// 顶部右上方退出登录弹框的大小解除原有的最小为200限制
.el-menu--horizontal {
  // left: 1734px;
  .el-menu--popup {
    min-width: 0 !important;
  }
}
</style>
