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
              <el-avatar shape="circle" :size="40" :src="avatar"></el-avatar>
            </template>
            <div class="personal_info">
              <router-link to="/Settings">
                <el-button class="el-icon-user">个人中心</el-button>
              </router-link>
              <el-button class="el-icon-switch-button btnExit">退出</el-button>
            </div>
          </el-popover>
        </el-col>
      </el-row>
    </el-header>
    <el-container  class="main-wrapper">
      <el-aside width="25%">
        <div class="aside_wrapper">
          <div class="user_avatar">
            <router-link to="/MainPage">
              <el-avatar shape="circle" :size="80" :src="avatar"></el-avatar>
            </router-link>
          </div>
          <div class="userInfo">
            <div class="user_nick">
              <router-link to="/Settings">
                <span>admin</span>
              </router-link>
            </div>
            <div class="user_schoole">#广东第二师范学院</div>
            <div class="user_desc">管理员身份</div>
          </div>
          <div class="router_wrapper">
            <div>审核</div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="artComWrapper" v-for="item of userInfo" :key="item.id" slot="default">
          <div class="article-card">
            <div class="user-avt">
              <span>
                <el-avatar shape="circle" :size="45" :src="item.avatar"></el-avatar>
              </span>
            </div>
            <div class="user-mood">
              <span>{{item.emoji}}</span>
            </div>
            <div class="main-info">
              <div>
                <div class="user-msg">
                  <div class="nickName">
                    <span>{{item.nickname}}</span>
                  </div>
                  <div class="user-date">
                    <span>{{item.createtime | publishDate}} <span style="margin-left: 15px">#{{item.school}}</span></span>
                  </div>
                </div>
                <div class="article-title">
                  <span class="tag_title_wrapper">
                    <i class="iconfont icon-taiyang-xuanze"></i>
                    <span class="tag_title"> {{item.title}}</span>
                  </span>
                </div>
                <div class="article-text">
                  <span>{{item.tcontent}}</span>
                </div>
                <div class="article-pic" v-if="item.tpicture">
                  <img :src="item.tpicture" alt="">
                </div>
              </div>
              <div class="article-actions">
                <div class="deleteArt">
                  <el-popover placement="right" trigger="click">
                    <template #reference>
                      <i class="iconfont icon-gengduo moreTool"></i>
                    </template>
                    <el-button size="small" @click="delArticle(item.tid)"><i class="el-icon-delete"></i>删除动态</el-button>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      avatar: 'https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp',
      userInfo: []
    }
  },
  methods: {
    async getPublicList() {
      const { data: res } = await this.$axios.get('PublicPaper/showAllTrends')
      this.userInfo = res.data
      // 当列表渲染完毕再消失
      this.$nextTick(_ => {
        this.loading = false
      });
      console.log(res);
    },
    async delArticle(tid) {
      const confirmRes = await this.$confirm('此操作将永久删除该动态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 点击确定时，返回值是confirm
      if (confirmRes === 'confirm') {
        const { data: res } = await this.$axios.get('trends/delTrends', {
          params: {
            tid: tid
          }
        })
        if (res.code !== 1 || !res) {
          return this.$message.error(res.msg)
        }
        this.$message.success(res.msg)
        this.getPublicList()
      }
    }
  },
  mounted() {
    this.getPublicList()
  }
}
</script>

<style lang="less" scoped>
.main-wrapper{
  width: 65%;
  margin: 0 auto;
}
.el-header{
  padding: 0;
  min-width: 1000px;
  background-color: #FFFFFF;
  padding: 0;
  margin-bottom: 10px;
  // border-bottom: 1px solid #ccc;
}
.el-row{
  height: 100%;
  box-shadow: 0px 2px 5px #dadadac2;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)
  // box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}
.el-col{
  height: 100%;
  display: flex;
  align-items: center;
}
.headerLine{
  margin-left: 17px;
  height: 29px;
  width: 1px;
  background-color: #ebebeb;
}
.header-title{
  margin-left: 16px;
  color: #121212;
  font-weight: 600;
  font-synthesis: style;
}
.name{
  // width: 244px;
  margin-left: auto;
  cursor: pointer;
  font-size: 38px;
  color: cornflowerblue;
  text-shadow: 2px 2px #ccc;
  font-weight: bold;
}
.avatar-wrapper{
  justify-content: center;
}
.el-avatar{
  cursor: pointer;
}
// 侧边栏布局
.el-aside{
  min-width: 220px;
}
.aside_wrapper{
  position: sticky;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: @radius_size;
}
.user_avatar{
  margin-top: 20px;
  transition: 0.5s;
  cursor: pointer;
}
.user_avatar:hover{
  transform: scale(1.1);
  transition: 0.5s;
}
.userInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  .user_nick{
    display: flex;
    justify-content: center;
    height: 30px;
    line-height: 30px;
    
    #ellipsis();
    span{
      font-size: 25px;
      font-weight: bold;
      transition: color 0.4s;
      color: @color-info;
    }
  }
  .user_nick span:hover{
    color: @text-main;
    transition: color 0.4s;
  }
  .user_schoole{
    padding: 15px;
    font-size: 14px;
    cursor: default;
    transition: color 0.4s;
  }
  .user_schoole:hover{
    transition: color 0.3s;
    color: @color-main;
  }
  .user_desc{
    text-indent: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 16px;
    padding: 0 20px 20px 5px;
    color: @text-minor;
    // text-indent: 10px;
    // font-weight: bold;
  }
}
.router_wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  div{
    cursor: pointer;
    color: @text-normal;
    text-align: center;
    width: 180px;
    line-height: 50px;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
    margin-top: 5px;
    transition: 0.5s;
    background-color:rgb(99, 161, 255);
    color: #ffffff;
    transition: 0.5s;
  }
}
// 发表的文章样式
.article-card{
  cursor: pointer;
  animation: fadeInUp 1.3s;
  margin-bottom: 10px;
  background-color: #ffffff9f;
  border-radius: @radius_size;
  // height: 150px;
  // padding: 20px;
  position: relative;
  border-top: 1px solid @b_color;
  
}
.user-avt{
  position: absolute;
  top: 18px;
  left: 18px;
}
.user-mood{
  position: absolute;
  font-size: 25px;
  right: 10px;
  top: 16px;
}
// 文章主体样式
.main-info{
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  margin: 0px 5px 0px 75px;
}
.user-msg{
  .nickName{
    font-size: 18px;
    font-weight: bold;
  }
  .user-date{
    padding-top: 5px;
    span{
      color: #ccc;
    }
  }
}
.article-title{
  margin-top: 8px;
  #ellipsis();
  height: 25px;
  line-height: 25px;
  .tag_title_wrapper{
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    cursor: pointer;
    color: @tag_color;
    // font-family: Helvetica, sans-serif;
    i{
      font-size: 20px;
      color: @sun_color;
    }
  }
  .tag_title_wrapper:hover{
    background-color: #DFF6FD;
  }
}
.tag_title{
  position: relative;
  top: -1.5px;
  left: 2px;
}
.article-text{
  // margin-top: 5px;
  display: flex;
  max-height: 100px;
  span{
    font-size: 14px;
    line-height: 23px;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow:ellipsis
  }
  span:hover{
    color:rgba(51, 51, 51, 0.801);
  }
}
.article-pic{
  margin-top: 8px;
  img{
    border-radius: @radius_size;
    max-width: 300px;
  }
}
// 点赞等样式
.article-actions{
  display: flex;
  color: rgb(170, 161, 161);
  height: 30px;
}
.deleteArt{
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  // font-size: 160px;
  .moreTool{
    font-size: 17px;
  }
}
.like{
  &.active, &:hover {
    color: @color-main;
  }
}
.el-avatar{
  cursor: pointer;
}
</style>
