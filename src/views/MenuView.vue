<template>
  <div class="menu">
    <div class="head-search">
      <van-search v-model="value" shape="round" placeholder="请输入商品名称" @search="onSearch"/>
    </div>

    <!--商品类型开始-->
    <div class="type">
      <van-tabs
        v-model="active"
        title-active-color="#0a34b8"
        title-inactive-color="#646566"
        swipe-threshold="4"
        line-width="0"
        @click="onClick"
      >
        <van-tab v-for="(item, index) in iconList" :key="index">
          <template #title>
            <div class="type-img">
              <img
                :src="active == index ? item.icon.active : item.icon.inactive"
                alt=""
              />
            </div>
            {{ item.typeDesc }}
          </template>
          <div v-for="(item, index) in productList" :key="index" @click="goGoodsdetail(item)">
            <div class="products">
              <div class="picture">
                <img :src="item.smallImg" alt="" />
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="enname one-txt">{{ item.enname }}</div>
              <div class="price">￥{{ item.price }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!--商品类型结束-->
    <div class="foot"></div>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      //搜索框
      value:"",
      //商品类型数据
      typeList: [],
      //商品数据
      productList: [],
      //图标数据
      active: 0,
      iconList: [
        {
          icon: {
            active: require("../assets/icon/推荐(1).png"),
            inactive: require("../assets/icon/推荐.png"),
          },
          key: "isHot",
        },
        {
          name: "拿铁",
          icon: {
            active: require("../assets/icon/拿铁(1).png"),
            inactive: require("../assets/icon/拿铁.png"),
          },
          key: "type",
        },
        {
          name: "咖啡",
          icon: {
            active: require("../assets/icon/咖啡(1).png"),
            inactive: require("../assets/icon/咖啡.png"),
          },
          key: "type",
        },
        {
          name: "瑞纳冰",
          icon: {
            active: require("../assets/icon/瑞纳冰(1).png"),
            inactive: require("../assets/icon/瑞纳冰.png"),
          },
          key: "type",
        },
        {
          name: "水果茶",
          icon: {
            active: require("../assets/icon/水果茶(1).png"),
            inactive: require("../assets/icon/水果茶.png"),
          },
          key: "type",
        },
      ],
    };
  },
  async created() {
    //调用获取商品类型的方法
    await this.getTypeList();
    //开始调用获取商品的方法
    this.onClick(0);
  },
  methods: {
    //搜索方法
    onSearch(value){
      res
        .request({
          url: "/search",
          params: {
            name: value,
          },
        }).then(data =>{
          //console.log("搜索信息",data);
          this.$router.push({
            name:"Search",
            params:{
              searchlist:data,
            },
          })
        })
    },
    //获取商品类型数据的方法
    getTypeList() {
      return new Promise((resolve) => {
        res
          .request({
            url: "/type",
          })
          .then((data) => {
            //console.log("商品类型数据", data);
            let hot = {
              id: 0,
              type: "1",
              typeDesc: "推荐",
            };
            //添加进商品类型数组
            data.unshift(hot);
            let array = [];
            let obj = {};
            data.forEach((item, index) => {
              obj = {
                ...item,
                ...this.iconList[index],
              };
              array.push(obj);
            });
            //赋值更新
            this.iconList = array;
            resolve();
          });
      });
    },
    //单击事件方法
    onClick(index) {
      //var that = this;
      res
        .request({
          url: "/typeProducts",
          params: {
            key: this.iconList[index].key,
            value: this.iconList[index].type,
            //value: "1",
          },
        })
        .then((data) => {
          //赋值更新
          this.productList = data;
        });
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
    }
  },
};
</script>

<style lang="less" scoped>
.type {
  font-size: 17px;
  //background-color: red;
  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 60px;
    text-align: center;
  }
  /deep/ .van-tab__text {
    font-weight: 600;
  }
  .type-img {
    width: 35px;
  }
  /deep/ .van-tabs__nav {
    background-color: #fbfbfb;
    overflow-x: scroll;
  }
  /deep/ .van-tab {
    flex: 0 0 25%;
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
.foot {
  width: 98%;
  height: 55px;
  float: left;
}
</style>