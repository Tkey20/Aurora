<template>
  <div class="wrapper">
    <el-page-header
      icon="el-icon-arrow-left"
      content="WishWall许愿墙"
      @back="backToHome"
    ></el-page-header>
    <div class="publish_note">
      <el-button type="primary" round @click="myWishDialogVisible = true"
        >我的许愿</el-button
      >
      <el-button type="primary" round @click="openWishDialog" class="btnWish"
        >发表心愿</el-button
      >
    </div>
    <div class="note_wrap">
      <div class="note" v-for="(item, index) of wishWallList" :key="index">
        <div class="note_info">
          <p>
            FROM:
            <span class="name">{{
              item.unname ? "一个有趣的人😊" : nickName
            }}</span>
          </p>
          <p class="school">#{{ item.school }}</p>
        </div>
        <div class="note_text">
          <p>{{ item.wcontent }}</p>
        </div>
        <div class="note_time">
          <span>{{ item.wcreatetime | publishDate }}</span>
        </div>
      </div>
    </div>
    <!-- 发表心愿对话框 -->
    <el-dialog
      title="发表心愿"
      :visible.sync="wishDialogVisible"
      width="30%"
      class="wishDialog"
    >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入您的心愿吧😊"
        v-model="wishData.wcontent"
      ></el-input>
      <el-switch
        v-model="wishData.unname"
        inactive-text="是否匿名"
        active-color="#13ce66"
        active-text="Yes"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="wishDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatewish">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 我的许愿对话框 -->
    <el-dialog
      title="我的心愿"
      :visible.sync="myWishDialogVisible"
      class="wishDialog"
      width="550px"
    >
      <el-table :data="wishWallList" style="width: 100%">
        <el-table-column
          prop="wcreatetime"
          label="心愿发表日期"
          sortable
          width="180"
        >
          <template #default="scope">
            <span> {{ scope.row.wcreatetime | dateFormate }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="wcontent" label="心愿内容" width="180" />
        <el-table-column label="是否删除心愿">
          <template #default="scope">
            <el-button
              type="danger"
              size="mini"
              round
              @click="delWish(scope.row)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { recommendDesire, showAllDesireByUser, delWish } from "@/api/wish.js";
import "../../assets/styles/animate.css";
export default {
  data() {
    return {
      wishWallList: [
        {
          id: Math.random() * 1000,
          nickname: "xbm",
          school: "广东第二师范学院",
          wcontent: "加油加油！",
          wcreatetime: 1642749686132,
          unname: true,
        },
      ],
      // 发表星愿的列表
      wishData: {
        nickname: "",
        school: "广东第二师范学院",
        wcreatetime: new Date().getTime(),
        wcontent: "",
        unname: false,
      },
      // table我的许愿列表
      userWishData: [],
      wishDialogVisible: false,
      myWishDialogVisible: false,
    };
  },
  // mounted() {
  //   this.getUserWishWallInfo();
  //   this.getWishWallInfo();
  // },
  computed: {
    ...mapState(["nickName"]),
  },
  methods: {
    backToHome() {
      this.$router.push("/PublicPage");
    },
    openWishDialog() {
      this.wishData.wcontent = "";
      this.wishData.unname = false;
      this.wishDialogVisible = true;
    },
    async updatewish() {
      // this.wishData.nickname = this.nickName;
      let res = JSON.parse(JSON.stringify(this.wishData));
      this.wishWallList.push(res);
      this.$message.success("许愿成功！！");
      this.wishDialogVisible = false;
    },
    async delWish(item) {
      this.$confirm("此操作将永久删除该心愿, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.wishWallList = this.wishWallList.filter((i) => i.id !== item.id);
          this.$message.success("删除成功！！");
          this.myWishDialogVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
}
.el-page-header {
  line-height: 35px;
  margin-left: 10px;
}
.publish_note {
  display: flex;
  justify-content: flex-end;
  .btnWish {
    margin-left: 20px;
    margin-right: 20%;
  }
}
.note_wrap {
  // border: 1px solid darkblue;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  width: 100%;
  // height: 100%;
  position: relative;
  background-color: rgb(234, 246, 253);
}
.note {
  animation: fadeInUp 1.3s;
  margin: 10px;
  position: relative;
  width: 210px;
  height: 220px;
  border: 1px solid darkblue;
  border-radius: 15px;
  background-color: rgb(255, 211, 130);
}
.note_info {
  padding: 10px 10px 0 10px;
  p {
    font-size: 15px;
    span {
      font-weight: bold;
    }
  }
  .school {
    margin-top: 5px;
    font-size: 12px;
    color: @color-info;
  }
}
.note_text {
  margin: 10px;
  height: 135px;
  border-top: 1px solid rgba(255, 255, 255, 0.836);
  P {
    padding-top: 10px;
    font-size: 15px;
    line-height: 20px;
    text-indent: 15px;
  }
}
.note_time {
  span {
    margin-left: 50px;
  }
}
.wishDialog {
  border-radius: 10px;
}
.wishDialog /deep/ .el-dialog__footer {
  padding: 10px;
}
.el-switch {
  margin-top: 10px;
}
</style>
