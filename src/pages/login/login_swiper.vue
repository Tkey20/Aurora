<template>
  <div class="swiperWrapper">
    <header class="header-content">
      <el-row>
        <el-col :span="7" class="header-title">
          <router-link to="/" class="name" :class="{active: headerColor}">Aurora</router-link>
          <i class="headerLine"></i>
        </el-col>
        <el-col :span="8" class="publish-text" >
          <router-link to="/" class="header-title" :class="{active: headerColor}">首页</router-link>
          <router-link to="/" class="header-title" :class="{active: headerColor}">关于我们</router-link>
          <router-link to="/" class="header-title" :class="{active: headerColor}">
            <i class="iconfont icon-github"></i>
            GitHub
          </router-link>
        </el-col>
      </el-row>
    </header>
    <div class="swiper-container" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="@assets/img/123.jpg" alt="">
          <div class="main-content">
            <div class="main-title">
              <span class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s">树洞 倾诉你的所有</span>
            </div>
            <div class="main-desc">
              <span class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s">温暖 / 真实 / 自信</span>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <login-page></login-page>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import LoginPage from './login_.vue'
import '@assets/styles/animate.css'
import { swiperAnimateCache, swiperAnimate } from '@assets/styles/swiper.animate1.0.3'
import Swiper from 'swiper'
import "swiper/css/swiper.css";
export default {
  components: {
    LoginPage
  },
  data() {
    return {
      headerColor: false,
      swiper: null
    }
  },
    mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this
      this.swiper = new Swiper(this.$refs.swiper, {
        mousewheel: true,
        direction: 'vertical',
        allowTouchMove: false,
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          init: function() {
            swiperAnimateCache(this); // 隐藏动画元素 
            swiperAnimate(this); // 初始化完成开始动画
          }, 
          slideChangeTransitionEnd: function() { 
            swiperAnimate(this); // 每个slide切换结束时也运行当前slide动画
            // this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            that.headerColor = !that.headerColor
          }
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.swiperWrapper{
  height: 100%;
  position: relative;
  min-width: 1100px;
}
.swiperWrapper /deep/ .swiper-container{
  height: 100%;
}
img{
  width: 100%;
  height: 100%;
}
.header-content{
  width: 100%;
  min-width: 1100px;
  position: fixed;
  height: 52px;
  z-index: 100;
  top: 0;
  .el-row{
    height: 100%;
    display: flex;
    justify-content: space-between;
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
  .publish-text{
    margin-left: auto;
    // text-align: center;
  }
  .header-title{
    margin:0 25px; 
    font-size: 20px;
    color: #ffffff;
    font-weight: 600;
    font-synthesis: style;
    transition: color 0.5s;
    &.active{
      color: @text-333;
      transition: color 0.5s;
    }
    i{
      font-size: 20px;
    }
  }
  .name{
    margin:0 auto;
    cursor: pointer;
    font-size: 38px;
    color: rgb(255, 255, 255);
    text-shadow: 2px 2px #ccc;
    font-weight: 500;
    transition: color 0.5s;
    &.active{
      transition: color 0.5s;
      color: @text-333;
    }
  }
}
.main-content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 902px;
  height: 220px;
  .main-title{
    height: 144px;
    display: flex;
    justify-content: center;
    // font-family: Microsoft JhengHei;
    font-weight: bold;
    span{
      font-size: 90px;
      color: white;
    }
  }
  .main-desc{
    display: flex;
    justify-content: center;
    span{
      font-size: 23px;
      color: white;
    }
  }
}
</style>
