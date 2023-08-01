<template>
  <div class="allMain">
    <el-skeleton :loading="false" animated :throttle="500">
      <div
        class="skeleton_wrapper"
        style="height: 150px; border-top: 1px solid #eee"
        slot="template"
      >
        <div class="skeleton_header" style="display: flex; margin-top: 8px">
          <el-skeleton-item
            variant="image"
            style="
              width: 40px;
              height: 40px;
              border-radius: 20px;
              margin-left: 10px;
            "
          />
          <div style="display: flex; flex-direction: column; margin-left: 15px">
            <el-skeleton-item
              variant="text"
              style="width: 100px; height: 28px; margin-top: 5px"
            />
            <!-- <el-skeleton-item
              variant="text"
              style="width: 60px; margin-top: 5px"
            /> -->
          </div>
        </div>
        <div
          class="skeleton_main"
          style="display: flex; flex-direction: column; margin: 0 0 0 65px"
        >
          <el-skeleton-item
            variant="text"
            style="width: 30%; margin-top: 5px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 90%; margin-top: 10px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 70%; margin-top: 10px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 50%; margin-top: 10px"
          />
        </div>
      </div>
      <transition-group name="list" tag="div">
        <div
          class="artComWrapper"
          v-for="item of publicInfo"
          :key="item.tid"
          slot="default"
        >
          <div class="article-card">
            <div class="user-avt">
              <span>
                <el-avatar
                  shape="circle"
                  :size="45"
                  :src="item.avatar"
                ></el-avatar>
              </span>
            </div>
            <div class="user-mood">
              <span>{{ item.emoji }}</span>
            </div>
            <div class="main-info">
              <div @click="toBlog(item)">
                <div class="user-msg">
                  <div class="nickName">
                    <span>{{ item.nickname }}</span>
                  </div>
                  <div class="user-date">
                    <span
                      >{{ item.createtime | publishDate }}
                      <span style="margin-left: 15px"
                        >#{{ item.school }}</span
                      ></span
                    >
                  </div>
                </div>
                <div class="article-title">
                  <span class="tag_title_wrapper">
                    <i class="iconfont icon-taiyang-xuanze"></i>
                    <span class="tag_title"> {{ item.title }}</span>
                  </span>
                </div>
                <div class="article-text">
                  <span>{{ item.tcontent }}</span>
                </div>
                <div class="article-pic" v-if="item.tpicture">
                  <img :src="item.tpicture" alt="" />
                </div>
              </div>
              <div class="article-actions">
                <div class="dianzan">
                  <span>
                    <span
                      class="like"
                      :class="{ active: item.like }"
                      @click="likeClick(item, item.tid)"
                      ><i class="iconfont icon-dianzan"></i
                      >{{ item.favour }}</span
                    >
                  </span>
                </div>
                <div class="pinlun">
                  <span>
                    <span
                      class="comment"
                      :class="{ active: item.onAndOff }"
                      @click="getCommentList(item)"
                      ><i class="iconfont icon-pinglun"></i
                      >{{ item.commentcount }}</span
                    >
                  </span>
                </div>
                <div class="shoucang">
                  <span>
                    <span :class="{ active: item.collect }">
                      <i class="iconfont icon-yanjing"></i>{{ item.views }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="comment-container" v-if="item.onAndOff">
              <comments :commentInfo="item"></comments>
            </div>
          </div>
        </div>
      </transition-group>
    </el-skeleton>
  </div>
</template>

<script>
// import * as CommentData from '../../comment/mockdata'
import { mapState } from "vuex";
import { getPublicTrends } from "@/api/user.js";
import { updateFavour, updateViews } from "@/api/commonApi.js";
import "../../../assets/styles/animate.css";
export default {
  name: "PublicPage",
  data() {
    return {
      loading: true,
      // commentData: [],
      commentsFlag: false,
      // 传输给评论表
      commentInfo: {},
      publicInfo: [],
      userAnother: {},
      // publicInfo: []
    };
  },
  components: {
    comments: () => import("../../../components/comment/comment.vue"),
  },
  computed: {
    ...mapState("publicPage", ["publicTableData"]),
  },
  mounted() {
    this.publicInfo = this.publicTableData;
  },
  methods: {
    async getPublicList() {
      const { data: res } = await getPublicTrends();
      this.publicInfo = res.data;
      // 当列表渲染完毕再消失
      this.$nextTick((_) => {
        this.loading = false;
      });
      console.log(res);
    },
    toBlog(item) {
      this.$router.push({
        path: `/article/${item.tid}`,
        query: {
          articleInfo: item,
        },
      });
    },
    async likeClick(item, tid) {
      console.log(item);
      if (item.like) {
        await updateFavour({
          tid: tid,
          count: --item.favour,
          isLike: false,
        });
        console.log(item);
      } else {
        await updateFavour({
          tid: tid,
          count: ++item.favour,
          isLike: true,
        });
        console.log(item);
      }
      item.like = !item.like;
    },
    async collectClick(item, tid) {
      if (item.collect) {
        await updateViews({
          tid: tid,
          count: --item.views,
          collect: false,
        });
      } else {
        await updateViews({
          tid: tid,
          count: ++item.views,
          collect: true,
        });
      }
      item.collect = !item.collect;
    },
    // 获取评论链接
    getCommentList(item) {
      this.commentInfo = item;
      item.onAndOff = !item.onAndOff;
    },
  },
};
</script>

<style lang="less" scoped>
.skeleton_wrapper {
  background-color: #ffffff;
  border-radius: @radius_size;
}
// .artComWrapper {
//   animation: fadeInRight 1s;
// }
.list-enter-active {
  animation: fadeInUp 1.2s;
}
.list-leave-active {
  animation: fadeInRight 1.2s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}
.allMain {
  padding-bottom: 10px;
}
// 发表的文章样式
.article-card {
  cursor: pointer;
  // animation: fadeInUp 1.3s;
  margin-bottom: 10px;
  background-color: #ffffff9f;
  border-radius: @radius_size;
  // height: 150px;
  // padding: 20px;
  position: relative;
  border-top: 1px solid @b_color;
}
.user-avt {
  position: absolute;
  top: 18px;
  left: 18px;
}
.user-mood {
  position: absolute;
  font-size: 25px;
  right: 10px;
  top: 16px;
}
// 文章主体样式
.main-info {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  margin: 0px 5px 0px 75px;
}
.user-msg {
  .nickName {
    font-size: 18px;
    font-weight: bold;
  }
  .user-date {
    padding-top: 5px;
    span {
      color: #ccc;
    }
  }
}
.article-title {
  margin-top: 8px;
  #ellipsis();
  height: 25px;
  line-height: 25px;
  .tag_title_wrapper {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    cursor: pointer;
    color: @tag_color;
    // font-family: Helvetica, sans-serif;
    i {
      font-size: 20px;
      color: @sun_color;
    }
  }
  .tag_title_wrapper:hover {
    background-color: #dff6fd;
  }
}
.tag_title {
  position: relative;
  top: -1.5px;
  left: 2px;
}
.article-text {
  // margin-top: 5px;
  display: flex;
  max-height: 100px;
  span {
    font-size: 14px;
    line-height: 23px;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span:hover {
    color: rgba(51, 51, 51, 0.801);
  }
}
.article-pic {
  margin-top: 8px;
  img {
    border-radius: @radius_size;
    max-width: 300px;
  }
}
// 点赞等样式
.article-actions {
  display: flex;
  color: rgb(170, 161, 161);
  div {
    width: 92px;
    height: 50px;
    line-height: 50px;
    span {
      &.active,
      &:hover {
        color: @color-main;
      }
      cursor: pointer;
    }
    i {
      padding-right: 5px;
      font-size: 14px;
    }
  }
}
.like {
  &.active,
  &:hover {
    color: @color-main;
  }
}
.el-avatar {
  cursor: pointer;
}
</style>
