<template>
  <el-row :gutter="20">
    <el-col :span="7" class="title">
      <router-link to="/PublicPage" class="name">Aurora</router-link>
    </el-col>
    <el-col :span="10">
      <!-- <span class="guide_title">
        <span>导航</span>
        <i class="iconfont icon-daohang"></i>
      </span>  -->
    </el-col>
    <el-col :span="7">
      <el-popover
        placement="top-start"
        trigger="hover"
        popper-class="header_pop"
      >
        <template #reference>
          <el-avatar shape="circle" :size="40" :src="avatarPic"></el-avatar>
        </template>
        <div class="personal_info">
          <router-link to="/Settings">
            <el-button class="el-icon-user">个人中心</el-button>
          </router-link>
          <el-button @click="exitToLogin" class="el-icon-switch-button btnExit"
            >退出</el-button
          >
        </div>
      </el-popover>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "HomeHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["avatarPic"]),
  },
  methods: {
    toHome() {
      if (this.$route.path === "/MainPage") {
        return false;
      }
      this.$router.push("/MainPage");
    },
    exitToLogin() {
      window.sessionStorage.setItem("token", "");
      this.$router.push("/Login");
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  height: 100%;
  margin: 0 !important;
  // position: sticky;
  // top: 0;
  z-index: 10;
  // box-shadow: 0px 2px 5px #dadadac2;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)
  // box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}
.el-col {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .name {
    // width: 244px;
    cursor: pointer;
    font-size: 38px;
    // color: rgb(0, 255, 179);
    color: rgb(185, 227, 253);
    text-shadow: 2px 2px #ccc;
    font-weight: bold;
  }
}
.personal_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-button {
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
// .guide-wrapper{
//   justify-content: start;
//   cursor: pointer;
//   span{
//     font-size: 17px;
//     margin-right: 5px;
//   }
// }
// .guide-wrapper:hover i{
//   transform: rotate(180deg);
//   transition: 1s ;
// }
.el-avatar {
  cursor: pointer;
}
</style>
