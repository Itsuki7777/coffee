<template>
  <div class="Person">
    <!--导航栏开始-->
    <div class="top">
      <div class="fanhui" @click="goMyview">＜ 返回</div>
      <div class="title">个人资料</div>
    </div>
    <!--导航栏结束-->
    <div
      style="float: left; background-color: blue; width: 375px; height: 100px"
    ></div>
    <!--个人资料开始-->
    <div class="banner">
      <van-cell-group>
        <van-field label="头像" value="" input-align="right" readonly>
          <template #button>
            <div class="head">
              <van-uploader :after-read="afterRead">
                <template #default>
                  <img :src="myInfo.userImg" alt="" class="head-img" />
                </template>
              </van-uploader>
            </div>
          </template>
        </van-field>
        <van-field
          label="用户id"
          :value="myInfo.userId"
          input-align="right"
          readonly
        />
        <van-field
          label="手机号码"
          :value="myInfo.phone"
          input-align="right"
          readonly
        />
        <van-field
          label="会员等级"
          :value="myInfo.vip"
          input-align="right"
          readonly
        />
        <van-field
          label="昵称"
          v-model="nickname"
          @blur="changenick"
          :value="myInfo.nickName"
          input-align="right"
        />
        <van-field
          v-if="!myInfo.desc"
          label="简介"
          v-model="desc"
          @blur="changedesc"
          rows="5"
          autosize
          type="textarea"
          placeholder="这家伙很懒，什么都没有留下！"
          input-align="right"
        />
        <van-field
          v-else
          label="简介"
          v-model="desc"
          @blur="changedesc"
          rows="5"
          autosize
          type="textarea"
          :placeholder="myInfo.desc"
          input-align="right"
        />
      </van-cell-group>
    </div>
    <!--个人资料结束-->
  </div>
</template>

<script>
import { Dialog } from "vant";
//import { Toast } from "vant";
import res from "../request/request";
export default {
  data() {
    return {
      //昵称
      nickname: this.myInfo.nickName,
      //简介
      desc: this.myInfo.desc,
    };
  },
  props: ["myInfo"],
  methods: {
    goMyview() {
      //跳转
      this.$router.push({
        name: "My",
      });
    },
    //更换头像
    changehead(base64, imgname) {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/updateAvatar",
          method: "post",
          data: {
            tokenString: token,
            imgType: imgname,
            serverBase64Img: base64,
          },
        })
        .then((data) => {
          console.log("上传头像信息", data);
          this.$toast.success(data.msg);
          //更新页面个人信息
          this.$emit("updateMyInfo");
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let base64 = file.content;
      base64 = base64.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      let imgname = file.content.split("/", 2)[1];
      imgname = imgname.split(";", 1);
      console.log(imgname);
      //console.log(base64);
      this.changehead(base64, imgname);
    },
    //昵称正则
    validator(val) {
      return /^[A-Za-z\u4e00-\u9fa5]{1,5}$/.test(val);
    },
    //更换昵称
    changenick() {
      let token = localStorage.getItem("TOKEN") || "";
      //console.log(this.validator(this.nickname));
      Dialog.confirm({
        title: "提示",
        message: "确认修改昵称吗？",
      })
        .then(() => {
          if (!this.validator(this.nickname)) {
            this.$toast.fail("昵称不合规范");
            this.nickname = this.myInfo.nickName;
            return;
          }
          res.request({
              url: "/updateNickName",
              method: "post",
              data: {
                tokenString: token,
                nickName: this.nickname,
              },
            })
            .then((data) => {
              console.log("更换昵称信息", data);
              //this.$toast.setDefaultOptions('success',{duration:3000});
              //this.$toast.allowMultiple();
              this.$toast.success(data.msg);
              //更新页面个人信息
              this.$emit("updateMyInfo");
            });
        })
        .catch(() => {
          this.nickname = this.myInfo.nickName;
          return;
        });
    },
    //更换简介
    changedesc() {
      let token = localStorage.getItem("TOKEN") || "";
      Dialog.confirm({
        title: "提示",
        message: "确认修改简介吗？",
      })
        .then(() => {
          res
            .request({
              url: "/updateDesc",
              method: "post",
              data: {
                tokenString: token,
                desc: this.desc,
              },
            })
            .then((data) => {
              console.log("更换简介信息", data);
              //console.log(this.$toast.success(data.msg));
              this.$toast.success(data.msg);
              this.$emit("updateMyInfo");
            });
        })
        .catch(() => {
          this.desc = this.myInfo.desc;
          return;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.Person {
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
    //border-radius: 40px;
    position: absolute;
    .head {
      width: 30px;
      height: 30px;
      float: right;
      //position: absolute;
      margin-top: 0px;
      text-align: right;
      .head-img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        overflow: hidden;
        //display: inline-block;
      }
    }
    /deep/ .van-cell {
      background-color: rgb(255, 255, 255);
      font-size: 16px;
      line-height: 30px;
      //border-radius: 10px;
    }
    // /deep/ .van-icon__image {
    //   width: 30px;
    //   height: 30px;
    //   border-radius: 100%;
    //   overflow: hidden;
    // }
    /deep/ .van-field__label {
      width: 80px;
    }
    /deep/ .van-cell::after {
      border-bottom: 2px solid #dde0e5;
    }
    /deep/ .van-field__control {
      font-size: 15px;
      color: #8f8888;
    }
  }
}
</style>