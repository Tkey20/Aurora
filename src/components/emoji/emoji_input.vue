<template>
  <div>
    <div class="chatIcon">
      <el-popover placement="top-start" width="400" trigger="click" class="emoBox" ref="popover" @hide="popoverHide">
        <div class="emotionList">
          <a href="javascript:void(0);" @click="getEmo(item)" v-for="item in faceList" :key="item.eid" class="emotionItem">{{item.emoji}}</a>
        </div>
        <el-button
          class="emotionSelect iconfont icon-biaoqing"
          slot="reference"
          :class="{active: emojiActive}"
          @click="emojiActive = true"
          circle
        >
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
const appData = require('../../mock/emo.json')
export default {
  data() {
    return {
      faceList: [],
      emojiActive: false
    }
  },
  methods: {
    getEmo(item) {
      console.log(item.emoji);
      this.$emit('inputEmoji', item.emoji)
      this.$refs.popover.doClose();
    },
    popoverHide() {
      this.emojiActive = false
    }
  },
  mounted() {
    this.faceList = appData
  }
}
</script>

<style lang="less" scoped>
// 表情选择
.el-popover{
  height:200px;
  width:400px;
  overflow: scroll;
  overflow-x:auto;
}
.emotionList{
  display: flex;
  flex-wrap: wrap;
  padding:5px;
}
.emotionItem{
  width:35px;
  height: 35px;
  line-height: 35px;
  font-size: @emoji-size;
  text-align:center;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  background-color: #eee;
}
.emotionSelect{
  font-size: 24px;
  padding: 0;
  // width: 24px;
  // height: 24px;
  color: #9499a0;
  border-radius: 20px;
  background-color: #FFFFFF;
  &.active{
    color: @color-main;
  }
}
.emotionSelect:hover{
  color: @color-main;
}
</style>
