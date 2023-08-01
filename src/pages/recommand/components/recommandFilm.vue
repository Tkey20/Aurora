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
            <a :href="item.nameUrl">
              <img :src="item.filmPicture" fit="fit" class="bookImg" />
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
                <a :href="item.nameUrl">{{ item.filmName }}</a>
              </div>
            </div>
            <div class="author">
              <span
                ><a :href="item.nameUrl">{{ item.moviecrew }}</a></span
              >
            </div>
            <div class="movePublish">
              <a :href="item.nameUrl">{{ item.moviemisc }}</a>
            </div>
            <div class="movieRate">
              <el-rate
                v-model="item.grade"
                disabled
                show-score
                :max="10"
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
import { recommendFilmList } from "@/config/index.js";
import { getFilms, likeFilms } from "@/api/recommand.js";
import "../../../assets/styles/animate.css";
export default {
  name: "recommandFilm",
  data() {
    return {
      loading: false,
      value: 8.7,
      recommendInfo: recommendFilmList,
      onAndOff: false,
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
  width: 100%;
  background-color: #ffffff;
  position: relative;
  border-top: 1px solid @b_color;
  display: flex;
  height: 176px;
  border-radius: @radius_size;
  animation: fadeInUp 1.3s;
  margin-top: 5px;
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
  margin-top: 8px;
  line-height: 20px;
  span {
    // max-width: 520px;
    // min-width: 520px;
    font-size: 13px;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a:hover {
    color: rgba(51, 51, 51, 0.801);
  }
}
.movePublish {
  display: flex;
  margin-top: 5px;
  max-height: 100px;
  a {
    font-size: 13px;
    line-height: 23px;
    cursor: pointer;
  }
  a:hover {
    color: rgba(51, 51, 51, 0.801);
  }
}
.movieRate {
  flex: 1;
  position: relative;
  .el-rate {
    position: absolute;
    bottom: 0;
  }
}
</style>
