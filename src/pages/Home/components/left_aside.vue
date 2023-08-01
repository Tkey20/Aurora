<template>
  <div class="aside_wrapper">
    <div class="user_avatar">
      <router-link to="/MainPage">
        <el-avatar shape="circle" :size="80" :src="avatarPic"></el-avatar>
      </router-link>
    </div>
    <div class="userInfo">
      <div class="user_nick">
        <router-link to="/Settings">
          <span>{{ nickName }}</span>
        </router-link>
        <emoji></emoji>
      </div>
      <div class="user_schoole">#{{ school }}</div>
      <div class="user_desc">{{ sign || "个性签名" }}</div>
    </div>
    <div class="router_wrapper">
      <div
        v-for="(menu, index) of menuRouter"
        :key="index"
        @click="changeMenu(menu)"
        :class="{ active: select === menu.path }"
      >
        {{ menu.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { publicUser } from "@/api/leftAside.js";
import Emoji from "@/components/emoji/emoji.vue";
export default {
  components: {
    Emoji,
  },
  data() {
    return {
      select: "/PublicPage",
      menuRouter: [
        {
          title: "主页",
          path: "/MainPage",
        },
        {
          title: "社区",
          path: "/PublicPage",
        },
        {
          title: "推荐",
          path: "/Recommand/Dynamic",
        },
        {
          title: "许愿墙",
          path: "/WishWall",
        },
      ],
      userInfo: {},
      avatar:
        "https://i1.hdslb.com/bfs/face/e0cc906bb531195e9ee9f3b575effdd2b056eaea.jpg@96w_96h_1c_1s.webp",
      // nickname: "TKEY",
      // desc: "一个会写注释的前端程序猿",
    };
  },

  watch: {
    "$route.path": function (newVal, oldVal) {
      this.select = newVal;
      if (newVal === "/Recommand/Film") {
        this.select = "/Recommand/Dynamic";
      } else if (newVal === "/Recommand/Book") {
        this.select = "/Recommand/Dynamic";
      }
      // console.log(this.select);
    },
  },
  computed: {
    ...mapState(["nickName", "avatarPic", "sign", "school"]),
  },
  mounted() {
    if (this.$route.path === "/Recommand/Film") {
      this.select = "/Recommand/Dynamic";
    } else if (this.$route.path === "/Recommand/Book") {
      this.select = "/Recommand/Dynamic";
    } else {
      this.select = this.$route.path;
    }
  },

  methods: {
    async getUserInfo() {
      const { data: res } = await publicUser({
        uid: this.$store.state.uid,
      });
      this.userInfo = res;
      console.log(res);
    },
    changeMenu(menu) {
      this.select = menu.path;
      sessionStorage.setItem("select", this.select);
      if (this.select === this.$route.path) {
        return;
      }
      this.$router.push({
        path: menu.path,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.aside_wrapper {
  position: sticky;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: @radius_size;
}
.user_avatar {
  margin-top: 20px;
  transition: 0.5s;
  cursor: pointer;
}
.user_avatar:hover {
  transform: scale(1.1);
  transition: 0.5s;
}
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  .user_nick {
    display: flex;
    justify-content: center;
    height: 30px;
    line-height: 30px;

    #ellipsis();
    span {
      font-size: 25px;
      font-weight: bold;
      transition: color 0.4s;
      color: @color-info;
    }
  }
  .user_nick span:hover {
    color: @text-main;
    transition: color 0.4s;
  }
  .user_schoole {
    padding: 15px;
    font-size: 14px;
    cursor: default;
    transition: color 0.4s;
  }
  .user_schoole:hover {
    transition: color 0.3s;
    color: @color-main;
  }
  .user_desc {
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
.router_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  div {
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
  }
  div:hover {
    background-color: rgb(99, 161, 255);
    color: #ffffff;
    transition: 0.5s;
  }
}
.active {
  color: #ffffff !important;
  background-color: rgb(99, 161, 255);
}
</style>
