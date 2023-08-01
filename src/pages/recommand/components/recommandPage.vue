<template>
  <div class="allMain">
    <el-skeleton :loading="loading" animated>
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
      <div
        class="artComWrapper"
        v-for="item of publicInfo"
        :key="item.id"
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
            <div @click="toBlog(item.tid)">
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
    </el-skeleton>
  </div>
</template>

<script>
// import * as CommentData from '../../comment/mockdata'
import { getTrends, updateFavour } from "@/api/recommand.js";
import "../../../assets/styles/animate.css";
export default {
  name: "PublicPage",
  data() {
    return {
      loading: false,
      // commentData: [],
      commentsFlag: false,
      // publicInfo: [],
      // 传输给评论表
      commentInfo: {},
      publicInfo: [
        {
          tid: 1,
          avatar:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          nickname: "TKEY",
          emoji: "\uD83E\uDD20",
          createtime: 1642749686132,
          title: "甜品治愈一切不开心",
          tcontent: "今天真的真的很开心😊！！",
          favour: 950,
          reported: 168,
          views: 889,
          onAndOff: false,
          imgUrl:
            "https://i0.hdslb.com/bfs/album/e172e847a81bb7812534690be4dca5cf256c190f.jpg@320w_181h_1e_1c.webp",
          spirit_text:
            "当初是你要分开分开就分开， 现在又要用真爱把我哄回来,爱情不是你想卖想买就能卖， 让我挣开让我明白放手你的爱,出卖我的爱逼着我离开最后， 知道真相的我眼泪知道真相的我眼泪掉下知道真相的我眼泪掉下知道真相的我眼泪掉下掉下来",
        },
        {
          tid: 2,
          avatar:
            "https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          nickname: "xbm",
          emoji: "🤗",
          createtime: 1542749686132,
          title:
            "选一个方向，定一个时间；剩下的只管努力与坚持，时间会给我们最后的答案。",
          tcontent:
            "梦想，可以天花乱坠，理想，是我们一-步一个脚印踩出来的坎坷道路。 —— 三毛",
          reported: 750,
          favour: 168,
          views: 889,
          onAndOff: false,
          spirit_text:
            "当初是你要分开分开就分开， 现在又要用真爱把我哄回来,爱情不是你想卖想买就能卖， 让我挣开让我明白放手你的爱,出卖我的爱逼着我离开最后， 知道真相的我眼泪知道真相的我眼泪掉下知道真相的我眼泪掉下知道真相的我眼泪掉下掉下来",
        },
        {
          tid: 3,
          avatar:
            "https://img2.baidu.com/it/u=3803635102,3335465051&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683478800&t=313d70e64be0d524badb052f62ccc5c9",
          nickname: "liLing",
          emoji: "😜",
          createtime: 1542749686132,
          title: "考研冲冲冲！！！",
          tcontent: "努力把平凡的日子堆砌成伟大的人生。 —— 俞敏洪",
          reported: 750,
          favour: 168,
          views: 889,
          onAndOff: false,
          spirit_text:
            "当初是你要分开分开就分开， 现在又要用真爱把我哄回来,爱情不是你想卖想买就能卖， 让我挣开让我明白放手你的爱,出卖我的爱逼着我离开最后， 知道真相的我眼泪知道真相的我眼泪掉下知道真相的我眼泪掉下知道真相的我眼泪掉下掉下来",
        },
        {
          tid: 4,
          avatar:
            "https://img1.baidu.com/it/u=3162597535,1356414552&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683478800&t=e6f6dfcd68d86973cb75bfc6ad646f15",
          nickname: "xbm",
          emoji: "😊",
          createtime: 1542749686132,
          title: "少年的肩，应该担起草长莺飞和明月清风",
          tcontent:
            "思路清晰远比卖力苦干重要，心态正确远比现实表现重要，选对方向远比努力做事重要，做对的事情远比把事情做对重要。 —— 李嘉诚",
          reported: 750,
          favour: 168,
          views: 889,
          onAndOff: false,
          spirit_text:
            "当初是你要分开分开就分开， 现在又要用真爱把我哄回来,爱情不是你想卖想买就能卖， 让我挣开让我明白放手你的爱,出卖我的爱逼着我离开最后， 知道真相的我眼泪知道真相的我眼泪掉下知道真相的我眼泪掉下知道真相的我眼泪掉下掉下来",
        },
      ],
      userAnother: {},
    };
  },
  components: {
    comments: () => import("../../../components/comment/comment.vue"),
  },
  methods: {
    async getRecommandList() {
      this.loading = false;
      const { data: res } = await getTrends({
        uid: window.sessionStorage.getItem("uid"),
      });
      // 当列表渲染完毕再消失
      this.$nextTick((_) => {
        this.loading = false;
      });
      // this.publicInfo = res;
      console.log(res);
    },
    toBlog(article_id) {
      this.$router.push(`/article/${article_id}`);
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
        await updateFavour({
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
.allMain {
  min-height: 600px;
}
.skeleton_wrapper {
  background-color: #ffffff;
  border-radius: @radius_size;
}
// 发表的文章样式
.article-card {
  animation: fadeInUp 1.3s;
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
