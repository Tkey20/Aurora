<template>
  <div class="chatIcon">
    <el-tooltip>
      <div slot="content" class="tooltipContent">点击可选择当日心情呦😊</div>
      <el-popover
        placement="top-start"
        width="400"
        trigger="click"
        class="emoBox"
        ref="popover"
      >
        <div class="emotionList">
          <a
            href="javascript:void(0);"
            @click="getEmo(item)"
            v-for="item in faceList"
            :key="item.eid"
            class="emotionItem"
            >{{ item.emoji }}</a
          >
        </div>
        <span v-if="!lastEmoji" class="emotionSelect" slot="reference">{{
          lastEmoji || "😊"
        }}</span>
        <span v-if="lastEmoji" slot="reference" class="selectIcon">{{
          lastEmoji
        }}</span>
      </el-popover>
    </el-tooltip>
  </div>
</template>

<script>
const appData = require("../../mock/emo.json");
export default {
  data() {
    return {
      faceList: [],
      eid: "",
      lastEmoji: "",
    };
  },
  mounted() {
    // this.getLastEmo();
    this.faceList = appData;
    // this.getEmoList()
  },
  methods: {
    async getLastEmo() {
      const { data: res } = await this.$axios.get("/LsideContent", {
        params: {
          uid: window.sessionStorage.getItem("uid"),
        },
      });
      console.log(res);
      this.eid = res.eid;
      this.lastEmoji = res.emoji;
    },
    async getEmo(item) {
      // 输出当前的uid和表情id
      this.lastEmoji = item.emoji;
      this.eid = item.eid;
      this.$emit("getEmojiId", { eid: item.eid, emoji: item.emoji });
      this.$refs.popover.doClose();
      console.log(item.eid);
      await this.$axios.get("/userEmo", {
        params: {
          eid: item.eid,
          uid: this.$store.state.uid,
        },
      });
    },
    // 查找所有的emoji表情
    async getEmoList() {
      const { data: res } = await this.$axios.get("/emo");
      this.faceList = res;
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.el-popover {
  height: 200px;
  width: 400px;
  overflow: scroll;
  overflow-x: auto;
}
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
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
  font-size: @emoji-size;
}
span {
  font-size: 20px;
  cursor: pointer;
}
</style>
