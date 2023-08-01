import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "./plugins/element.js";
import "./assets/styles/global.css";
import "./assets/styles/iconfont.css";
import "./assets/styles/reset.css";
import "./assets/font/font.css";
import axios from "axios";
// 关闭vue生产提示
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://47.113.187.131:8082/";
// axios.defaults.baseURL = 'http://xbm0316.vaiwan.com'
// 设置全局过滤器
Vue.filter("publishDate", function(time) {
  const d = new Date(time);
  return d.toString().slice(4, 24);
});
Vue.filter("dateFormate", function(time) {
  const d = new Date(time);
  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate()
  );
});

new Vue({
  router,
  store,
  // 将app组件放入容器中
  render: h => h(App)
}).$mount("#app");
