<!--评论模块-->
<template>
  <div class="container">
    <div class="comment_title">
      <span>全部评论</span>
    </div>
    <div class="userInput_wrapper">
      <div class="user_avatar">
        <el-avatar shape="circle" :size="45" :src="avatarUrl"></el-avatar>
      </div>
      <div class="comment_input">
        <el-input
          type="textarea"
          @keyup.enter="addComment"
          id="textB"
          class="comment_textarea"
          :rows="3"
          :autosize="{ minRows: 3, maxRows: 6 }"
          placeholder="有什么想和大家分享的?"
          v-model="comment_textareaValue"
        ></el-input>
        <span class="emojiChoose">
          <emoji-input @inputEmoji="handleEmoji"></emoji-input>
        </span>
      </div>
      <el-button type="primary" class="btnPublish" @click="addComment"
        >发表评论</el-button
      >
    </div>
    <div class="comment_items_wrapper">
      <div class="comment" v-for="(item, index) in commentData" :key="index">
        <div class="info">
          <img class="avatar" :src="item.avatar" width="36" height="36" />
          <div class="right">
            <div class="name">{{ item.nickname }}</div>
            <div class="date">
              {{ item.commenttime | publishDate }}
              <span style="margin-left: 10px">#{{ item.school }}</span>
            </div>
          </div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="control">
          <span
            class="like"
            :class="{ active: item.like }"
            @click="likeClick(item)"
          >
            <i class="iconfont icon-like"></i>
            <span class="like-num">{{
              item.likeNum > 0 ? item.likeNum + "人赞" : "赞"
            }}</span>
          </span>
          <span class="comment-reply" @click="showCommentInput(item)">
            <i class="iconfont icon-comment"></i>
            <span>回复</span>
          </span>
        </div>
        <!-- <div class="reply">
          <div class="item" v-for="reply in item.reply" :key="reply.date">
            <div class="reply-content">
              <span class="from-name">{{reply.fromName}}</span><span>: </span>
              <span class="to-name">@{{reply.toName}}</span>
              <span>{{reply.content}}</span>
            </div>
            <div class="reply-bottom">
              <span>{{reply.date}}</span>
              <span class="reply-text" @click="showCommentInput(item, reply)">
                <i class="iconfont icon-comment"></i>
                <span>回复</span>
              </span>
            </div>
          </div>
          <div class="write-reply" v-if="item.reply.length > 0" @click="showCommentInput(item)">
            <i class="el-icon-edit"></i>
            <span class="add-comment">添加新评论</span>
          </div>
          <transition name="fade">
            <div class="input-wrapper" v-if="showItemId === item.id">
              <el-input class="gray-bg-input"
                        v-model="inputComment"
                        type="textarea"
                        :rows="3"
                        autofocus
                        placeholder="写下你的评论">
              </el-input>
              <div class="btn-control">
                <span class="cancel" @click="cancel">取消</span>
                <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
              </div>
            </div>
          </transition>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import EmojiInput from "../../components/emoji/emoji_input.vue";
export default {
  props: {
    // comments: {
    //   type: Array,
    //   required: true
    // },
    commentInfo: {
      type: Object,
    },
  },
  components: {
    EmojiInput,
  },
  data() {
    return {
      commentData: [],
      inputComment: "",
      showItemId: "",
      commentNum: 2,
      comment_textareaValue: "",
      avatarUrl:
        "	https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp",
    };
  },
  computed: {},
  methods: {
    async getCommentList() {
      const { data: res } = await this.$axios.get("comment/findAllComment", {
        params: {
          tid: this.commentInfo.tid || this.$route.params.id,
        },
      });
      // this.avatarUrl = window.localStorage.getItem('avatar')
      this.commentData = res;
      console.log(res);
    },
    async addComment() {
      if (!this.comment_textareaValue.trim().length) {
        return this.$message.error("还未输入评论呀😉");
      }
      let commentValue = {};
      commentValue.tid = this.commentInfo.tid;
      commentValue.uid = window.sessionStorage.getItem("uid");
      commentValue.content = this.comment_textareaValue;
      const { data: res } = await this.$axios.post(
        "comment/addComment",
        commentValue
      );
      this.comment_textareaValue = "";
      this.getCommentList();
      console.log(res);
    },
    // 处理表情输入进去
    handleEmoji(emoji) {
      let t = document.querySelector("#textB");
      t.setRangeText(emoji, t.selectionStart, t.selectionEnd);
      this.comment_textareaValue = t.value;
      console.log(this.comment_textareaValue);
      t.focus();
    },
    /**
     * 点赞
     */
    likeClick(item) {
      console.log(item);
      if (item.isLike === null) {
        Vue.set(item, "isLike", true);
        item.likeNum++;
      } else {
        if (item.isLike) {
          item.likeNum--;
        } else {
          item.likeNum++;
        }
        item.isLike = !item.isLike;
      }
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = "";
    },

    /**
     * 提交评论
     */
    commitComment() {
      console.log(this.inputComment);
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      if (reply) {
        this.inputComment = "@" + reply.fromName + " ";
      } else {
        this.inputComment = "";
      }
      this.showItemId = item.id;
    },
  },
  mounted() {
    this.getCommentList();
    console.log(this.$route.params.id);
    // console.log(this.comments)
  },
};
</script>

<style scoped lang="less">
.comment_title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  margin: 0 20px;
  padding: 20px 0;
  font-weight: bold;
  border-top: 1px solid #eee;
}
.userInput_wrapper {
  display: flex;
  margin: 0 20px;
  padding: 20px 0;
  .user_avatar {
    width: 82px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comment_input {
    .comment_textarea {
      margin-right: 10px;
      width: 400px;
    }
    .emojiChoose {
      margin-top: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        margin-left: 5px;
        font-size: 17px;
        color: #9499a0;
      }
    }
  }
  .emojiChoose:hover {
    color: @color-main;
  }
  .comment_textarea /deep/ textarea {
    resize: none;
  }
  .btnPublish {
    width: 75px;
    height: 75px;
    padding: 0 18px;
    white-space: normal;
  }
}
.comment_items_wrapper {
  margin: 0 50px;
  // border-top: 1px solid #eee;
}
.container {
  padding-bottom: 20px;
  background-color: #ffffff;
  // padding: 0 20px;
  box-sizing: border-box;
  border-radius: 0 0 @radius_size @radius_size;
  .comment {
    // margin-left: 50px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #eee;
    .info {
      padding-top: 10px;
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
        width: 33px;
        height: 33px;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 13px;
          color: @text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: @text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: @text-main;
      line-height: 20px;
      padding: 10px;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: @text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: @color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: @text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid @border-first;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed @border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: @text-main;
          .from-name {
            color: @color-main;
          }
          .to-name {
            color: @color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: @text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: @text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: @text-minor;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: @text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        // .gray-bg-input, .el-input__inner {
        //   /*background-color: #67C23A;*/
        // }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: @text-normal;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: @text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
