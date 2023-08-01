<template>
  <div class="wrapper">
    <div class="art_tag">
      <el-tag
        v-for="(tag, i) in title"
        :key="i"
        closable
        :disable-transitions="false"
        @close="tagDelete(tag, i)"
      >
        <i class="el-icon-edit"></i>
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="newTagVisible"
        v-model="newTagValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm(newTagValue)"
        @blur="handleInputConfirm(newTagValue)"
      >
      </el-input>
      <el-button class="btnToopic" v-else size="small" @click="showInput"
        ><i class="el-icon-edit"></i>填写标题</el-button
      >
      <emoji @getEmojiId="getEmoji"></emoji>
    </div>
    <div class="publish_text">
      <el-input
        type="textarea"
        id="textA"
        class="editor"
        ref="textArea"
        :rows="3"
        :autosize="{ maxRows: 6 }"
        placeholder="有什么想和大家分享的?"
        v-model="PublishForm.tcontent"
      ></el-input>
    </div>
    <div class="toolbar">
      <emoji-input @inputEmoji="handleEmoji"></emoji-input>
      <div class="tool_pic">
        <el-popover
          placement="bottom-start"
          title="添加图片"
          :width="200"
          trigger="click"
        >
          <el-upload
            class="avatar-uploader"
            :multiple="false"
            action="#"
            accept="image/jpg,image/jpeg"
            :show-file-list="false"
            :auto-upload="false"
            list-type="picture"
            :on-error="up_error"
            :on-change="picChange"
          >
            <img v-if="cover_pic" :src="cover_pic" class="cover_pic" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button
            class="el-icon-delete"
            size="small"
            type="primary"
            style="margin-top: 10px"
            @click="delCoverPic"
            >删除图片</el-button
          >
          <template #reference>
            <el-button class="btnTool iconfont icon-8tupian-1"></el-button>
          </template>
        </el-popover>
      </div>
      <div class="tool_at">
        <el-button class="aite_icon iconfont icon-aite"></el-button>
      </div>
      <div class="tool_unname" style="margin-left: 10px">
        <el-switch
          v-model="PublishForm.untrends"
          inactive-text="是否匿名"
          active-color="#13ce66"
          active-text="Yes"
        />
      </div>
      <div class="tool_publish">
        <el-button
          type="primary"
          class="btnPublish"
          :loading="publishLoading"
          @click="publishArt"
          >发布</el-button
        >
      </div>
    </div>
    <!-- 用户warning显示对话框 -->
    <el-dialog
      title="加油！不要放弃！"
      :visible.sync="warningDialogVisible"
      width="380px"
      @closed="toMainPage"
      custom-class="cureDialog"
    >
      <p style="text-align: center; font-size: 16px">
        {{ warningData.content }}
      </p>
      <img
        :src="warningData.picture"
        alt=""
        style="width: 300px; border-radius: 10px; margin: 18px 0px 0px 20px"
      />
      <p
        style="
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        "
        @click="handleVideoDialog"
      >
        岁月漫长，人生短暂，看下短片放松下心情吧<i
          class="el-icon-arrow-right"
        ></i>
      </p>
    </el-dialog>
    <!-- 视频对话框 -->
    <el-dialog
      title="加油！你是最棒的！"
      :visible.sync="videoDialogVisible"
      width="560px"
      @closed="toRecomand"
    >
      <video
        autoplay="autoplay"
        style="width: 500px; margin-left: 10px"
        v-if="videoDialogVisible"
      >
        <source src="./cure_video.mp4" type="video/mp4" />
      </video>
    </el-dialog>
  </div>
</template>

<script>
import { addTrends } from "@/api/publish.js";
import { mapMutations, mapActions, mapState } from "vuex";
import Emoji from "../../components/emoji/emoji.vue";
import EmojiInput from "../../components/emoji/emoji_input.vue";
export default {
  components: {
    EmojiInput,
    Emoji,
  },
  data() {
    return {
      videoDialogVisible: false,
      warningDialogVisible: false,
      PublishForm: {
        title: "",
        emoji: "",
        tcontent: "",
        tpicture: "",
        eid: "7",
        untrends: false,
      },
      title: [],
      newTagValue: "",
      newTagVisible: false,
      // tcontent: '',
      // eid: '',
      emojiActive: false,
      cover_pic: "",
      file: {},
      // 发布按钮
      publishLoading: false,
      // 警告数据
      warningData: {},
      encourageText: ["微笑拥抱每一天，做像向日葵般温暖的女子。"],
    };
  },
  computed: {
    ...mapState(["school", "nickName"]),
  },
  methods: {
    ...mapMutations(["publicTableDataChange"]),
    ...mapActions("userPage", ["userTableDataChange"]),
    getEmoji(item) {
      console.log(item);
      this.PublishForm.eid = item.eid;
      this.PublishForm.emoji = item.emoji;
    },
    tagDelete(tag, i) {
      console.log(tag, i);
      this.title.splice(i, 1);
    },
    handleInputConfirm(value) {
      // 当文本框里面没有东西输入时
      if (value.trim().length === 0) {
        this.newTagVisible = false;
        this.newTagValue = "";
        return;
      }
      console.log(value);
      // 当文本框有东西输入时,输入合法时
      this.title.push(value);
      this.newTagVisible = false;
      this.newTagValue = "";
    },
    showInput() {
      this.newTagVisible = true;
      // $nextTick就是当页面上的元素重新渲染完成之后才会调用函数内部的方法
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    up_error(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    picChange(file, fileList) {
      console.log(file, fileList);
      const isJPG = file.raw.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传的图片只能是 JPG 格式!");
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
        return;
      }
      this.file = file.raw;
      // 将图片转化为 二进制进行显示
      const reader = new FileReader();
      reader.onload = (e) => {
        this.PublishForm.tpicture = e.target.result;
      };
      reader.readAsDataURL(file.raw); // 将图片文件转化为二进制数据
      this.cover_pic = file.url;
    },
    // 删除图片
    delCoverPic() {
      this.cover_pic = "";
      this.file = {};
    },
    handleEmoji(emoji) {
      let t = document.querySelector("#textA");
      t.setRangeText(emoji, t.selectionStart, t.selectionEnd);
      this.PublishForm.tcontent = t.value;
      console.log(this.PublishForm.tcontent);
      t.focus();
    },
    // 发布动态
    async publishArt() {
      // 判断是否输入
      if (this.PublishForm.tcontent.length === 0) {
        this.publishLoading = false;
        return this.$message.error("您还没有输入内容呦😊");
      }
      if (this.title.length === 0) {
        return this.$message.error("您还没有输入标题呦😊");
      }
      // 发布按钮静止
      this.publishLoading = true;
      // 发布标题 内容 uid 给接口
      this.PublishForm.uid = window.sessionStorage.getItem("uid");
      this.PublishForm.title = this.title[0];
      this.userTableDataChange({
        tid: Math.random() * 10000,
        avatar:
          "https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp",
        nickname: this.PublishForm.untrends ? "一个有趣的人😊" : this.nickName,
        emoji: this.PublishForm.emoji || "😊",
        createtime: new Date().toLocaleString(),
        title: this.PublishForm.title,
        tcontent: this.PublishForm.tcontent,
        tpicture: this.PublishForm.tpicture,
        school: this.school,
        favour: 0,
        reported: 0,
        untrends: this.PublishForm.untrends,
        views: 0,
        onAndOff: false,
        imgUrl:
          "https://i0.hdslb.com/bfs/album/e172e847a81bb7812534690be4dca5cf256c190f.jpg@320w_181h_1e_1c.webp",
      });

      this.$message.success("发布成功！！");
      // 重置发布动态框
      this.PublishForm.tcontent = "";
      this.file = {};
      this.title = [];
      this.cover_pic = "";
      this.PublishForm.untrends = false;
      this.publishLoading = false;
      // 当你在个人主页时 就不进行跳转了
      // console.log(res.data.warning);
      // if (res.data.warning) {
      //   this.warningDialogVisible = true;
      //   this.warningData = res.data.warn;
      //   return;
      // }
      // if (this.$route.path === "/Recommand/Dynamic") {
      //   this.$router.push("/PublicPage");
      //   window.sessionStorage.setItem("select", "/PublicPage");
      //   // this.$router.go(0)
      //   return;
      // }
      // this.$router.push("/Recommand/Dynamic");
      // window.sessionStorage.setItem("select", "/Recommand/Dynamic");
    },
    toMainPage() {
      if (this.$route.path === "/Recommand/Dynamic") {
        this.$router.push("/PublicPage");
        window.sessionStorage.setItem("select", "/PublicPage");
        // this.$router.go(0)
        return;
      }
      this.$router.push("/Recommand/Dynamic");
    },
    handleVideoDialog() {
      this.videoDialogVisible = true;
      this.warningDialogVisible = false;
    },
    toRecomand() {
      this.warningDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper /deep/ .cureDialog {
  background: rgb(204, 236, 232) !important;
  border-radius: 10px;
  .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
}
.wrapper {
  margin-bottom: 10px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: @radius_size;
}
// 话题标签按钮
.art_tag {
  display: flex;
  .el-tag {
    margin-right: 5px;
    background-color: #ffffff;
    border-radius: 15px;
    color: #008ac5;
    font-size: 14px;
  }
  .input-new-tag {
    max-width: 150px;
  }
}
.btnToopic {
  padding: 0 10px 0 10px;
  height: 28px;
  line-height: 28px;
  border-radius: 15px;
  font-size: 14px;
  color: #9499a0;
  font-weight: 400;
  background-color: #f6f7f8;
  border: 1px solid #f6f7f8;
  // background-color: rgba(230, 230, 230, 0.726);
  i {
    font-size: 13px;
    padding-right: 5px;
  }
}
// 输入框
.publish_text {
  margin-top: 5px;
  width: 100%;
  .editor /deep/ textarea {
    resize: none;
    padding: 0;
    border: none;
  }
}
// 下面工具栏
.toolbar {
  width: 100%;
  height: 28px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
// 表情选择
.el-popover {
  height: 200px;
  width: 400px;
  overflow: scroll;
  overflow-x: auto;
}
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.emotionItem {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: @emoji-size;
  text-align: center;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  background-color: #eee;
}
.emotionSelect {
  font-size: 24px;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 20px;
  background-color: #ffffff;
  &.active {
    color: @color-main;
  }
}
.emotionSelect:hover {
  color: @color-main;
}
// 图片上传
.btnTool {
  margin-left: 15px;
  font-size: 24px;
  background-color: #ffffff;
  padding: 0;
  width: 24px;
  height: 24px;
  // border-radius: 20px;
  border: none;
  &.active {
    color: @color-main;
  }
}
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.cover_pic {
  width: 80px;
  height: 80px;
  display: block;
}
// 艾特符号
.aite_icon {
  border: none;
  margin-left: 15px;
  font-size: 28px;
  background-color: #ffffff;
  padding: 0;
  // border-radius: 20px;
  &.active {
    color: @color-main;
  }
}
.el-switch /deep/ span {
  font-size: 16px;
  // height: 25px;
}
// 发布按钮
.tool_publish {
  margin-left: auto;
  .btnPublish {
    height: 32px;
    padding: 0 15px;
    // margin-left: auto;
  }
}
</style>
