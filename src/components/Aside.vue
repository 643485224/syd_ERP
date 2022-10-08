<template>
  <div>
    <el-menu
      :default-active="$store.state.navTagData.tagStatusName"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#515A6E"
      text-color="#FFFFFF"
      active-text-color="#109AF9"
      :unique-opened="true"
    >
      <!-- 遍历菜单 -->
      <template v-for="item in vuex_menu">
        <!-- 第一层 含有子菜单 -->
        <template v-if="item.children.length > 0">
          <!-- 第一层 含有子菜单菜单 进行遍历输出 -->
          <el-submenu :index="item.name" :key="item.name">
            <template slot="title">
              <img class="icon-svg" :src="item.iconSvg" />
              <span slot="title">{{ item.name }}</span>
            </template>

            <!-- 第二层 子菜单遍历 -->
            <template v-for="items in item.children">
              <!-- 第二层 子菜单含有子菜单 -->
              <el-submenu
                v-if="items.children.length > 0"
                :index="items.name"
                :key="items.name"
              >
                <template slot="title">
                  <img
                    class="icon-svg"
                    :src="
                      $store.state.navTagData.tagStatusName == items.name
                        ? items.iconSvgAction
                        : items.iconSvg
                    "
                  />
                  <span slot="title">{{ items.name }}</span>
                </template>
                <el-menu-item
                  v-for="itemss in items.children"
                  :key="itemss.name"
                  :index="itemss.name"
                  @click="goTo(itemss)"
                >
                  <img class="icon-svg" :src="itemss.iconSvg" />
                  <span slot="title">{{ itemss.name }}</span>
                </el-menu-item>
              </el-submenu>
              <!-- 第二层 子菜单不含子菜单 -->
              <el-menu-item
                v-else
                :index="items.name"
                :key="items.name"
                @click="goTo(items)"
              >
                <img
                  class="icon-svg"
                  :src="
                    $store.state.navTagData.tagStatusName == items.name
                      ? items.iconSvgAction
                      : items.iconSvg
                  "
                />
                <span slot="title">{{ items.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 第一层 不含子菜单 该样式需使用最高优先级标签样式才能生效 -->
        <template v-else>
          <el-menu-item
            style="
              height: 88px !important;
              line-height: 88px !important;
              font-size: 20px !important;
              padding-left: 24px !important;
              padding-right: 20px !important;
            "
            :index="item.name"
            :key="item.name"
            @click="goTo(item)"
          >
            <img
              class="icon-svg"
              :src="
                $store.state.navTagData.tagStatusName == item.name
                  ? item.iconSvgAction
                  : item.iconSvg
              "
            />

            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { Switch } from "element-ui";
export default {
  data() {
    return {
      ishomeNav: false,
      isAction: "工作台", //根据名字判断是否选中当前的，加选中状态
      // vuex_menu: [
      //   {
      //     name: "工作台",
      //     iconSvg: require("../assets/images/aside/GZT.svg"),
      //     iconSvgAction: require("../assets/images/aside/GZT-Action.svg"),
      //     state: 2,
      //     path: "/home",
      //     children: [],
      //   },
      //   {
      //     name: "人力资源",
      //     iconSvg: require("../assets/images/aside/RLZY.svg"),
      //     iconSvgAction: require("../assets/images/aside/RLZY-Action.svg"),
      //     state: 2,
      //     path: "",
      //     children: [
      //       {
      //         name: "员工管理",
      //         iconSvg: require("../assets/images/aside/YGGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/YGGL-Action.svg"),
      //         state: 2,
      //         path: "/staffmanagement",
      //         children: [],
      //       },
      //       {
      //         name: "考勤管理",
      //         iconSvg: require("../assets/images/aside/KQGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/KQGL-Action.svg"),
      //         state: 2,
      //         path: "/attendancemanagement",
      //         children: [],
      //       },
      //       {
      //         name: "员工资源申请",
      //         iconSvg: require("../assets/images/aside/YGZYSQ.svg"),
      //         iconSvgAction: require("../assets/images/aside/YGZYSQ-Action.svg"),
      //         state: 2,
      //         path: "/employeeApplication",
      //         children: [],
      //        },
      //       {
      //         name: "资产管理",
      //         iconSvg: require("../assets/images/aside/ZCGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/ZCGL-Action.svg"),
      //         state: 2,
      //         path: "/assetmanagement",
      //         children: [],
      //       },
      //       {
      //         name: "通讯录管理",
      //         iconSvg: require("../assets/images/aside/TXLGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/TXLGL-Action.svg"),
      //         state: 2,
      //         path: "/addressbook",
      //         children: [],
      //       },
      //       {
      //         name: "发布通知",
      //         iconSvg: require("../assets/images/aside/FBTZ.svg"),
      //         iconSvgAction: require("../assets/images/aside/FBTZ-Action.svg"),
      //         state: 2,
      //         path: "/deliverAnAnnouncement",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "订单管理",
      //     iconSvg: require("../assets/images/aside/DDGL.svg"),
      //     iconSvgAction: require("../assets/images/aside/DDGL-Action.svg"),
      //     state: 2,
      //     path: "",
      //     children: [
      //       {
      //         name: "订单生成",
      //         iconSvg: require("../assets/images/aside/DDSC.svg"),
      //         iconSvgAction: require("../assets/images/aside/DDSC-Action.svg"),
      //         state: 2,
      //         path: "/orderGeneration",
      //         children: [],
      //       },
      //       {
      //         name: "订单变更",
      //         iconSvg: require("../assets/images/aside/DDGD.svg"),
      //         iconSvgAction: require("../assets/images/aside/DDGD-Action.svg"),
      //         state: 2,
      //         path: "/orderArchive",
      //         children: [],
      //       },

      //       {
      //         name: "联络函",
      //         iconSvg: require("../assets/images/aside/LLH.svg"),
      //         iconSvgAction: require("../assets/images/aside/LLH-Action.svg"),
      //         state: 2,
      //         path: "/connection",
      //         children: [],
      //       },
      //       {
      //         name: "软件项目",
      //         iconSvg: require("../assets/images/aside/DDGD.svg"),
      //         iconSvgAction: require("../assets/images/aside/DDGD-Action.svg"),
      //         state: 2,
      //         path: "/rderArchive",
      //         children: [],
      //       },
      //       {
      //         name: "售后管理",
      //         iconSvg: require("../assets/images/aside/SHGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/SHGL-Action.svg"),
      //         state: 2,
      //         path: "/afterSalesManagement",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "财务管理",
      //     iconSvg: require("../assets/images/aside/CWGL.svg"),
      //     iconSvgAction: require("../assets/images/aside/CWGL-Action.svg"),
      //     state: 2,
      //     path: "",
      //     children: [
      //       {
      //         name: "印章管理",
      //         iconSvg: require("../assets/images/aside/YZGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/YZGL-Action.svg"),
      //         state: 2,
      //         path: "/sealManagement",
      //         children: [],
      //       },
      //       {
      //         name: "合同管理",
      //         iconSvg: require("../assets/images/aside/HTGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/HTGL-Action.svg"),
      //         state: 2,
      //         path: "/contractManagement",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "项目资源",
      //     iconSvg: require("../assets/images/aside/XMZY.svg"),
      //     iconSvgAction: require("../assets/images/aside/XMZY-Action.svg"),
      //     state: 2,
      //     path: "",
      //     children: [
      //       {
      //         name: "专利管理",
      //         iconSvg: require("../assets/images/aside/ZLGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/ZLGL-Action.svg"),
      //         state: 2,
      //         path: "/patentManagement",
      //         children: [],
      //       },
      //       {
      //         name: "缴费管理",
      //         iconSvg: require("../assets/images/aside/JFGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/JFGL-Action.svg"),
      //         state: 2,
      //         path: "/paymentManagement",
      //         children: [],
      //       },
      //       {
      //         name: "客供资源管理",
      //         iconSvg: require("../assets/images/aside/KGZYGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/KGZYGL-Action.svg"),
      //         state: 2,
      //         path: "/customerSupplyResources",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "访客管理",
      //     iconSvg: require("../assets/images/aside/FKGL.svg"),
      //     iconSvgAction: require("../assets/images/aside/FKGL-Action.svg"),
      //     state: 2,
      //     path: "",
      //     children: [
      //       {
      //         name: "访客记录",
      //         iconSvg: require("../assets/images/aside/FKJL.svg"),
      //         iconSvgAction: require("../assets/images/aside/FKJL-Action.svg"),
      //         state: 2,
      //         path: "/visitorsRecord",
      //         children: [],
      //       },
      //       {
      //         name: "被访人管理",
      //         iconSvg: require("../assets/images/aside/BFRGL.svg"),
      //         iconSvgAction: require("../assets/images/aside/BFRGL-Action.svg"),
      //         state: 2,
      //         path: "/intervieweeManagement",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "高级设置",
      //     iconSvg: require("../assets/images/aside/GJSZ.svg"),
      //     iconSvgAction: require("../assets/images/aside/GJSZ-Action.svg"),
      //     state: 2,
      //     path: "",
      //     children: [
      //       {
      //         name: "设备配置",
      //         iconSvg: require("../assets/images/aside/SBPZ.svg"),
      //         iconSvgAction: require("../assets/images/aside/SBPZ-Action.svg"),
      //         state: 3,
      //         path: "/equipmentConfiguration",
      //         children: [],
      //       },
      //       {
      //         name: "系统日志",
      //         iconSvg: require("../assets/images/aside/XTRZ.svg"),
      //         iconSvgAction: require("../assets/images/aside/XTRZ-Action.svg"),
      //         state: 3,
      //         path: "/systemLog",
      //         children: [],
      //       },
      //       {
      //         name: "日历编辑",
      //         iconSvg: require("../assets/images/aside/RLBJ.svg"),
      //         iconSvgAction: require("../assets/images/aside/RLBJ-Action.svg"),
      //         state: 3,
      //         path: "/calendarEditing",
      //         children: [],
      //       },
      //     ],
      //   },
      // ],
      vuex_menu: [], ////获取当前登录菜单信息
      q: "",
    };
  },
  mounted() {
    this.vuex_menu = [];
    var that = this;
    var myVar = setInterval(function () {
      //防止数据拿不到
      if (localStorage.getItem("lifeData")) {
        that.vuex_menu = JSON.parse(localStorage.getItem("lifeData"))[
          "vuex_menu"
        ];
        that.menuDealWith();
        clearInterval(myVar); //关闭循环
      } else {
        // that.$message.info("数据拼命加载中，请稍候......");
      }
    }, 500);
  },
  methods: {
    goTo(body) {
      // this.isAction = body.name;
      this.$store.commit("clickTagItem", body);
      if (body.path) {
        console.log(
          body.name +
            "的权限为（0禁止，1查看，2修改）:" +
            this.$cu.menuHandle(body.name)
        );
        this.$router.push({
          name: body.path.substring(1),
          params: { menu: body },
        });
        this.$store.commit("addTagItem", body);
      }
    },
    menuDealWith() {
      this.vuex_menu.forEach((element) => {
        let a = element.iconSvg.substr(
          element.iconSvg.indexOf("../assets/images/aside") + 22
        );
        let b = element.iconSvgAction.substr(
          element.iconSvgAction.indexOf("../assets/images/aside") + 22
        );
        element.iconSvg = require("../assets/images/aside" + a);
        element.iconSvgAction = require("../assets/images/aside" + b);
        if (element.children.length > 0) {
          element.children.forEach((elemen) => {
            let a = elemen.iconSvg.substr(
              elemen.iconSvg.indexOf("../assets/images/aside") + 22
            );
            let b = elemen.iconSvgAction.substr(
              elemen.iconSvgAction.indexOf("../assets/images/aside") + 22
            );
            elemen.iconSvg = require("../assets/images/aside" + a);
            elemen.iconSvgAction = require("../assets/images/aside" + b);
          });
        }
      });
      this.$store.commit("resetTagItem", this.$store.state.vuex_menu[0]);
    },

    //说明: sub-menu 展开的回调		参数:	index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    //说明: sub-menu 收起的回调		参数:	index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  // watch: {
  //   $route(to, from) {
  // console.log(to.path); //到这里去
  // console.log(from.path); //从该处出发
  // if (to.path === "/") {
  // } else {
  // }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
} /* 这是针对缺省样式 (必须的) */
.icon-svg {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}

::v-deep.el-menu {
  width: 270px;
  height: 100%;
  overflow: auto;

  // 第一层级 有子元素 padding
  .el-submenu__title {
    height: 88px;
    line-height: 88px;
    font-size: 20px;
    padding-left: 24px !important;
    padding-right: 20px !important;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  // 第二层级 有子元素 padding
  .el-menu-item {
    height: 60px !important;
    line-height: 60px !important;
    font-size: 20px;
    padding-left: 40px !important;
    padding-right: 20px !important;
  }
}

// 第一层 padding
// .oneMenu {
// }
</style>
