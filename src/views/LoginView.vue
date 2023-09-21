<template>
  <div class="login">
    <!--导航栏开始-->
    <div class="banner">
      <img class="logo" src="../assets/icon/logo.jpg" alt="" />
      <div class="title">Luckin Coffee</div>
      <div class="guang" @click="goMenu">先逛一逛</div>
    </div>
    <!--导航栏结束-->

    <!--欢迎词开始-->
    <div class="welcome">
      <h2 class="huan">欢迎回来！</h2>
      <div class="tip">Please login to your accounts</div>
    </div>
    <!--欢迎词结束-->

    <!--输入框开始-->
    <div class="input">
      <van-form validate-first @submit="onSubmited">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="loginphone"
          name="loginphone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="loginpassword"
          name="loginpassword"
          :type="showpwd ? 'text' : 'password'"
          label="密码"
          right-icon="closed-eye"
          @click-right-icon="changeshowpwd"
          placeholder="密码必须以字母为开头"
          :rules="[{ validator: validator1, message: '请输入正确内容' }]"
        />

        <div class="forget">忘记密码？</div>
        <div
          style="
            float: left;
            margin: 16px;
            width: 90%;
            height: 40px;
            background-color: rgb(60, 60, 241);
            border-radius: 20px;
          "
        >
          <van-button round block type="info" native-type="submit">
            <div
              style="
                font-size: 16px;
                color: white;
                width: 60px;
                height: 25px;
                margin-top: 8px;
              "
            >
              登录
            </div>
          </van-button>
        </div>
        <div class="logon">
          <div class="zhuce" @click="showPopup">注册</div>
        </div>
      </van-form>
    </div>
    <!--输入框结束-->
    <div>
      <van-popup
        class="logonshow"
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '50%' }"
      >
        <div
          class="logontitle"
          style="
            font-size: 25px;
            font-weight: bold;
            float: left;
            margin-left: 15px;
            margin-top: 15px;
            color: gray;
          "
        >
          注册
        </div>
        <div
          class="logoninput"
          style="width: 100%; float: left; position: absolute; margin-top: 70px"
        >
          <van-form validate-first @submit="onSubmit">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
              v-model="logonphone"
              name="logonphone"
              label="手机号"
              placeholder="手机号"
              :rules="[{ pattern, message: '11位手机号' }]"
            />
            <van-field
              v-model="logonpassword"
              name="logonpassword"
              :type="showpwd ? 'text' : 'password'"
              label="密码"
              right-icon="closed-eye"
              @click-right-icon="changeshowpwd"
              placeholder="密码必须以字母为开头且6~15位"
              :rules="[{ validator: validator1, message: '请输入正确内容' }]"
            >
            </van-field>
            <van-field
              v-model="logonname"
              name="logonname"
              label="昵称"
              placeholder="昵称"
              :rules="[{ validator: validator2, message: '请输入正确内容' }]"
            />
            <div
              style="
                float: left;
                margin-left: 5%;
                margin-top: 8px;
                width: 90%;
                height: 40px;
                background-color: rgb(60, 60, 241);
                border-radius: 20px;
              "
            >
              <van-button round block type="info" native-type="submit">
                <div
                  style="
                    float: left;
                    color: white;
                    width: 60px;
                    height: 25px;
                    font-size: 16px;
                    margin-top: 8px;
                  "
                >
                  注册
                </div>
              </van-button>
            </div>
          </van-form>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      loginphone: "",
      loginpassword: "",
      logonphone: "",
      logonpassword: "",
      logonname: "",
      //手机号正则
      pattern: /^1[3-9]\d{9}$/,
      //pattern2: /^[A-Za-z][A-Za-z\d]{5,15}$/\
      //注册弹窗显示
      show: false,
      showpwd: false,
    };
  },
  methods: {
    goMenu() {
      //跳转
      this.$router.push({
        name: "Menu",
      });
      //自定义事件
      this.$emit("toggleEmit", 1);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    //密码正则
    validator1(val) {
      return /^[A-Za-z][A-Za-z\d]{5,15}$/.test(val);
    },
    //昵称正则
    validator2(val) {
      return /^[A-Za-z\u4e00-\u9fa5]{1,5}$/.test(val);
    },

    //显示密码
    changeshowpwd() {
      this.showpwd = !this.showpwd;
    },
    //注册界面弹出
    showPopup() {
      this.show = true;
    },
    //登录提交
    onSubmited(values) {
      console.log("提交的登录信息", values);
      if (values.loginphone == "" || values.loginpassword == "") {
        this.$notify("输入有空");
      }
      //发送登录请求
      res
        .request({
          url: "/login",
          method: "post",
          data: {
            password: values.loginpassword,
            phone: values.loginphone,
          },
        })
        .then((data) => {
          console.log("登录信息", data);
          if (data.code == 202) {
            this.$toast.fail(data.msg);
          } else if (data.code == 201) {
            this.$toast.fail(data.msg);
          } else if (data.code == 200) {
            this.$toast.success(data.msg);
            //清空输入框
            this.loginpassword = "";
            this.loginphone = "";
            //存储token
            localStorage.setItem("TOKEN", data.token);
            //跳转到首页
            this.goHome();
          }
        });
    },
    //跳转到首页
    goHome() {
      //跳转
      this.$router.push({
        name: "Home",
      });
      //自定义事件
      this.$emit("toggleEmit", 0);
    },

    //注册提交
    onSubmit(values) {
      console.log("提交的注册信息", values);
      if (
        values.logonphone == "" ||
        values.logonpassword == "" ||
        values.logonname == ""
      ) {
        this.$notify("输入有空");
      }
      //发送注册请求
      res
        .request({
          url: "/register",
          method: "post",
          data: {
            nickName: values.logonname,
            password: values.logonpassword,
            phone: values.logonphone,
          },
        })
        .then((data) => {
          console.log("注册信息", data);
          if (data.code == 102) {
            this.$toast.fail(data.msg);
          } else if (data.code == 100) {
            this.$toast.success(data.msg);
            //清空输入框
            this.logonpassword = "";
            this.logonphone = "";
            this.logonname = "";
            this.show = false;
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .van-cell {
    height: 68px;
  }
  .banner {
    height: 40px;
    border: 1px solid rgba(40, 42, 42, 0.05);
    border-top: none;
    border-left: none;
    border-right: none;
    .logo {
      width: 30px;
      height: 30px;
      float: left;
      margin-left: 15px;
      margin-top: 5px;
    }
    .title {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      font-weight: bold;
      font-size: 17px;
      color: gray;
    }
    .guang {
      float: right;
      margin-top: 10px;
      margin-right: 13px;
      color: rgb(68, 68, 235);
      font-weight: bold;
      font-size: 14px;
    }
  }
  .welcome {
    margin-top: 70px;
    width: 100%;
    height: 100px;
    //background-color: red;
    .huan {
      //background-color: blue;
      float: left;
      margin-left: 15px;
      color: gray;
    }
    .tip {
      position: absolute;
      float: left;
      margin-left: 15px;
      margin-top: 70px;
      color: rgb(185, 179, 179);
    }
  }
  .input {
    margin-top: 40px;
    .forget {
      float: right;
      margin-right: 10px;
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 13px;
    }
    .logon {
      float: left;
      margin: 16px;
      width: 90%;
      height: 40px;
      border: 1px solid rgba(40, 38, 38, 0.2);
      background-color: rgb(255, 255, 255);
      border-radius: 20px;
      .zhuce {
        float: left;
        color: rgb(34, 32, 32);
        //text-align: center;
        margin-left: 45%;
        margin-top: 8px;
      }
    }
  }
}
</style>