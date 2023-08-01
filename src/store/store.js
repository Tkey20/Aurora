import Vue from "vue";
import Vuex from "vuex";
import { userPage } from "./userPage";
import { publicPage } from "./publicPage";
import { targetList } from "./target";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: "1",
    nickName: "TKEY",
    avatarPic:
      "https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp",
    sign: "一个会写注释的前端程序猿",
    school: "广东第二师范学院"
  },
  mutations: {
    uidChange(state, id) {
      state.uid = id;
    },
    avatarChange(state, picUrl) {
      state.avatarPic = picUrl;
    },
    nickNameChange(state, name) {
      state.nickName = name;
    },
    signNameChange(state, sign) {
      state.sign = sign;
    },
    schoolChange(state, school) {
      state.school = school;
    }
  },
  actions: {},
  modules: {
    userPage,
    publicPage,
    target: targetList
  }
});
