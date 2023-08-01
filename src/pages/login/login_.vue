<template>
  <div class="container" :class="{ sign_up_mode: sign_mode }">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录表单 -->
        <form action="#" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="iconfont icon-yonghu"></i>
            <input
              v-model="username"
              type="text"
              placeholder="用户名"
              ref="UserName"
            />
          </div>
          <div class="input-field">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              placeholder="密码"
              ref="password"
              v-model="password"
              @keyup.enter="loginToHome"
            />
          </div>
          <input
            type="button"
            value="Login"
            class="btn solid"
            @click="loginToHome"
          />
        </form>
        <!-- 注册表单 -->
        <form action="#" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
            <i class="iconfont icon-yonghu"></i>
            <input type="text" placeholder="用户名" ref="registUsername" />
          </div>
          <div class="input-field">
            <i class="iconfont icon-nicheng"></i>
            <input type="text" placeholder="昵称" ref="registNickname" />
          </div>
          <div class="input-field">
            <i class="iconfont icon-icon-zhanghao"></i>
            <input type="text" placeholder="学号" ref="sno" />
          </div>
          <div class="input-select">
            <el-select v-model="selectSchool" filterable placeholder="请选择">
              <el-option
                v-for="item in schoolOptions"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="radio">
              <el-radio v-model="sex" label="male">男</el-radio>
              <el-radio v-model="sex" label="female">女</el-radio>
            </div>
          </div>
          <div class="input-field">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              placeholder="密码"
              ref="registPassword"
              @keyup.enter="registToHome"
            />
          </div>
          <input
            type="button"
            class="btn"
            value="Sign up"
            @click="registToHome"
          />
        </form>
      </div>
    </div>

    <div class="panels-container">
      <!-- 登录时左边的图像内容还有 去注册的按钮 -->
      <div class="panel left-panel">
        <div class="content" style="padding-right: 45%">
          <h3>New Here ?</h3>
          <!-- <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p> -->
          <p>欢迎来到情绪树洞！！</p>
          <button class="btn transparent" id="sign-up-btn" @click="loginChange">
            Sign up
          </button>
        </div>
        <img src="@assets/img/log.svg" class="image" alt="" />
      </div>
      <!-- 注册时右边的图像内容还有 去登录的按钮 -->
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>欢迎来到情绪树洞!!</p>
          <!-- <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p> -->
          <button class="btn transparent" id="sign-in-btn" @click="loginChange">
            Sign in
          </button>
        </div>
        <img src="@assets/img/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { school } from "../../config";
import { login, register } from "../../api/login";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      sign_mode: false,
      loginForm: {},
      registForm: {},
      selectSchool: "",
      schoolOptions: school,
      username: "aurora",
      password: "123456",
      sex: "",
    };
  },
  methods: {
    ...mapMutations(["uidChange", "avatarChange"]),
    loginChange() {
      this.sign_mode = !this.sign_mode;
    },
    async loginToHome() {
      if (!this.$refs.UserName.value || !this.$refs.password.value) {
        return this.$message.error("请输入用户名或密码！");
      } else if (this.$refs.UserName.value === "admin") {
        this.$message.success("登录成功！");
        this.$router.push("/admin");
      } else {
        // let name = this.$refs.UserName.value
        // let pwd = this.$refs.password.value
        // this.loginForm.username = name
        // this.loginForm.password = pwd
        // // 1 axios请求后台数据
        // // 2 看返回数据状态码 是否为200 保存token 到sessionstorage里面 以便路由跳转
        // // console.log(this.loginForm);
        // this.$message('正在登陆中 请稍后。。。')
        // const { data: res } = await login(this.loginForm).catch(() => { return this.$message.error('登录失败！请重新登录') })
        // if (res.code !== 1) {
        //   return this.$message.error('登录失败！请重新登录')
        // }
        // this.$message.success('登录成功！')
        // console.log(res);
        // window.sessionStorage.setItem('token', res.data.token)
        // window.sessionStorage.setItem('uid', res.data.user.uid)
        // window.localStorage.setItem('avatar', res.data.user.avatar)
        // // 将用户的唯一id提交到vuex
        // this.uidChange(window.sessionStorage.getItem('uid'))
        // this.avatarChange(res.data.user.avatar)
        this.$router.push("/home");
      }
      this.$router.push("/home");
    },
    async registToHome() {
      let name = this.$refs.registUsername.value;
      let nickname = this.$refs.registNickname.value;
      let pwd = this.$refs.registPassword.value;
      let sno = this.$refs.sno.value;
      if (!this.sex) {
        return this.$message.error("请选择性别！");
      }
      if (!this.selectSchool) {
        return this.$message.error("请选择您的学校！");
      }
      if (pwd.length < 8) {
        return this.$message.error("密码长度应大于8位");
      }
      if (pwd.indexOf(" ") !== -1) {
        return this.$message.error("密码输入内容包含空格，请重新输入");
      }
      this.$message("正在注册登陆中 请稍后。。。");
      // axios异步请求发送用户信息给后端
      this.registForm.username = name;
      this.registForm.password = pwd;
      this.registForm.nickname = nickname;
      this.registForm.school = this.selectSchool;
      this.registForm.sex = this.sex;
      this.registForm.sno = sno;
      console.log(this.registForm);
      const { data: res } = await register(this.registForm).catch(() => {
        return this.$message.error("注册失败！请重新注册");
      });
      if (res.code !== 1) {
        return this.$message.error(res.msg);
      }
      this.$message.success(res.msg);
      console.log(res);
      window.sessionStorage.setItem("token", res.data.token);
      window.sessionStorage.setItem("uid", res.data.user.uid);
      window.localStorage.setItem("avatar", res.data.user.avatar);
      // 将用户的唯一id提交到vuex
      this.uidChange(window.sessionStorage.getItem("uid"));
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
// @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 35px;
  color: #444;
  margin-bottom: 15px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}
// 学校选择框
.input-select {
  max-width: 380px;
  width: 100%;
  // background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  padding: 0 0.4rem;
  display: flex;
  justify-content: space-between;
  .el-select {
    height: 100%;
  }
  .radio {
    margin: auto 0;
    .el-radio {
      margin-left: 5px;
    }
  }
}
.el-select /deep/ .el-input {
  height: 100%;
  .el-input__inner {
    height: 100%;
    // background-color: #f0f0f0;
    width: 200px;
    border-radius: 55px;
  }
}
.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  // background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  // background-color: #6086c7e0;
  background-color: rgb(95, 162, 215);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 4.8rem 20% 2rem 8%;
}

.right-panel {
  pointer-events: none;
  padding: 4.8rem 12% 2rem 17%;
}

.panel .content {
  // margin-right: 150px;
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 1rem;
  padding: 1rem 0;
  line-height: 25px;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign_up_mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign_up_mode .left-panel .image,
.container.sign_up_mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign_up_mode .signin-signup {
  left: 25%;
}

.container.sign_up_mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign_up_mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign_up_mode .right-panel .image,
.container.sign_up_mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign_up_mode .left-panel {
  pointer-events: none;
}

.container.sign_up_mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign_up_mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign_up_mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign_up_mode .left-panel .image,
  .container.sign_up_mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign_up_mode .right-panel .image,
  .container.sign_up_mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign_up_mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign_up_mode:before {
    bottom: 28%;
    left: 50%;
  }
}
.icon-icon-zhanghao {
  font-size: 18px;
}
</style>
