<template>
  <el-container>
    <el-header height="52px">
      <el-row>
        <el-col :span="7" class="main-title">
          <router-link to="/PublicPage" class="name">Aurora</router-link>
          <i class="headerLine"></i>
        </el-col>
        <el-col :span="10" class="publish-text">
          <span class="header-title">个人设置</span>
        </el-col>
        <el-col :span="7" class="avatar-wrapper">
          <el-popover
            placement="top-start"
            trigger="hover"
            popper-class="header_pop"
          >
            <template #reference>
              <el-avatar shape="circle" :size="40" :src="avatarPic"></el-avatar>
            </template>
            <div class="personal_info">
              <router-link to="/Settings">
                <el-button class="el-icon-user">个人中心</el-button>
              </router-link>
              <el-button
                @click="exitToLogin"
                class="el-icon-switch-button btnExit"
                >退出</el-button
              >
            </div>
          </el-popover>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="setting-main">
      <el-aside width="200px">
        <el-menu
          default-active="1"
          text-color="#8590a6"
          active-text-color="#444"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <template #title>账号与密码</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="account-wrapper">
          <div class="account-title">
            <h2>账号与密码</h2>
            <p>账号设置/个性签名</p>
          </div>
        </div>
        <div class="account-wrapper">
          <div class="account-title">
            <h3>帐号设置</h3>
            <p>绑定手机和邮箱，并设置密码，帐号更安全</p>
          </div>
        </div>
        <div class="account-subwrapper">
          <div class="account-title">
            <h3>昵称</h3>
            <p>{{ nickName }}</p>
          </div>
          <div class="account-setting">
            <span @click="nknDialog_visible = true">编辑</span>
          </div>
        </div>
        <!-- 个性签名 -->
        <div class="account-subwrapper">
          <div class="account-title">
            <h3>个性签名</h3>
            <p>已设置</p>
          </div>
          <div class="account-setting">
            <span @click="personDialog_visible = true">编辑</span>
          </div>
        </div>
        <div class="account-subwrapper">
          <div class="account-title">
            <h3>头像</h3>
            <p>已设置</p>
          </div>
          <div class="account-setting">
            <span @click="avatarDialog_visible = true">编辑</span>
          </div>
        </div>
        <div class="account-subwrapper">
          <div class="account-title">
            <h3>学校</h3>
            <p>已设置</p>
          </div>
          <div class="account-setting">
            <span @click="schoolDialog_visible = true">编辑</span>
          </div>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>

    <!-- 修改昵称对话框 -->
    <el-dialog
      title="修改昵称"
      :visible.sync="nknDialog_visible"
      width="35%"
      :close-on-click-modal="false"
      @close="nknDialogClose"
    >
      <el-form :model="setNknForm" :rules="setNknRules" ref="setNknRef">
        <el-form-item label="新昵称：" prop="nickname">
          <el-input v-model="setNknForm.nickname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="nknDialog_visible = false">取 消</el-button>
          <el-button type="primary" @click="editNknClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改头像对话框 -->
    <el-dialog
      title="修改头像"
      :visible.sync="avatarDialog_visible"
      width="25%"
      :close-on-click-modal="false"
      @closed="closePic"
    >
      <el-upload
        class="avatar-uploader"
        :multiple="false"
        action="#"
        accept="image/jpg,image/jpeg"
        :show-file-list="false"
        :auto-upload="false"
        list-type="picture"
        :on-success="upload_suc"
        :on-error="uperror"
        :on-change="picChange"
      >
        <img v-if="newAvatarUrl" :src="newAvatarUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="avatarDialog_visible = false">取 消</el-button>
          <el-button type="primary" @click="uploadPic">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <!-- <el-dialog
      title="修改密码"
      :visible.sync="pwdDialog_visible"
      width="35%"
      :close-on-click-modal="false"
      @close="pwdDialogClose"
    >
      <el-form :model="setPwdForm" :rules="setPwdRules" ref="setPwdRef">
        <el-form-item label="新密码：" prop="new_pwd">
          <el-input v-model="setPwdForm.new_pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="请再次确认：" prop="new_pwd">
          <el-input v-model="setPwdForm.c_pwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pwdDialog_visible = false">取 消</el-button>
          <el-button type="primary" @click="editPwdClick">确 定</el-button>
        </span>
      </template>
    </el-dialog> -->
    <!-- 修改学校 对话框 -->
    <el-dialog
      title="修改学校"
      :visible.sync="schoolDialog_visible"
      width="35%"
      :close-on-click-modal="true"
    >
      <span>请选择学校：</span>
      <el-select v-model="selectSchool" filterable placeholder="请选择">
        <el-option
          v-for="item in schoolOptions"
          :key="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="schoolDialog_visible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmSchool"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改个性签名对话框 -->
    <el-dialog
      title="修改个性签名"
      :visible.sync="personDialog_visible"
      width="35%"
      :close-on-click-modal="false"
      @close="personDialogClose"
    >
      <el-form
        :model="setPersonForm"
        :rules="setPersonRules"
        ref="setPersonRef"
      >
        <el-form-item label="新的个性签名" prop="sign">
          <el-input v-model="setPersonForm.sign"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="personDialog_visible = false">取 消</el-button>
          <el-button type="primary" @click="editPersonClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  upDateUserPwd,
  upDateSign,
  upImg,
  upDateUserNickname,
} from "@/api/user.js";
import { school } from "../../config";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      filePic: {},
      nickName: "已设置",
      avatar:
        "https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp",
      newAvatarUrl: "",
      // 修改密码
      pwdDialog_visible: false,
      setPwdForm: {
        new_pwd: "",
        c_pwd: "",
      },
      setPwdRules: {
        new_pwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "输入长度在 6 - 15 个字符",
            trigger: "blur",
          },
        ],
      },

      // 修改学校
      schoolDialog_visible: false,
      selectSchool: "",
      schoolOptions: school,

      // 修改头像
      avatarDialog_visible: false,
      // 修改昵称
      nknDialog_visible: false,
      setNknForm: {
        nickname: "",
      },
      setNknRules: {
        nickname: { required: true, message: "请输入昵称", trigger: "blur" },
      },
      // 修改个性签名
      personDialog_visible: false,
      setPersonForm: {
        sign: "",
      },
      setPersonRules: {
        sign: { required: true, message: "请输入个性签名", trigger: "blur" },
      },
    };
  },
  computed: {
    ...mapState(["uid", "avatarPic"]),
  },
  methods: {
    ...mapMutations([
      "avatarChange",
      "nickNameChange",
      "signNameChange",
      "schoolChange",
    ]),
    uperror(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    // 修改密码对话框
    async editPwdClick() {
      if (this.setPwdForm.new_pwd !== this.setPwdForm.c_pwd) {
        return this.$message.error("请输入相同的密码！");
      }
      const upPwd = {};
      upPwd.password = this.setPwdForm.new_pwd;
      this.$message.success("修改成功！");
      this.pwdDialog_visible = false;
    },
    pwdDialogClose() {
      this.$refs.setPwdRef.resetFields();
      this.setPwdForm.c_pwd = null;
    },
    // 修改昵称
    async editNknClick() {
      if (this.setNknForm.nickname.trim().length === 0) {
        return this.$message.error("请输入昵称！");
      }

      this.nickName = this.setNknForm.nickname;
      this.nickNameChange(this.nickName);
      this.$message.success("修改成功");
      this.nknDialog_visible = false;
    },
    nknDialogClose() {
      this.$refs.setNknRef.resetFields();
    },
    // 点击按钮上传头像组件
    async uploadPic() {
      if (!this.filePic) {
        this.$message.error("请上传图片！");
        return;
      }

      // 将图片转化为 二进制进行显示
      const reader = new FileReader();
      reader.readAsDataURL(this.filePic.raw); // 将图片文件转化为二进制数据
      reader.onload = (e) => {
        this.avatarChange(e.target.result);
        this.avatar = e.target.result;
      };
      this.$message.success("上传头像成功！");
      this.avatarDialog_visible = false;
    },
    // 图片切换时
    picChange(file, fileList) {
      // console.log(file);
      const isJPG = file.raw.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      this.filePic = file;
      this.newAvatarUrl = file.url;
    },
    // 头像对话框关闭
    closePic() {
      this.newAvatarUrl = "";
    },
    exitToLogin() {
      window.sessionStorage.setItem("token", "");
      this.$router.push("/Login");
    },
    // 修改个性签名
    async editPersonClick() {
      if (this.setPersonForm.sign.trim().length === 0) {
        return this.$message.error("请输入个性签名");
      }
      this.signNameChange(this.setPersonForm.sign);
      this.$message.success("修改成功！");
      this.personDialog_visible = false;
    },
    personDialogClose() {
      this.$refs.setPersonRef.resetFields();
    },

    // 修改学校
    handleConfirmSchool() {
      this.schoolChange(this.selectSchool);
      this.$message.success("修改成功！");
      this.schoolDialog_visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.personal_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-button {
    width: 100px;
    margin: 0;
    padding: 10px;
  }
  .btnExit {
    display: flex;
    margin-top: 7px;
    padding-left: 12px;
  }
  .el-button /deep/ span {
    margin-left: 5px;
  }
}
.el-header {
  padding: 0;
  min-width: 1000px;
  background-color: #ffffff;
  padding: 0;
  margin-bottom: 10px;
  // border-bottom: 1px solid #ccc;
}
.el-row {
  height: 100%;
  box-shadow: 0px 2px 5px #dadadac2;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)
  // box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}
.el-col {
  height: 100%;
  display: flex;
  align-items: center;
}
.headerLine {
  margin-left: 17px;
  height: 29px;
  width: 1px;
  background-color: #ebebeb;
}
.header-title {
  margin-left: 16px;
  color: #121212;
  font-weight: 600;
  font-synthesis: style;
}
.name {
  // width: 244px;
  margin-left: auto;
  cursor: pointer;
  font-size: 38px;
  color: cornflowerblue;
  text-shadow: 2px 2px #ccc;
  font-weight: bold;
}
.avatar-wrapper {
  justify-content: center;
}
.el-avatar {
  cursor: pointer;
}
// 左边菜单栏
.el-aside {
  background-color: #fff;
  border: 1px solid @b_color;
  .el-menu {
    border-right: none;
  }
}
// 主页设置
.setting-main {
  width: 800px;
  margin: 0 auto;
  margin-top: 10px;
}
.el-main {
  height: 91vh;
  padding: 0;
  background-color: #fff;
  border: 1px solid @b_color;
}
.account-wrapper {
  padding: 20px 18px;
  border-bottom: 1px solid @b_color;
  color: #121212;
  .account-title {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 20px;
      height: 28px;
      line-height: 28px;
    }
    h3 {
      font-size: 18px;
      height: 28px;
      line-height: 28px;
    }
  }
  p {
    font-size: 14px;
    color: #8590a6;
    margin-top: 5px;
  }
}
// 账号设置是一体的
.account-subwrapper {
  display: flex;
  margin-left: 20px;
  border-bottom: 1px solid @b_color;
  color: #121212;
  .account-title {
    margin: 20px 20px 20px 0px;
    flex: 1;
    flex-direction: column;
    h3 {
      font-size: 15px;
      font-weight: normal;
      height: 28px;
      line-height: 28px;
    }
    p {
      font-size: 14px;
      color: #8590a6;
      margin-top: 5px;
    }
  }
  .account-setting {
    display: flex;
    align-items: center;
    padding: 20px;
    span {
      text-align: center;
      color: #0066ff;
      cursor: pointer;
    }
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
