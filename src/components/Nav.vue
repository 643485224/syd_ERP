<template>
  <!-- 头部导航栏 -->
  <div class="nav">
    <div class="nav-left">
      <img src="./image/TopLeftLogo.svg" alt="" />
      <span>Seyd-管理系统</span>
    </div>

    <div class="nav-right">
      <el-menu
        background-color="#515a6e"
        text-color="#ffffff"
        active-text-color="#ffffff"
        popper-class="elMenuClass"
        popper-append-to-body="true"
        mode="horizontal"
      >
        <el-submenu index="1">
          <template slot="title">
            <img
              style="width: 30px; height: 30px"
              src="./image/userIcon.svg"
              alt=""
            />
            {{ $store.state.vuex_user.Name }}
          </template>
          <el-menu-item index="2-1" class="titless">
            <img src="./image/GRXX.svg" alt="" />个人信息</el-menu-item
          >
          <el-menu-item index="2-2" class="titless" @click="LoginOutApi">
            <img src="./image/TCDL.svg" alt="" />退出登录</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <div class="nav-right-item">
        <cuFullScreen :value="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { LoginOut } from "../api/erpApi/loginApi";
export default {
  data() {
    return {};
  },

  methods: {
    goLogin() {},
    LoginOutApi() {
      LoginOut()
        .then((res) => {
          if (res.Code == 1) {
            let message = res.Msg + ",清除缓存数据...";
            this.$message.success(message);
            // 清楚本地存储,重置路由
            setTimeout(() => {
              window.location.href = `${location.origin}/`;
              localStorage.clear();
            }, 800);
          } else {
            this.$message.error(message);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.nav-right {
  .el-menu-item {
    border-bottom: none;
    background: #515a6e !important;
  }
  .el-menu-item:hover {
    color: #ffffff !important;
    background: #515a6e !important;
    border-bottom: none;
  }
  .el-menu-item.is-active {
    color: #ffffff !important;
    background: #515a6e !important;
    border-bottom: none;
  }
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    outline: 0 !important;
    color: #ffffff !important;
    background: #515a6e !important;
    border-bottom: none;
  }
  // 下方的线条
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .is-active {
    border-bottom: none;
    .el-submenu__title {
      border-bottom: none;
    }
  }
}
.titless {
  line-height: 20px !important;
  padding: 4px 20px !important;
  height: 38px !important;
  img {
    margin-right: 4px;
    width: 30px;
    height: 30px;
  }
}
.iconImg {
  width: 30px;
  height: 30px;
}
.nav {
  width: 100%;
  height: 76px;
  background-color: rgb(81, 90, 110);
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  &-left {
    width: 290px;

    font-size: 30px;
    margin-left: 66px;
    display: flex;
    justify-content: space-between;
  }
  &-right {
    display: flex;
    list-style: none;
    font-size: 16px;
    &-item {
      display: flex;
      align-items: center;
      margin-right: 40px;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
