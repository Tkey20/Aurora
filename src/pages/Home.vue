<template>
  <el-container>
    <el-header height="52px">
      <home-header></home-header>
    </el-header>
    <el-main>
      <home-main></home-main>
    </el-main>
  </el-container>
</template>

<script>
import HomeHeader from "./Home/mainHeader.vue";
import HomeMain from "./Home/main.vue";
export default {
  name: "home",
  components: {
    HomeHeader,
    HomeMain,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  // position: sticky;
  // top: 0;
  // z-index: 10;
  min-width: 1000px;
  background-color: #ffffff9f;
  padding: 0;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.el-aside {
  // height: 100vh;
  border-radius: @radius_size;
  background-color: rgb(234, 246, 253);
}
.el-main {
  overflow: visible;
  height: 100%;
  // margin: 0 auto;
  // margin-top: 50px;
  padding: 10px 16px 0px 16px;
  background-color: rgb(234, 246, 253);
}
// .guide-wrapper{
//   position: absolute;
//   left: 400px;
//   top: 18px;
//   cursor: pointer;
//   z-index: 1;
//   span{
//     font-size: 17px;
//     margin-right: 5px;
//   }
//   span:hover i{
//     transform:rotate(10deg);
//     // color: blueviolet;
//     transition: 1s ease;
//   }
// }
// .el-container /deep/ .el-drawer{
//   width: 16% !important;
//   .page_wrap{
//     display: flex;
//     flex-direction: column;
//     font-size: 14px;
//     span{
//       height: 36px;
//     }
//   }
// }
</style>
