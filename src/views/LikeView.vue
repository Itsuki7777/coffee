<template>
  <div class="Like">
    <!--导航栏开始-->
    <div class="top">
      <div class="fanhui" @click="topreturn">＜ 返回</div>
      <div class="title">我的收藏</div>
    </div>
    <!--导航栏结束-->
    <div
      style="float: left; background-color: blue; width: 375px; height: 100px"
    ></div>
    <div class="banner">
      <div v-for="(item, index) in Likelist" :key="index">
        <div class="likeimg">
          <div class="picture" @click="goGoodsdetail(item)">
            <img :src="item.smallImg" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="enname one-txt">{{ item.enname }}</div>
          <div class="price">￥{{ item.price }}</div>
          <div class="delete" @click="notlike(item)">
            <img class="delicon" src="../assets/icon/删除.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      //收藏商品信息
      Likelist: [],
    };
  },
  created() {
    //调用查询所有收藏方法
    this.getLike();
  },
  methods: {
    topreturn() {
      //跳转回上一个页面
      this.$router.go(-1);
    },
    //跳转到商品详情页面
    goGoodsdetail(item){
      //console.log(item.pid);
      //跳转
      this.$router.push({
        name:"Goods",
        params:{
          id:item.pid,
        }
      })
    },
    //查询所有收藏
    getLike() {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/findAllLike",
          params: {
            tokenString: token,
          },
        })
        .then((data) => {
          console.log("所有收藏信息", data);
          this.Likelist = data;
        });
    },
    //取消收藏
    notlike(item) {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/notlike",
          method: "post",
          data: {
            tokenString: token,
            pid: item.pid,
          },
        })
        .then((data) => {
          console.log("取消收藏信息", data);
          this.$toast.success(data.msg);
          this.getLike();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.Like {
  min-height: 100vh;
  background-color: #f7f7f7;
  .top {
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
      margin-left: 25%;
      font-weight: bold;
    }
  }
  .banner {
    width: 94%;
    height: auto;
    background-color: rgb(255, 255, 255);
    float: left;
    margin-top: 80px;
    margin-left: 3%;
    border-radius: 10px;
    position: absolute;
    padding-bottom: 10px;
    .likeimg {
      width: 110px;
      height: 160px;
      //background-color: rgb(191, 186, 186);
      margin-left: 5px;
      margin-top: 10px;
      margin-bottom: 10px;
      position: relative;
      float: left;
      padding-bottom: 10px;
      .picture {
        float: left;
        width: 100px;
        height: auto;
        //position: absolute;
        margin-top: 5px;
        margin-left: 5px;
        border-radius: 10px;
        overflow: hidden;
      }
      .name {
        //position: absolute;
        //background-color: red;
        float: left;
        margin-left: 11px;
        margin-top: 5px;
        font-size: 15px;
        color: #64696e;
      }
      .enname {
        //position: absolute;
        //background-color: red;
        float: left;
        margin-left: 11px;
        margin-top: 5px;
        font-size: 12px;
        text-align: left;
        width: 90px;
        color: #cbc7c7;
      }
      .price {
        //position: absolute;
        float: left;
        margin-left: 11px;
        margin-top: 8px;
        color: #0c34ba;
        font-weight: bold;
      }
      .delete {
        float: right;
        //position: absolute;
        margin-top: 10px;
        margin-right: 5px;
        .delicon{
            width: 15px;
        }
      }
    }
  }
}
</style>