<template>
  <div class="goods">
    <!--导航栏开始-->
    <div class="top">
      <div class="fanhui" @click="topreturn">＜ 返回</div>
      <div class="title">商品详情</div>
    </div>
    <!--导航栏结束-->
    <div>
      <img class="goodsimg" :src="goodsmsg.large_img" alt="" />
    </div>
    <div class="banner">
      <div class="titlebanner">
        <div class="goodtitle">
          <div class="goodname">{{ goodsmsg.name }}</div>
          <div class="goodenname one-txt">{{ goodsmsg.enname }}</div>
          <div class="goodprice">￥{{ goodsmsg.price }}</div>
        </div>

        <!--商品规格-->
        <div v-if="goodsmsg.tem" class="guige">
          <div class="temguige">
            <div class="temtitle">{{ goodsmsg.tem_desc }}</div>
            <van-radio-group v-model="radio1" direction="horizontal">
              <van-radio
                v-for="(item, index) in temlist"
                :key="index"
                :name="index"
              >
                {{ item }}
              </van-radio>
            </van-radio-group>
          </div>
        </div>

        <div v-if="goodsmsg.sugar" class="guige">
          <div class="sugarguige">
            <div class="sugartitle">{{ goodsmsg.sugar_desc }}</div>
            <van-radio-group v-model="radio2" direction="horizontal">
              <van-radio
                v-for="(item, index) in sugarlist"
                :key="index"
                :name="index"
              >
                {{ item }}
              </van-radio>
            </van-radio-group>
          </div>
        </div>

        <div v-if="goodsmsg.cream" class="guige">
          <div class="creamguige">
            <div class="creamtitle">{{ goodsmsg.cream_desc }}</div>
            <van-radio-group v-model="radio3" direction="horizontal">
              <van-radio
                v-for="(item, index) in creamlist"
                :key="index"
                :name="index"
              >
                {{ item }}
              </van-radio>
            </van-radio-group>
          </div>
        </div>

        <div v-if="goodsmsg.milk" class="guige">
          <div class="milkguige">
            <div class="milktitle">{{ goodsmsg.milk_desc }}</div>
            <van-radio-group v-model="radio4" direction="horizontal">
              <van-radio
                v-for="(item, index) in milklist"
                :key="index"
                :name="index"
              >
                {{ item }}
              </van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>

      <div class="choosenum">
        <div class="xuanze">选择数量</div>
        <van-stepper
          class="Stepper"
          v-model="value"
          theme="round"
          button-size="22"
          disable-input
        />
      </div>
      <div class="goodDescription">
        <div class="spmiaosu">商品描述</div>
        <div v-for="(item, index) in goodDes" :key="index">
          <div class="deslist">{{ index + 1 }}、{{ item }}</div>
        </div>
      </div>
    </div>

    <!--底部导航-->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon
        v-if="this.likecheck"
        icon="like"
        text="已收藏"
        @click="notLike"
      />
      <van-goods-action-icon
        v-if="!this.likecheck"
        icon="like-o"
        text="收藏"
        @click="addLike"
      />
      <van-goods-action-button
        color="rgb(113, 113, 233)"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button color="blue" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      //商品信息
      goodsmsg: [],
      //步进器默认值
      value: 1,
      //单选框默认值
      radio1: 0,
      radio2: 0,
      radio3: 0,
      radio4: 0,
      //商品描述
      goodDes: [],
      //商品pid
      goodspid: "",
      //糖规格
      sugarlist: [],
      //温度规格
      temlist: [],
      //奶油规格
      creamlist: [],
      //奶规格
      milklist: [],
      //是否收藏标志
      likecheck: "",
    };
  },
  created() {
    //调用获取商品信息方法
    this.getGoods();
    //调用查询是否收藏方法
    this.checklike();
  },
  methods: {
    //返回跳转
    topreturn() {
      //跳转回上一个页面
      this.$router.go(-1);
    },
    //获取商品数据
    getGoods() {
      //接收路由传参的对象值pid
      this.goodspid = this.$route.params.id;
      res
        .request({
          url: "/productDetail",
          params: {
            pid: this.goodspid,
          },
        })
        .then((data) => {
          console.log("商品信息", data);
          this.goodsmsg = data[0];
          //拆分商品描述信息
          this.goodDes = data[0].desc.split("\n");
          //console.log(this.goodDes.length);
          //console.log(this.goodDes);
          //拆分各规格信息
          this.sugarlist = data[0].sugar.split("/");
          this.temlist = data[0].tem.split("/");
          this.creamlist = data[0].cream.split("/");
          this.milklist = data[0].milk.split("/");
          //console.log(this.sugarlist);
          //console.log(this.temlist);
        });
    },
    //加入收藏
    addLike() {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/like",
          method: "post",
          data: {
            tokenString: token,
            pid: this.goodspid,
          },
        })
        .then((data) => {
          console.log("收藏商品信息", data);
          this.$toast.success(data.msg);
          //刷新收藏状态
          this.checklike();
        });
    },
    //取消收藏
    notLike() {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/notlike",
          method: "post",
          data: {
            tokenString: token,
            pid: this.goodspid,
          },
        })
        .then((data) => {
          console.log("取消收藏信息", data);
          this.$toast.success(data.msg);
          //刷新收藏状态
          this.checklike();
        });
    },
    //查询是否已收藏
    checklike() {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/findlike",
          params: {
            tokenString: token,
            pid: this.goodspid,
          },
        })
        .then((data) => {
          console.log("已收藏商品信息", data);
          //console.log(data.length);
          if (data.length == 0) {
            this.likecheck = false;
          } else {
            this.likecheck = true;
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
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
  .goodsimg {
    float: left;
    position: relative;
    height: 220px;
  }
  .banner {
    width: 94%;
    height: auto;
    background-color: rgb(255, 255, 255);
    float: left;
    margin-top: 160px;
    //margin-bottom: 50px;
    padding-bottom: 50px;
    margin-left: 3%;
    border-radius: 10px;
    position: absolute;
    .titlebanner {
      width: 96%;
      height: auto;
      border: 1px solid rgba(40, 42, 42, 0.1);
      border-top: none;
      border-left: none;
      border-right: none;
      float: left;
      //position: relative;
      margin-top: 10px;
      margin-left: 2%;
      padding-bottom: 30px;
      .goodtitle {
        float: left;
        width: 100%;
        //background-color: red;
        margin-bottom: 10px;
        //position: relative;
      }
      .goodname {
        float: left;
        margin-top: 5px;
        margin-left: 10px;
        font-weight: bold;
      }
      .goodenname {
        float: left;
        position: absolute;
        width: 200px;
        margin-top: 30px;
        text-align: left;
        //background-color: red;
        margin-left: 10px;
        font-size: 12px;
        color: #cbc7c7;
      }
      .goodprice {
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        color: blue;
        font-weight: bold;
      }

      .guige {
        float: left;
        //position: absolute;
        margin-left: 10px;
        margin-top: 5px;
        //background-color: rgb(246, 188, 134);
        .sugarguige,
        .temguige,
        .creamguige,
        .milkguige {
          float: left;
          //position: absolute;
          //width: 100%;
          margin-top: 10px;
          //height: 25px;
          //background-color: aqua;
          .sugartitle,
          .temtitle,
          .creamtitle,
          .milktitle {
            float: left;
            width: 50px;
            text-align: left;
            margin-right: 40px;
            font-size: 15px;
          }
          /deep/ .van-radio__label {
            font-size: 13px;
          }
        }
      }
    }
    .choosenum {
      width: 96%;
      height: 45px;
      border: 1px solid rgba(40, 42, 42, 0.1);
      border-top: none;
      border-left: none;
      border-right: none;
      float: left;
      margin-top: 10px;
      margin-left: 2%;
      .xuanze {
        float: left;
        margin-left: 10px;
        margin-top: 5px;
        font-size: 15px;
      }
      .Stepper {
        float: right;
        margin-right: 5px;
        margin-top: 5px;
      }
      /deep/ .van-stepper--round .van-stepper__plus {
        background-color: blue;
      }
      /deep/ .van-stepper--round .van-stepper__minus {
        color: blue;
        border: 1px solid blue;
      }
    }
    .goodDescription {
      width: 96%;
      height: auto;
      //border: 1px solid rgba(40, 42, 42, 0.1);
      border-top: none;
      border-left: none;
      border-right: none;
      float: left;
      margin-top: 10px;
      margin-left: 2%;
      padding-bottom: 20px;
      .spmiaosu {
        float: left;
        margin-top: 10px;
        margin-left: 10px;
        font-size: 15px;
      }
      .deslist {
        float: left;
        text-align: left;
        font-size: 14px;
        color: #a19a9a;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }
}
</style>