<template>
  <div id="app">
    <!-- 一级路由插座 -->
      <router-view
        :myInfo="myInfo"
        :isLogin="isLogin"
        @updateMyInfo="getperson"
      />
  </div>
</template>

<script>
import res from "./request/request";
export default {
  data() {
    return {
      //个人信息
      myInfo: {},
      //登录状态
      isLogin: false,
    };
  },
  created() {
    this.getperson();
  },
  methods: {
    //获取个人信息的方法
    getperson() {
      let token = localStorage.getItem("TOKEN") || "";
      if (!token) {
        console.log("没有获取到token");
        return;
      }
      res
        .request({
          url: "/findMy",
          params: {
            tokenString: token,
          },
        })
        .then((data) => {
          res
            .request({
              url: "/findAccountInfo",
              params: {
                tokenString: token,
              },
            })
            .then((result) => {
              let obj = { ...data[0], ...result[0] };
              console.log("信息合并", obj);
              this.myInfo = obj;
              this.isLogin = true;
            });
        });
    },
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
img {
  height: auto;
  width: 100%;
  display: block;
}
.one-txt {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
