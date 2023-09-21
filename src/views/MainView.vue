<template>
  <div>
    <keep-alive name="Home,Menu">
      <!-- 二级路由插座 -->
      <router-view @updateson="getUpdate" @toggleEmit="toggle" :myInfo="myInfo" :isLogin="isLogin" />
    </keep-alive>

    <van-tabbar v-model="active" active-color="#d81e06">
      <van-tabbar-item
        v-for="(item, index) in iconData"
        :key="index"
        :to="item.url"
      >
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
//import { onBeforeRouteLeave } from 'vue-router/types/composables';
export default {
  data() {
    return {
      active: 0,
      iconData: [
        {
          name: "首页",
          icon: {
            active: require("../assets/icon/home.png"),
            inactive: require("../assets/icon/home(1).png"),
          },
          url: "Home",
        },
        {
          name: "菜单",
          icon: {
            active: require("../assets/icon/menu.png"),
            inactive: require("../assets/icon/menu(1).png"),
          },
          url: "Menu",
        },
        {
          name: "购物车",
          icon: {
            active: require("../assets/icon/shopbag.png"),
            inactive: require("../assets/icon/shopbag(1).png"),
          },
          url: "Shopbag",
        },
        {
          name: "我的",
          icon: {
            active: require("../assets/icon/my.png"),
            inactive: require("../assets/icon/my(1).png"),
          },
          url: "My",
        },
      ],
    };
  },
  props: ["myInfo", "isLogin"],
  methods: {
    toggle(e) {
      this.active = e;
    },
    getUpdate(){
      this.$emit("updateMyInfo");
    }
  },

  //路由前置守卫
  beforeRouteEnter(to, from, next) {
    //to: 去哪里
    //from: 从哪里来
    //next() 允许路由跳转
    //找不到this 在next()里面有 vm vm代表实例
    next((vm) => {
      //自定义事件
      vm.$emit("updateMyInfo");
      if (to.name == "Home") {
        vm.active = 0;
      } else if (to.name == "Menu") {
        vm.active = 1;
      } else if (to.name == "Shopbag") {
        vm.active = 2;
      } else if (to.name == "My") {
        vm.active = 3;
      }
    });
  },
};
</script>

<style>
</style>