<template>
  <div class="Search">
    <div class="head">
      <div class="fanhui" @click="topreturn">＜ 返回</div>
      <div class="head-search">
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入商品名称"
          @search="onSearch"
        />
      </div>
    </div>

    <!--搜索结果-->
    <div v-if="searchlist.length != 0">
      <div style="margin-left: 20px; margin-top: 10px; text-align: left">
        搜索结果
      </div>
      <div
        v-for="(item, index) in searchlist"
        :key="index"
        @click="goGoodsdetail(item)"
      >
        <div class="products">
          <div class="picture">
            <img :src="item.smallImg" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="enname one-txt">{{ item.enname }}</div>
          <div class="price">￥{{ item.price }}</div>
        </div>
      </div>
      <div style="margin-top: 20px; color: gray; font-size: 15px">
        没有更多了
      </div>
    </div>
    <div v-if="searchlist.length == 0" class="searchnull">
      没有找到商品，请重新输入关键字搜索
    </div>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      //搜索框
      value: "",
      //搜索结果
      searchlist: [],
    };
  },
  created() {
    this.getSearch();
  },
  methods: {
    //返回跳转
    topreturn() {
      //跳转
      this.$router.go(-1);
    },
    //获取搜索结果
    getSearch() {
      //接收路由传参的对象值
      if(this.$route.params.searchlist == null){
        this.onSearch(this.value);
        console.log("搜索结果", this.searchlist);
      }else{
        this.searchlist = this.$route.params.searchlist;
        console.log("搜索结果", this.searchlist);
      }
    },
    onSearch(value) {
      //Toast(value);
      res
        .request({
          url: "/search",
          params: {
            name: value,
          },
        })
        .then((data) => {
          console.log("搜索结果", data);
          this.searchlist = data;
        });
    },
    //跳转到商品详情页面
    goGoodsdetail(item) {
      //console.log(item.pid);
      //跳转
      this.$router.push({
        name: "Goods",
        params: {
          id: item.pid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Search {
  min-height: 100vh;
  background: #f7f7f7;
  padding-bottom: 20px;
  .head {
    display: flex;
    background: white;
    .fanhui {
      float: left;
      margin-left: 10px;
      margin-top: 15px;
      background: white;
      color: blue;
    }
    .head-search {
      flex: 1;
    }
  }
  .products {
    height: 87px;
    width: 94%;
    background-color: rgb(251, 251, 251);
    margin-left: 3%;
    margin-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    .picture {
      float: left;
      width: 75px;
      height: auto;
      float: left;
      margin-top: 10px;
      margin-left: 10px;
    }
    .name {
      //background-color: green;
      float: left;
      margin-left: 10px;
      margin-top: 27px;
      font-size: 16px;
      color: rgb(106, 111, 116);
    }
    .enname {
      position: absolute;
      //background-color: red;
      float: left;
      margin-left: 95px;
      margin-top: 50px;
      font-size: 14px;
      text-align: left;
      width: 140px;
      color: rgb(106, 111, 116);
    }
    .price {
      float: right;
      margin-right: 18px;
      margin-top: 40px;
      color: blue;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .searchnull {
    margin-top: 200px;
    color: #a29e9e;
  }
}
</style>