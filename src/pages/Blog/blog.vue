<template>
  <div>
    <common-header :title="headerTitle"></common-header>
    <div class="blog_wrapper">
      <div class="article-card">
        <div class="user-avt">
          <span>
            <el-avatar
              shape="circle"
              :size="45"
              :src="article_info.avatar"
            ></el-avatar>
          </span>
        </div>
        <div class="user-mood">
          <span>{{ article_info.emoji }}</span>
        </div>
        <div class="main-info">
          <div class="user-msg">
            <div class="nickName">
              <span>{{ article_info.nickName }}</span>
            </div>
            <div class="user-date">
              <span>{{ article_info.createtime | publishDate }}</span>
            </div>
          </div>
          <div class="article-title">
            <span class="tag_title_wrapper">
              <i class="iconfont icon-taiyang-xuanze"></i>
              <span @click="toBlog(article_info.tid)" class="tag_title">
                {{ article_info.title }}</span
              >
            </span>
          </div>
          <div class="article-text">
            <span @click="toBlog(article_info.tid)">{{
              article_info.tcontent
            }}</span>
          </div>
          <div class="article-pic" v-if="article_info.tpicture">
            <img :src="article_info.tpicture" alt="" />
          </div>
          <div class="article-actions">
            <div class="dianzan">
              <span>
                <span
                  class="like"
                  :class="{ active: article_info.like }"
                  @click="likeClick(article_info, article_info.tid)"
                  ><i class="iconfont icon-dianzan"></i
                  >{{ article_info.favour }}</span
                >
              </span>
            </div>
            <div class="pinlun">
              <span>
                <span
                  class="comment"
                  :class="{ active: onAndOff }"
                  @click="getCommentList(article_info)"
                  ><i class="iconfont icon-pinglun"></i
                  >{{ article_info.commentcount }}</span
                >
              </span>
            </div>
            <div class="shoucang">
              <span>
                <span
                  :class="{ active: article_info.collect }"
                  @click="collectClick(article_info, article_info.tid)"
                >
                  <i class="iconfont icon-yanjing"></i>{{ article_info.views }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-container" v-if="onAndOff">
        <comments :commentInfo="article_info"></comments>
      </div>
    </div>
  </div>
</template>

<script>
import { findViews, updateFavour, getTrendsInfo } from "@/api/blog.js";
// import * as CommentData from '../comment/mockdata'
export default {
  components: {
    CommonHeader: () => import("../Home/header.vue"),
    comments: () => import("../../components/comment/comment.vue"),
  },
  data() {
    return {
      headerTitle: "详细动态",
      // 传输给评论表
      commentInfo: {},
      // article_info: {
      //   tid: 1,
      //   avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //   nickName: 'TKEY',
      //   emoji: '\uD83E\uDD20',
      //   createtime: 1642749686132,
      //   title: '甜品治愈一切不开心',
      //   tcontent: '今天真的真的很开心😊！！',
      //   favour: 950,
      //   reported: 168,
      //   views: 889,
      //   onAndOff: true,
      //   imgUrl: 'https://i0.hdslb.com/bfs/album/e172e847a81bb7812534690be4dca5cf256c190f.jpg@320w_181h_1e_1c.webp',
      //   spirit_text: '当初是你要分开分开就分开， 现在又要用真爱把我哄回来,爱情不是你想卖想买就能卖， 让我挣开让我明白放手你的爱,出卖我的爱逼着我离开最后， 知道真相的我眼泪知道真相的我眼泪掉下知道真相的我眼泪掉下知道真相的我眼泪掉下掉下来'
      // },
      views: 0,
      // commentData: [],
      article_info: {},
      onAndOff: true,
    };
  },
  methods: {
    async viewsadd() {
      const { data: res } = await findViews({
        tid: this.$route.params.id,
      });
      const { data: res1 } = await getTrendsInfo({
        tid: this.$route.params.id,
        views: res,
      });
      this.article_info = res1;
      this.views = res;
      console.log(res1);
    },
    async likeClick(item, tid) {
      console.log(item);
      if (item.like) {
        await updateFavour({
          tid: tid,
          count: --item.favour,
          isLike: false,
        });
        // console.log(item);
      } else {
        await updateFavour({
          tid: tid,
          count: ++item.favour,
          isLike: true,
        });
        // console.log(item);
      }
      item.like = !item.like;
    },
    getCommentList(item) {
      this.commentInfo = item;
      console.log(item);
      this.onAndOff = !this.onAndOff;
    },
  },
  created() {
    // this.commentData = CommentData.comment.data
    this.viewsadd();
  },
};
</script>

<style lang="less" scoped>
.blog_wrapper {
  width: 628px;
  margin: 0 auto;
}
// 发表的文章样式
.article-card {
  // margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: @radius_size @radius_size 0 0;
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
  margin-top: 5px;
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
      color: rgb(255, 187, 61);
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
  margin-top: 5px;
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
