<template>
  <div class="home">
    <!-- <router-view :hotList = "hotList"/> -->
    <!--头部开始-->
    <div class="head">
      <div class="head-desc">
        {{ timeText }} <span>{{ myInfo.nickName }}</span>
      </div>
      <div class="head-search">
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入商品名称"
          @search="onSearch"
        />
      </div>
    </div>
    <!--头部结束-->
    <!--轮播图开始-->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#0c34ba">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.bannerImg" alt="" @click="goGoodsdetail(item)" />
          <div class="banner-name">{{ item.name }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--轮播图结束-->
    <!--热卖推荐开始-->
    <div class="hot">
      <div class="hottext">热卖推荐</div>
    </div>
    <div class="hotdiv">
      <div v-for="(item, index) in hotList" :key="index">
        <div class="hotimg" @click="goGoodsdetail(item)">
          <div class="picture">
            <img :src="item.smallImg" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="enname one-txt">{{ item.enname }}</div>
          <div class="price">￥{{ item.price }}</div>
          <div class="hoticon">hot</div>
        </div>
      </div>
    </div>
    <!--热卖推荐结束-->
    <div class="foot"></div>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      //问候语
      timeText: "",
      //定时器
      timer: null,
      //轮播图图片
      bannerList: [],
      //热卖推荐图片
      hotList: [],
      //搜索框
      value: "",
    };
  },
  props: ["myInfo"],
  created() {
    this.getTime();
    //this.getNewTime();
    this.getBannerList();
    this.getHotList();
  },
  methods: {
    //设置获取时间的方法
    getTime() {
      let hours = new Date().getHours();
      console.log(hours);
      //console.log(new Date().getSeconds());
      if (hours >= 0 && hours < 6) {
        this.timeText = "夜深了";
      } else if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      }
    },
    //设置每秒获取时间的方法
    getNewTime() {
      //定时器
      this.timer = setInterval(() => {
        this.getTime();
      }, 100000);
    },
    //搜索方法
    onSearch(value) {
      res
        .request({
          url: "/search",
          params: {
            name: value,
          },
        })
        .then((data) => {
          console.log("搜索信息", data);
          this.$router.push({
            name: "Search",
            //路由传参
            params: {
              searchlist: data,
            },
          });
        });
    },
    //获取轮播图数据的方法
    getBannerList() {
      res
        .request({
          url: "/banner",
        })
        .then((data) => {
          //console.log("轮播图数据", data);
          //赋值更新
          this.bannerList = data;
        });
    },
    //获取推荐商品的方法
    getHotList() {
      res
        .request({
          url: "/typeProducts",
          params: {
            key: "isHot",
            value: 1,
          },
        })
        .then((data) => {
          //console.log("热卖推荐数据", data);
          //赋值更新
          this.hotList = data;
        });
    },
    //跳转到商品详情页面
    goGoodsdetail(item) {
      //console.log(item.pid);
      //跳转
      this.$router.push({
        name: "Goods",
        //路由传参
        params: {
          id: item.pid,
        },
      });
    },
  },
  //路由后置守卫
  beforeRouteLeave(to, from, next) {
    //清除定时器
    clearInterval(this.timer);
    this.timer = null;
    next();
  },
  activated() {
    this.getNewTime();
  },
};
</script>

<style lang="less" scoped>
.home {
  //min-height: 100vh;
  //height: auto;
  background: #f7f7f7;
  padding-bottom: 40px;
  .head {
    display: flex;
    .head-desc {
      line-height: 54px;
      font-weight: bold;
      color: #64696e;
      max-width: 150px;
      background: #fff;
      padding: 0 10px;
      text-align: center;
      span {
        color: #0c34ba;
      }
    }
    .head-search {
      flex: 1;
    }
  }
  .banner {
    margin: 10px;
    border-radius: 20px;
    overflow: hidden;
    //样式穿透
    /deep/ .van-swipe__indicators {
      left: 85%;
    }
    /deep/ .van-swipe__indicator {
      width: 13px;
      height: 3px;
      border-radius: 0;
      background: #64696e;
      opacity: 1;
    }
    .banner-name {
      position: absolute;
      font-weight: bold;
      left: 10px;
      bottom: 30px;
      background: #cec9c9cc;
      padding: 4px 10px;
      border-radius: 20px;
      color: #5478a1;
    }
  }
  .hot {
    margin: 10px;
    background-color: white;
    width: 98%;
    height: 40px;
    .hottext {
      position: absolute;
      width: 70px;
      height: auto;
      color: #ded5d5;
      left: 10px;
      margin-top: 5px;
      margin-left: 10px;
      background-color: rgb(43, 43, 238);
      padding: 4px 10px;
      border-radius: 0 13px 0 0;
    }
  }
  .hotdiv {
    padding-bottom: 20px;
    //background-color: red;
    height: 700px;
    .hotimg {
      width: 160px;
      height: 210px;
      background-color: white;
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      //position: relative;
      float: left;
      padding-bottom: 10px;
      .picture {
        float: left;
        width: 130px;
        height: auto;
        //position: absolute;
        margin-top: 5px;
        margin-left: 15px;
        border-radius: 10px;
        overflow: hidden;
      }
      .name {
        //position: absolute;
        //background-color: red;
        float: left;
        margin-left: 14px;
        margin-top: 5px;
        font-size: 15px;
        color: #64696e;
      }
      .enname {
        //position: absolute;
        //background-color: red;
        float: left;
        margin-left: 14px;
        margin-top: 5px;
        font-size: 12px;
        text-align: left;
        width: 140px;
        color: #cbc7c7;
      }
      .price {
        //position: absolute;
        float: left;
        margin-left: 14px;
        margin-top: 8px;
        color: #0c34ba;
        font-weight: bold;
      }
      .hoticon {
        position: absolute;
        width: 20px;
        height: 20px;
        color: #fff;
        background-color: blue;
        border-radius: 0 0 5px 5px;
        margin-left: 22px;
        margin-top: 6px;
        padding: 5px;
      }
    }
  }
  .foot {
    width: 98%;
    height: 50px;
    float: left;
  }
}
</style>