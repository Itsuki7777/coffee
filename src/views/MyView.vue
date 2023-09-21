<template>
  <div class="my">
    <!--背景图片-->

    <div>
      <!--已登录-->
      <img
        v-if="isLogin"
        class="personimg"
        @touchstart="holdDown()"
        @touchend="holdUp()"
        @touchmove="move()"
        :src="myInfo.userBg"
        alt=""
      />
      <!--未登录-->
      <img 
        v-else 
        class="personimg" 
        @touchstart="holdDown()"
        @touchend="holdUp()"
        @touchmove="move()" 
        src="../assets/icon/pc_05.jpg" 
        alt="" 
      />
      <!--更换背景图-->
      <div class="head">
        <van-uploader :max-size="10000 * 1024" :after-read="afterRead">
          <template #default>
            <img
              src="../assets/icon/changebutton.jpg"
              alt=""
              class="buttonBg"
            />
          </template>
        </van-uploader>
      </div>
      <!--弹出预览图-->
      <van-popup v-model="show">
        <img class="popBg" :src="myInfo.userBg" alt=" /" />
      </van-popup>
    </div>

    <!--个人资料栏开始-->
    <div class="banner">
      <div class="content-head">
        <div class="content-head-img">
          <div>
            <!--未登录头像-->
            <img
              v-if="!isLogin"
              class="headimg"
              src="../assets/icon/my.png"
              alt=""
            />
            <!--已登录头像-->
            <img v-else class="headimg" :src="myInfo.userImg" alt="" />
          </div>
        </div>

        <div class="content-head-info">
          <!--未登录信息-->
          <div v-if="!isLogin" class="name" @click="goLogin">请先登录</div>
          <!--已登录信息-->
          <div v-else class="name">{{ myInfo.nickName }}</div>
          <div class="personsign one-txt" v-if="!myInfo.desc">
            这家伙很懒，什么都没有留下！
          </div>
          <div class="personsign one-txt" v-else>{{ myInfo.desc }}</div>
        </div>
      </div>

      <div v-if="isLogin" class="personal" @click="goPerson">
        <div class="text">个人资料</div>
        <div class="jiantou">＞</div>
      </div>
      <div class="dingdan">
        <div class="text">我的订单</div>
        <div class="jiantou">＞</div>
      </div>
      <div class="shoucang" @click="goshoucang">
        <div class="text">我的收藏</div>
        <div class="jiantou">＞</div>
      </div>
      <div class="area">
        <div class="text">地址管理</div>
        <div class="jiantou">＞</div>
      </div>
      <div v-if="isLogin" class="set" @click="goSave">
        <div class="text">安全中心</div>
        <div class="jiantou">＞</div>
      </div>
    </div>
    <!--个人资料结束-->

    <!--安全中心弹出页面-->
    <van-popup
      class="saveshow"
      v-model="SaveShow"
      position="left"
      :style="{ width: '100%', height: '100%' }"
    >
      <!--导航栏开始-->
      <div class="savebanner">
        <div class="fanhui" @click="savereturn">＜ 返回</div>
        <div class="title">安全中心</div>
      </div>
      <!--导航栏结束-->
      <div
        style="float: left; background-color: blue; width: 375px; height: 100px"
      ></div>
      <div class="menulist">
        <div class="xiugai" @click="changeshow">
          <div class="text">修改密码</div>
          <div class="jiantou">＞</div>
        </div>
        <div class="zhuxiao" @click="destroyAccount">
          <div class="text">注销账号</div>
          <div class="jiantou">＞</div>
        </div>
      </div>
      <div class="tuichu" @click="outLogin">
        <div class="quitlogin">退出登录</div>
      </div>

      <!--修改密码弹出界面-->
      <van-popup
        class="changepwdshow"
        v-model="PwdShow"
        closeable
        position="bottom"
        :style="{ height: '45%' }"
      >
        <div class="pwdtitle">修改密码</div>
        <div class="pwdinput">
          <van-form validate-first @submit="onSubmitpwd">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
              v-model="oldpwd"
              name="oldpwd"
              :type="showoldpwd ? 'text' : 'password'"
              label="旧密码"
              right-icon="closed-eye"
              @click-right-icon="changeshowoldpwd"
              placeholder="旧密码(首字符必须为字母)"
              :rules="[{ validator: validator1, message: '请输入正确内容' }]"
            >
            </van-field>
            <van-field
              v-model="newpwd"
              name="newpwd"
              :type="shownewpwd ? 'text' : 'password'"
              label="新密码"
              right-icon="closed-eye"
              @click-right-icon="changeshownewpwd"
              placeholder="新密码(首字符必须为字母)"
              :rules="[{ validator: validator1, message: '请输入正确内容' }]"
            >
            </van-field>

            <div class="changebutton">
              <van-button round block type="info" native-type="submit">
                <div class="changetext">提交</div>
              </van-button>
            </div>
          </van-form>
        </div>
      </van-popup>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import res from "../request/request";
export default {
  data() {
    return {
      //鼠标按下时间
      timeStart: "",
      timeEnd: "",
      time: "",
      //背景图预览显示
      show: false,
      //安全中心页面显示
      SaveShow: false,
      //修改密码页面显示
      PwdShow: false,
      //旧密码框
      oldpwd: "",
      //新密码框
      newpwd: "",
      //密码显示
      showoldpwd: false,
      shownewpwd: false,
    };
  },
  props: ["myInfo", "isLogin"],
  created() {},
  methods: {
    goLogin() {
      //跳转
      this.$router.push({
        name: "Login",
      });
    },
    goPerson() {
      //跳转
      this.$router.push({
        name: "Person",
      });
    },
    goshoucang(){
      //跳转
      this.$router.push({
        name:"Like",
      })
    },
    //获取当前时间
    getTimeNow() {
      let now = new Date();
      return now.getTime();
    },
    //鼠标按下时触发
    holdDown() {
      this.timeStart = this.getTimeNow();
      //每100毫秒执行一次
      this.time = setInterval(() => {
        this.timeEnd = this.getTimeNow();
        if (this.timeEnd - this.timeStart > 2000) {
          clearInterval(this.time);
          this.show = true;
        }
      }, 100);
      //return false;
      var e = e || window.event;
      //阻止默认事件[兼容处理]
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      //阻止事件冒泡[兼容处理]
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    holdUp() {
      clearInterval(this.time);
    },
    move() {
      clearInterval(this.time);
    },
    //更换背景图
    changeBg(base64, imgname) {
      let token = localStorage.getItem("TOKEN") || "";
      res
        .request({
          url: "/updateUserBg",
          method: "post",
          data: {
            tokenString: token,
            imgType: imgname,
            serverBase64Img: base64,
          },
        })
        .then((data) => {
          console.log("上传背景图信息", data);
          this.$toast.success(data.msg);
          //更新页面个人信息
          this.$emit("updateson");
        });
    },
    afterRead(file) {
      console.log(file);
      let base64 = file.content;
      base64 = base64.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      let imgname = file.content.split("/", 2)[1];
      imgname = imgname.split(";", 1);
      console.log(imgname);
      // console.log(base64);
      this.changeBg(base64, imgname);
    },

    //弹出安全中心
    goSave() {
      this.SaveShow = true;
    },
    //返回我的页面
    savereturn() {
      this.SaveShow = false;
    },
    //弹出修改密码页面
    changeshow() {
      this.PwdShow = true;
    },
    //密码正则
    validator1(val) {
      return /^[A-Za-z][A-Za-z\d]{5,15}$/.test(val);
    },
    //显示旧密码
    changeshowoldpwd() {
      this.showoldpwd = !this.showoldpwd;
    },
    //显示新密码
    changeshownewpwd() {
      this.shownewpwd = !this.shownewpwd;
    },
    //修改密码提交
    onSubmitpwd(values) {
      console.log("提交的修改密码信息", values);
      let token = localStorage.getItem("TOKEN") || "";
      //发送登录请求
      res
        .request({
          url: "/updatePassword",
          method: "post",
          data: {
            tokenString: token,
            password: values.newpwd,
            oldPassword: values.oldpwd,
          },
        })
        .then((data) => {
          if (data.code == "E003") {
            this.$toast.fail(data.msg);
          } else if (data.code == "E001") {
            console.log("修改密码信息", data);
            this.$toast.success("修改成功,请重新登录");
            //清空输入框
            this.oldpwd = "";
            this.newpwd = "";
            localStorage.clear();
            //重新登录
            this.goLogin();
          }
        });
    },
    //注销账号
    destroyAccount() {
      let token = localStorage.getItem("TOKEN") || "";
      Dialog.confirm({
        title: "注销账号",
        message: "是否确定注销账号，一旦注销无法恢复！",
      })
        .then(() => {
          res.request({
            url: "/destroyAccount",
            method: "post",
            data: {
              tokenString: token,
            },
          }).then((data) =>{
            console.log("注销账号信息",data);
            if(data.code == 'G001'){
              this.$toast.success(data.msg);
              localStorage.clear();
              //重新登录
              this.goLogin();
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    //退出登录
    outLogin() {
      let token = localStorage.getItem("TOKEN") || "";
      //发送退出登录请求
      res
        .request({
          url: "/logout",
          method: "post",
          data: {
            tokenString: token,
          },
        })
        .then((data) => {
          console.log("退出登录信息", data);
          this.$toast.success(data.msg);
          localStorage.clear();
          this.goLogin();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.my {
  //height: 667px;
  background-color: #f7f7f7;
}
.van-cell {
  height: 68px;
}
.personimg {
  float: left;
  position: relative;
  height: 30%;
}
.head {
  float: right;
  width: 30px;
  height: 30px;
  margin-top: -195px;
  margin-right: 20px;
  .buttonBg {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    //z-index: 9999;
  }
}
/deep/ .van-popup {
  width: 100%;
  height: auto;
}
.popBg {
  width: 100%;
  height: auto;
}

.banner {
  width: 94%;
  height: auto;
  background-color: rgba(252, 249, 249, 0.6);
  float: left;
  margin-top: 160px;
  margin-left: 3%;
  border-radius: 10px;
  position: absolute;
  //z-index: 9999;
  .headimg {
    float: left;
    border: 1px solid rgb(128, 123, 123);
    margin-top: 10px;
    margin-left: 10px;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    overflow: hidden;
  }
  .content-head {
    float: left;
    margin-bottom: 40px;
    //background-color: blueviolet;
    width: 98%;
  }
  .name {
    float: left;
    width: 120px;
    height: 26.4px;
    margin-top: 12px;
    margin-left: 0px;
    font-weight: bold;
    color: rgb(68, 68, 227);
    font-size: 20px;
  }
  .personsign {
    float: left;
    width: 240px;
    text-align: left;
    //background-color: red;
    margin-top: 12px;
    margin-left: 20px;
    font-size: 14px;
    color: #ada8a8;
  }
  .personal,
  .dingdan,
  .shoucang,
  .area,
  .set {
    width: 96%;
    height: 40px;
    //background-color: rgb(228, 115, 115);
    float: left;
    margin-top: 10px;
    margin-left: 2%;
    border: 1px solid rgba(40, 42, 42, 0.1);
    border-top: none;
    border-left: none;
    border-right: none;
    .text {
      float: left;
      margin-top: 10px;
      margin-left: 5px;
      font-size: 15px;
    }
    .jiantou {
      float: right;
      font-size: 20px;
      color: #c4b8b8;
      margin-top: 6px;
      margin-right: 5px;
    }
  }
}
.savebanner {
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
.menulist {
  width: 94%;
  height: auto;
  background-color: rgba(252, 249, 249, 1);
  float: left;
  margin-top: 80px;
  margin-left: 3%;
  border-radius: 10px;
  position: absolute;
  .xiugai,
  .zhuxiao {
    width: 96%;
    height: 40px;
    //background-color: rgb(228, 115, 115);
    float: left;
    margin-top: 10px;
    margin-left: 2%;
    border: 1px solid rgba(40, 42, 42, 0.1);
    border-top: none;
    border-left: none;
    border-right: none;
    .text {
      float: left;
      margin-top: 10px;
      margin-left: 5px;
      font-size: 15px;
    }
    .jiantou {
      float: right;
      font-size: 20px;
      color: #c4b8b8;
      margin-top: 6px;
      margin-right: 5px;
    }
  }
}
.tuichu {
  float: left;
  margin-top: 140px;
  margin-left: 5%;
  width: 90%;
  height: 40px;
  border: 1px solid rgba(40, 38, 38, 0.2);
  background-color: rgb(9, 28, 233);
  border-radius: 20px;
  .quitlogin {
    float: left;
    color: rgb(255, 255, 255);
    //text-align: center;
    margin-left: 42%;
    margin-top: 8px;
  }
}
.pwdtitle {
  font-size: 17px;
  float: left;
  margin-left: 15px;
  margin-top: 15px;
}
.pwdinput {
  width: 100%;
  float: left;
  position: absolute;
  margin-top: 70px;
  .changebutton {
    float: left;
    margin-left: 5%;
    margin-top: 40px;
    width: 90%;
    height: 40px;
    background-color: rgb(60, 60, 241);
    border-radius: 20px;
  }
  .changetext {
    float: left;
    color: white;
    width: 60px;
    height: 25px;
    font-size: 16px;
    margin-top: 8px;
  }
}
</style>