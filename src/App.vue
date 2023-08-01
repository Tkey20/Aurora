<template>
  <div id="app">
    <transition name="slide-left" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import "./assets/styles/global.css";
export default {
  name: "app",
  updated() {
    this.$store.commit("uidChange", window.sessionStorage.getItem("uid"));
  },
};
</script>
<style>
#app {
  width: 100vw;
  height: 100%;
  background-color: rgb(234, 246, 253);
}
.slide-left-enter {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-enter-active {
  transition: all 0.5s ease;
}
.slide-left-leave-to {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.slide-left-leave-active {
  transition: all 0.5s ease;
}
.el-popover {
  min-width: 120px !important;
}
</style>
