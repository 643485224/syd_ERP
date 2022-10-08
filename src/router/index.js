import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";

const original = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main'),
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '工作台',
          notCache: true,
          icon: 'md-home'
        },
        component: Home,
      },

      // -------------------------------人力资源-------------------------------
      {
        path: "/staffmanagement", // 员工管理
        name: "staffmanagement",
        component: () => import("../views/StaffManagement/StaffManagement.vue"),
      },
      {
        path: "/attendancemanagement", // 考勤管理
        name: "attendancemanagement",
        component: () => import("../views/AttendanceManagement/AttendanceManagement.vue"),
      },
      {
        path: "/employeeApplication", // 员工资源申请
        name: "employeeApplication",
        component: () => import("../views/employeeApplication/employeeApplication.vue"),
      },
      {
        path: "/assetmanagement", // 资产管理
        name: "assetmanagement",
        component: () => import("../views/AssetManagement/AssetManagement.vue"),
      },
      {
        path: "/addressbook", // 通讯录管理
        name: "addressbook",
        component: () => import("../views/AddressBook/AddressBook.vue"),
      },
      {
        path: "/deliverAnAnnouncement", // 发布通知
        name: "deliverAnAnnouncement",
        component: () => import("../views/deliverAnAnnouncement/deliverAnAnnouncement.vue"),
      },

      // -------------------------------订单管理-------------------------------
      {
        path: "/orderGeneration", // 订单生成
        name: "orderGeneration",
        component: () => import("../views/OrderGeneration/OrderGeneration.vue"),
      },
      {
        path: "/orderchange", // 订单变更
        name: "orderchange",
        component: () => import("../views/OrderChange/OrderChange.vue"),
      },
      {
        path: "/connection", // 联络函
        name: "connection",
        component: () => import("../views/Connection/Connection.vue"),
      },
      {
        path: "/orderArchive", // 软件项目
        name: "orderArchive",
        component: () => import("../views/OrderArchive/OrderArchive.vue"),
      },
      {
        path: "/afterSalesManagement", // 售后管理
        name: "afterSalesManagement",
        component: () => import("../views/afterSalesManagement/afterSalesManagement.vue"),
      },

      // -------------------------------财务管理-------------------------------
      {
        path: "/sealManagement", // 印章管理
        name: "sealManagement",
        component: () => import("../views/sealManagement/sealManagement.vue"),
      },
      {
        path: "/contractManagement", // 合同管理
        name: "contractManagement",
        component: () => import("../views/contractManagement/contractManagement.vue"),
      },

      // -------------------------------项目资源-------------------------------
      {
        path: "/patentManagement", // 专利管理
        name: "patentManagement",
        component: () => import("../views/patentManagement/patentManagement.vue"),
      },
      {
        path: "/paymentManagement", // 缴费管理
        name: "paymentManagement",
        component: () => import("../views/paymentManagement/paymentManagement.vue"),
      },
      {
        path: "/customerSupplyResources", // 客供资源管理
        name: "customerSupplyResources",
        component: () => import("../views/customerSupplyResources/customerSupplyResources.vue"),
      },

      // -------------------------------访客管理-------------------------------
      {
        path: "/visitorsRecord", // 访客记录
        name: "visitorsRecord",
        component: () => import("../views/visitorsRecord/visitorsRecord.vue"),
      },
      {
        path: "/intervieweeManagement", // 被访人管理
        name: "intervieweeManagement",
        component: () => import("../views/intervieweeManagement/intervieweeManagement.vue"),
      },

      // -------------------------------高级设置-------------------------------
      {
        path: "/equipmentConfiguration", // 设备配置
        name: "equipmentConfiguration",
        component: () => import("../views/equipmentConfiguration/equipmentConfiguration.vue"),
      },
      {
        path: "/systemLog", // 系统日志
        name: "systemLog",
        component: () => import("../views/systemLog/systemLog.vue"),
      },
      {
        path: "/calendarEditing", // 日历编辑
        name: "calendarEditing",
        component: () => import("../views/calendarEditing/calendarEditing.vue"),
      },

    ]
  },



];

const router = new VueRouter({
  routes,
});
// 性能优化-路由跳转的时候清空上一次页面的所有请求
window._axiosPromiseArr = []
router.beforeEach((to, from, next) => {
  window._axiosPromiseArr.forEach((ele, index) => {
    ele.cancel()
    delete window._axiosPromiseArr[index]
  })
  next()
})

export default router;
