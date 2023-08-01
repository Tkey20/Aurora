<template>
  <div class="recommand_wrapper">
    <!-- 导航栏 -->
    <el-menu
      class="menuDemo"
      mode="horizontal"
      menu-trigger="click"
      router
      :default-active="this.$route.path"
    >
      <el-menu-item index="/Recommand/Dynamic" class="smallItem"
        >动态</el-menu-item
      >
      <el-menu-item index="/Recommand/Film" class="smallItem"
        >电影</el-menu-item
      >
      <el-menu-item index="/Recommand/Book" class="smallItem"
        >书籍</el-menu-item
      >
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import "../../assets/styles/animate.css";
export default {};
</script>

<style lang="less" scoped>
.recommand_wrapper {
  padding-bottom: 10px;
}
.menuDemo {
  animation: fadeInUp 1s;
  border-radius: 10px;
  margin-bottom: 5px;
}
.smallItem {
  margin-left: 10px;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
}
</style>
