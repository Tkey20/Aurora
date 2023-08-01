<template>
  <header class="headerWrap">
    <el-row>
      <el-col :span="7" class="main-title">
        <router-link to="/PublicPage" class="name">Aurora</router-link>
        <i class="headerLine"></i>
      </el-col>
      <el-col :span="10" class="publish-text">
        <span class="header-title">{{ title }}</span>
      </el-col>
      <el-col :span="7" class="avatar-wrapper">
        <el-popover
          placement="top-start"
          trigger="hover"
          popper-class="header_pop"
        >
          <template #reference>
            <el-avatar shape="circle" :size="40" :src="avatarPic"></el-avatar>
          </template>
          <div
            class="personal_info1"
            style="display: flex; flex-direction: column"
          >
            <router-link to="/Settings">
              <el-button class="el-icon-user btnTitle">个人中心</el-button>
            </router-link>
            <el-button
              @click="exitToLogin"
              class="el-icon-switch-button btnExit"
              >退出</el-button
            >
          </div>
        </el-popover>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      AvatarSrc:
        "https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp",
    };
  },
  props: ["title"],
  computed: {
    ...mapState(["avatarPic"]),
  },
  methods: {
    exitToLogin() {
      window.sessionStorage.setItem("token", "");
      this.$router.push("/Login");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  min-width: 1000px;
  background-color: #ffffff9f;
  padding: 0;
  margin-bottom: 10px;
  height: 52px;
  // border-bottom: 1px solid #ccc;
}
.el-row {
  height: 100%;
  box-shadow: 0px 2px 5px #dadadac2;
  margin: 0;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)
  // box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}
.el-col {
  height: 100%;
  display: flex;
  align-items: center;
}
.headerLine {
  margin-left: 17px;
  height: 29px;
  width: 1px;
  background-color: #ebebeb;
}
.header-title {
  margin-left: 16px;
  color: #121212;
  font-weight: 600;
  font-synthesis: style;
}
.name {
  // width: 244px;
  margin-left: auto;
  cursor: pointer;
  font-size: 38px;
  // color: rgb(0, 255, 179);
  color: cornflowerblue;
  text-shadow: 2px 2px #ccc;
  font-weight: bold;
}
.avatar-wrapper {
  justify-content: center;
}
.personal_info1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btnTitle {
    width: 100px;
    margin: 0;
    padding: 10px;
  }
  .btnExit {
    display: flex;
    margin-top: 7px;
    padding-left: 12px;
  }
  .el-button /deep/ span {
    margin-left: 5px;
  }
}
.el-avatar {
  cursor: pointer;
}
</style>
