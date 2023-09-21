import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const routes = [
  {
    //一级路由
    path: "/main",
    name: "Main",
    component: () => import("../views/MainView.vue"),
    //二级路由
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("../views/MenuView.vue"),
      },
      {
        path: "shopbag",
        name: "Shopbag",
        component: () => import("../views/ShopbagView.vue"),
      },
      {
        path: "my",
        name: "My",
        component: () => import("../views/MyView.vue"),
      },
    ],
  },
  {
    path: "/person",
    name: "Person",
    component: () => import("../views/PersonView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/goods",
    name: "Goods",
    component: () => import("../views/GoodsView.vue"),
  },
  {
    path: "/like",
    name: "Like",
    component: () => import("../views/LikeView.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/SearchView.vue"),
  },

  {
    path: "*",
    //重定向
    redirect: {
      name: "Home",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
// module.exports = {
//   dev:{
//     '/apis':{
//       //测试环境
//       target:'http://www.kangliuyong.com:10002/updateUserBg',
//       changeOrigin:true,  //是否跨域
//       pathRewrite:{
//         '^/apis':''  //需要rewrite重写的
//       }
//     }
//   }
// }
