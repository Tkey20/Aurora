<template>
  <el-container class="main-wrapper">
    <!-- 左侧个人信息 + 导航栏展示部分 -->
    <el-aside width="244px" class="left_panel">
      <left-aside></left-aside>
    </el-aside>
    <el-main>
      <!-- 头顶发表动态 -->
      <div class="publish_wrapper">
        <publish-panel></publish-panel>
      </div>
      <!-- 中间 主页 社区 推荐部分 -->
      <router-view></router-view>
    </el-main>
    <!-- 右侧小目标 + 励志语句 -->
    <el-aside width="268px" class="right_panel">
      <div class="sticky_wrpper">
        <div class="todolist_wrapper">
          <div class="star">⭐️</div>
          <div class="todolist_input">
            <input
              type="text"
              required
              ref="UserName"
              v-model="wishText"
              @keyup.enter="updateWish"
            />
            <span></span>
            <label>近期小目标 <i class="iconfont icon-daka"></i></label>
            <i class="icon_add iconfont icon-tianjia" @click="updateWish"></i>
          </div>
          <div class="todolist_item" v-for="item of wishList" :key="item.id">
            <transition name="fade">
              <div
                class="list_item"
                @click="delDesire(item)"
                v-if="item.publicdesire"
              >
                <div class="circle_wrapper">
                  <span class="big_circle"></span>
                  <span class="small_circle"></span>
                </div>
                <div class="wish_text">{{ item.dcontent }}</div>
              </div>
            </transition>
          </div>
        </div>
        <div class="spirit_wrapper">
          <p class="title">今日份阳光 <i class="iconfont icon-taiyang"></i></p>
          <p class="spirit_text">{{ spirit_text }}</p>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import { addDesire, sideContent, showAllDesireByUser } from "@/api/main.js";
import { mapMutations, mapState } from "vuex";
import LeftAside from "./components/left_aside.vue";
import "../../assets/styles/animate.css";
import PublishPanel from "../Published/publish_panel.vue";
export default {
  components: {
    PublishPanel,
    LeftAside,
  },
  data() {
    return {
      chooseWish: "",
      wishText: "",
      encourageText: [
        "命运如同手中的掌纹，无论多曲折，终掌握在自己手中。加油吧少年！",
        "“没有比脚更远的路，没有比人更高的山”，为目标加油吧！",
        "人生没有彩排，每天都是现场直播。",
        "业精于勤，荒于嬉；行成于思，毁于随。加油！为目标加油吧！",
        "不要去想是否能够成功，既然选择了远方，便只顾风雨兼程！",
        "“成功往往在于再坚持努力一下之中”",
      ],
      complictedText: [
        "好棒哦！恭喜你又达成了一个目标！",
        "“乘风破浪会有时，直挂云帆济沧海”！继续加油吧！！",
        "“有志者，事竟成!”",
        "“风雨之后终见彩虹”，继续努力吧！",
        '"奋斗没有终点，任何时候都是一个起点",继续加油吧！！',
      ],
      tid: 2,
      avatar:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      nickname: "TKEY",
      eid: "😊",
      article_date: 1542749686132,
      article_title: "为什么李华不会英语还要交那么多外国朋友？",
      tcontent:
        "江北的小推车： 我从前有一个朋友，他叫李华。 他真是笨死了，写个英语作文都不会，又总是喜欢结交外国朋友。 我问他你是不是在网恋啊？ 他白我一眼，说你懂什么，…",
      follow: 750,
      fans: 168,
      num: 889,
      spirit_text:
        "人生总是在前行，不论走到哪里，只要带着信念往前走，比别人多一点努力，你就会多一份成绩；比别人多一点志气，你就会多一份出息；比别人多一点坚持，你就会夺取胜利；比别人多一点执着，你就会创造奇迹。",
      wishList: [],
      // wishList: [],
      // spirit_text: "",
      avatar: "",
    };
  },
  computed: {
    ...mapState("target", ["targetList"]),
  },
  created() {
    this.uidChange(window.sessionStorage.getItem("uid"));
    this.wishList = this.targetList;
  },
  methods: {
    ...mapMutations(["uidChange"]),
    ...mapMutations("target", ["addTarget", "deleteTarget"]),
    async getWishInfo() {
      const { data: res } = await showAllDesireByUser({
        uid: window.sessionStorage.getItem("uid"),
      });
      // this.wishList = res.data;
      console.log(this.wishList);
      console.log(res.data);
    },
    // 获取鸡汤
    async getSideContent() {
      const { data: res } = await sideContent();
      this.spirit_text = res;
      console.log(res);
    },
    async updateWish() {
      console.log(this.encourageText.length);
      if (!this.wishText || this.wishText.trim().length === 0) {
        return this.$message.error("还未输入小目标呀😊");
      }
      this.addTarget({
        id: Math.random() * 100,
        dcontent: this.wishText,
        publicdesire: true,
      });
      // this.wishList = this.targetList;
      this.wishText = "";
      let index = Math.floor(Math.random() * this.encourageText.length);
      this.$message.success(this.encourageText[index] + "💪");
    },
    async delDesire(item) {
      this.deleteTarget(item.id);
      // 随机鼓励的话
      let index = Math.floor(Math.random() * this.complictedText.length);
      this.$message.success(this.complictedText[index]);
      item.publicdesire = false;
      // this.wishList = this.targetList;
    },
  },
};
</script>

<style lang="less" scoped>
.main-wrapper {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  // background-color: #FFFFFF;
}
.main-wrapper /deep/ .left_panel {
  animation: fadeInLeft 1s;
}
.publish_wrapper {
  animation: fadeInUp 1s;
}
// 左边的侧边栏
.el-aside {
  overflow: visible;
  position: sticky;
}
.follow_wrapper {
  margin-top: 10px;
  padding-bottom: 10px;
  background-color: #ffffff;
  border-radius: @radius_size;
  .follow_title {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .f_title {
      font-size: 16px;
      .f_nums {
        padding-left: 8px;
        font-size: 14px;
        color: @color-info;
      }
    }
  }
  .f_more {
    font-size: 12px;
    color: @color-info;
  }
}
.follow_items {
  margin: 0 0px 18px 16px;
  display: flex;
  align-items: center;
  .follow_avatar {
    margin-right: 11px;
  }
}
.follow_info {
  padding-right: 10px;
  .follow_nickname {
    font-size: 14px;
    margin-bottom: 5px;
  }
  .follow_desc {
    font-size: 12px;
    color: #6d757a;
    line-height: 16px;
    max-height: 32px;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
// 页面主图内容
.el-main {
  // min-height: 91vh;
  overflow: hidden;
  width: 100%;
  margin: 0 10px;
  padding: 0;
  border-top: 1px solid #eee;
  // background-color: #FFFFFF;
}
// 右侧个人信息展示中心
.sticky_wrpper {
  position: sticky;
  top: 10px;
}
.todolist_wrapper {
  padding: 10px 15px 15px 15px;
  border: 1px solid @b_color;
  background-color: #ffffff;
  border-radius: @radius_size;
  animation: fadeInRight 1s;
  // align-items: center;
}
.todolist_input {
  margin-top: 10px;
  position: relative;
  display: flex;
  // margin: 30px 0;
  input {
    width: 100%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border-bottom: 2px solid #adadad;
    background: none;
    box-sizing: border-box;
    outline: none;
    &:focus ~ label,
    &:valid ~ label {
      top: 8%;
      color: #2691d9;
    }
    &:focus ~ span::before,
    &:valid ~ span::before {
      width: 88%;
    }
  }
  label {
    position: absolute;
    left: 5px;
    top: 50%;
    color: #adadad;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.5s;
  }
  span::before {
    content: "";
    position: absolute;
    top: 38.5px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #2691d9;
    transition: 0.5s;
  }
}
.icon_add {
  position: relative;
  top: 10px;
  font-size: 30px;
  color: #2691d9;
  cursor: pointer;
}
// 右上方心愿
.list_item {
  width: 88%;
  height: 35px;
  border: 2px solid #dcdfe6;
  border-radius: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  animation: fadeInDown 1s;
  transition: border 0.5s;
}
.circle_wrapper {
  width: 40px;
  height: 100%;
  position: relative;
  .big_circle {
    content: "";
    transition: border 0.5s;
    position: absolute;
    height: 15px;
    width: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #dcdfe6;
    // background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    border-radius: 50%;
    // z-index: 6;
  }
  .small_circle {
    content: "";
    position: absolute;
    height: 8px;
    width: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // border: 1px solid #dcdfe6;
    // background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    border-radius: 50%;
  }
}
.wish_text {
  font-size: 14px;
}
.list_item:hover {
  border: 2px solid skyblue;
  transition: border 0.5s;
}
.list_item:hover .big_circle {
  border: 1px solid skyblue;
  transition: border 0.5s;
}
.fade-leave-active {
  border: 2px solid skyblue;
  color: skyblue;
  .big_circle {
    border: 1px solid skyblue;
  }
  .small_circle {
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  }
  animation: fadeOutRight 1s;
}
// 右下方鸡汤文学
.spirit_wrapper {
  animation: fadeInRight 1.2s;
  padding: 10px;
  margin-top: 10px;
  // height: 100px;
  border: 1px solid @b_color;
  background-color: #ffffff;
  border-radius: @radius_size;
  .title {
    font-size: 16px;
    i {
      color: @sun_color;
    }
  }
  .spirit_text {
    text-indent: 14px;
    margin-top: 10px;
    padding: 0 10px;
    line-height: 20px;
  }
}
.MainPage_tags {
  position: absolute;
  top: 5%;
  right: 50%;
  img {
    width: 80px;
  }
}
.star {
  animation: rotateIn 0.5s;
}
</style>
