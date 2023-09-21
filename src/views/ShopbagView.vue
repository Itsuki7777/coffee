<template>
  <div class="shopbag">
    <!--导航栏开始-->
    <div class="banner">
      <div class="fanhui">＜ 返回</div>
      <div class="title">购物袋</div>
      <div class="bianji">编辑</div>
    </div>
    <!--导航栏结束-->
    <div>
      <img class="banpic" src="../assets/icon/shopbag_bg.png" alt="" />
    </div>
    <!--内容区开始-->
    <div class="content">
      <!--空状态-->
      <div class="content-none" v-if="!proList.length">
        <van-empty class="custom-image" description="现在没有商品">
          <template #image>
            <img src="../assets/icon/kong.png" alt="" />
          </template>
          <div class="button" @click="goMenu">去逛一逛</div>
        </van-empty>
      </div>
      <!--有商品信息-->
      <div class="content-block" v-else>有商品信息</div>
    </div>
    <!--内容区结束-->
    <!--提交订单栏开始-->
    <van-submit-bar
      class="submitbar"
      :price="0"
      button-text="提交订单"
      @submit="onSubmit"
    >
    <!--
      <van-checkbox v-model="checked">全选</van-checkbox> -->
    </van-submit-bar>
    <!--提交订单栏结束-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商品信息
      proList: [],
    };
  },
  created() {},
  methods: {
    onSubmit() {
      console.log("提交订单");
    },
    goMenu(){
      //跳转
      this.$router.push({
        name:"Menu"
      });

      //改变底部导航栏选中对应的active值
      this.$emit("toggleEmit",1);
    }
  },
  beforeRouteEnter(to, from, next) {
    //测试
    //localStorage.setItem("TOKEN",11111);
    //localStorage.clear;
    //查看是否有登录标识
    let isToken = localStorage.getItem("TOKEN");
    if (!isToken) {
      console.log("没有登录");
      next((vm) => {
        vm.$toast("没有登录，请登录");
        setTimeout(() => {
          vm.$router.push({
            name: "Login"
          });
        },2000);
      });
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
.shopbag {
  //height: 100%;
  background: #f7f7f7;
}
.banner {
  width: 100%;
  height: 50px;
  background-color: rgb(251, 251, 251);
  .fanhui {
    float: left;
    margin-left: 10px;
    margin-top: 15px;
    color: blue;
  }
  .title {
    float: left;
    margin-top: 14px;
    margin-left: 28%;
    font-weight: bold;
  }
  .bianji {
    font-size: 14px;
    margin-top: 16px;
    margin-right: 13px;
    color: rgb(23, 26, 235);
    float: right;
  }
}
.banpic {
  height: 68px;
}
.content {
  .content-none {
    /deep/ .custom-image .van-empty__image {
      width: 90px;
      height: 90px;
      background-color: #f7f7f7;
    }
    .button{
      width: 100px;
      height: 30px;
      background: #bfbfbf;
      color: #fff;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
      border-radius: 20px;
    }
  }
}

.submitbar {
  margin-bottom: 50px;
}
</style>