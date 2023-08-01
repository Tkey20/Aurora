<template>
  <div class="allMain">
    <el-skeleton :loading="loading" animated>
      <div
        class="skeleton_wrapper"
        style="height: 160px; border-top: 1px solid #eee"
        slot="template"
      >
        <div
          class="skeleton_main"
          style="display: flex; flex-direction: column; margin: 0 0 0 20px"
        >
          <el-skeleton-item
            variant="text"
            style="width: 30%; margin-top: 20px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 90%; margin-top: 20px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 70%; margin-top: 20px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 50%; margin-top: 20px"
          />
        </div>
      </div>
      <div
        class="artComWrapper"
        v-for="(item, index) of recommendInfo"
        :key="index"
        slot="default"
      >
        <div class="article-card">
          <div class="recommand_img">
            <a :href="item.bookUrl">
              <img :src="item.bookPicture" fit="fit" class="bookImg" />
            </a>
          </div>
          <div class="user-mood">
            <span
              class="iconfont icon-aixin"
              :class="{ active: item.onAndOff }"
              @click="userInterest(item)"
            ></span>
          </div>
          <div class="main-info">
            <div class="recommand-msg">
              <div class="title">
                <a :href="item.bookUrl">{{ item.bookName }}</a>
              </div>
            </div>
            <div class="author">
              <span>{{ item.author }}</span>
            </div>
            <div class="article-text">
              <a :href="item.bookUrl">{{ item.describes }}</a>
            </div>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
import { recommendBookList } from "../../../config";
import "../../../assets/styles/animate.css";
import { getBooks, likeBooks } from "@/api/recommand.js";
import "../../../assets/styles/animate.css";
export default {
  name: "recommandPage",
  data() {
    return {
      loading: false,
      recommendInfo: recommendBookList,
      // recommendInfo: [],
      loveFlag: false,
    };
  },

  methods: {
    async userInterest(item) {
      item.onAndOff = !item.onAndOff;
    },
  },
};
</script>

<style lang="less" scoped>
// 发表的文章样式
.skeleton_wrapper {
  background-color: #ffffff;
  border-radius: 10px;
}
.allMain {
  border-radius: @radius_size;
  // background-color: #FFFFFF;
  // border-left: 1px solid #eee;
  // border-right: 1px solid #eee;
  // border-bottom: 1px solid #eee;
}
.article-card {
  position: relative;
  border-top: 1px solid @b_color;
  display: flex;
  height: 176px;
  width: 100%;
  background-color: #ffffff;
  border-radius: @radius_size;
  margin-top: 5px;
  animation: fadeInUp 1.3s;
}
.recommand_img {
  position: absolute;
  left: 20px;
  top: 10px;
  .bookImg {
    height: 140px;
  }
}
.user-mood {
  position: absolute;
  font-size: 30px;
  right: 25px;
  top: 16px;
  span {
    font-size: 28px;
    color: #eee;
    cursor: pointer;
    &.active {
      color: @color-danger;
      animation: bounceIn 1s;
    }
  }
}
// 文章主体样式
.main-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  margin: 0px 5px 20px 145px;
}
.recommand-msg {
  .title {
    font-size: 15px;
    font-weight: bold;
  }
}
.author {
  height: 28px;
  line-height: 28px;
  #ellipsis();
  span {
    font-size: 13px;
    cursor: pointer;
  }
}
.article-text {
  display: flex;
  max-height: 100px;
  a {
    font-size: 13px;
    line-height: 23px;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a:hover {
    color: rgba(51, 51, 51, 0.801);
  }
}
</style>
