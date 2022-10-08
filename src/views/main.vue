<template>
  <div class="htmlBody">
    <!-- 头部导航栏组件 -->
    <Nav />
    <!-- 下面主体内容组件 -->
    <div class="main">
      <!-- 侧边选项组件 -->
      <Aside style="background: #545c64; width: 270px" />
      <div class="main-content">
        <easilyNav />
        <div class="itemBody">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav.vue";
import Aside from "../components/Aside.vue";
import easilyNav from "../components/easilyNav.vue";
import { GetLoginState } from "../api/erpApi/loginApi";
export default {
  components: {
    Nav,
    Aside,
    easilyNav,
  },
  mounted() {
    this.UserVerifyApi(); // 用户身份验证-接口
  },

  methods: {
    // 用户身份验证-接口
    UserVerifyApi() {
      this.$store.commit("$uStore", {
        name: "vuex_menu",
        value: null,
      });
      this.$store.commit("$uStore", {
        name: "vuex_user",
        value: null,
      });
      // 获取登录信息-接口
      GetLoginState()
        .then((res) => {
          if (res.Code == 1) {
            res.Data = this.userDataProcessing(res.Data);
            let menuData = this.menuDataProcessing(res.Data.Modules);
            this.$store.commit("$uStore", {
              name: "vuex_menu",
              value: menuData,
            });
            this.$store.commit("$uStore", {
              name: "vuex_user",
              value: res.Data.User,
            });
          } else {
            this.$message.error(res.Msg);
            // 清楚本地存储,重置路由
            localStorage.clear();
            window.location.href = `${location.origin}/`;
          }
        })
        .catch((err) => {});
    },
    // 用户信息处理（由于部门和职业和基础信息不在同一层级，后台难改，姑处理后统一存放）
    userDataProcessing(valueData) {
      valueData.User.Department = valueData.Department;
      valueData.User.Position = valueData.Position;
      return valueData;
    },
    // 侧边栏数据处理
    menuDataProcessing(valueData) {
      let arrs = [];
      valueData.forEach((element) => {
        if (element.ParentName == "") {
          let arrItem = {
            name: element.Module.ModuleName,
            iconSvg: element.Module.ModuleIcon,
            iconSvgAction: element.Module.ModuleIconAction,
            state: element.State,
            path: element.Module.ModulePath,
            children: [],
          };
          arrs.push(arrItem);
        } else {
        }
      });
      valueData.forEach((element) => {
        arrs.forEach((elemen, index) => {
          if (element.ParentName == elemen.name) {
            let arrItem = {
              name: element.Module.ModuleName,
              iconSvg: element.Module.ModuleIcon,
              iconSvgAction: element.Module.ModuleIconAction,
              state: element.State,
              path: element.Module.ModulePath,
              children: [],
            };
            arrs[index].children.push(arrItem);
          }
        });
      });
      return arrs;
    },
  },
};
</script>
<style lang="scss" scoped>
.htmlBody {
  height: 100vh;
  width: 100vw;
  background: #f5f5f5;
  background: #eeeeee;
  overflow: hidden;
}
.main {
  display: flex;
  height: calc(100vh - 76px);
  padding-top: 14px;
  &-content {
    width: 100%;
    height: 100%;
    padding-left: 20px;
  }
}
.itemBody {
  width: calc(100vw - 270px - 20px - 20px);
  height: calc(100vh - 76px - 14px - 68px - 18px);
  background: #ffffff;
}
</style>
