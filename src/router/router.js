import Vue from "vue";
import Router from "vue-router";
const login = () => import("@/pages/login/login_swiper");
const Home = () => import(/* webpackChunkName: "Home_Main" */ "@/pages/Home");
const MainPage = () =>
  import(
    /* webpackChunkName: "Home_Main" */ "@/pages/Home/components/userPage"
  );
const PublicPage = () => import("@/pages/Home/components/publicPage");
const recommand = () =>
  import(
    /* webpackChunkName: "recommand_main" */ "@/pages/recommand/recommand"
  );
const recommandPage = () =>
  import(
    /* webpackChunkName: "recommand_main" */ "@/pages/recommand/components/recommandPage"
  );
const recommandFilm = () =>
  import("@/pages/recommand/components/recommandFilm");
const recommandBook = () =>
  import("@/pages/recommand/components/recommandBook");
const Settings = () => import("@/pages/settings/settings");
const article = () => import("@/pages/Blog/blog");
const WishWall = () => import("@/pages/WishWall/wishWall");
const admin = () => import("@/pages/admin/admin");

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: login
    },
    {
      // 主页面
      path: "/home",
      component: Home,
      redirect: "/MainPage",

      // 子页面： 主页、公共页、推荐页
      children: [
        {
          path: "/MainPage",
          component: MainPage
        },
        {
          path: "/PublicPage",
          component: PublicPage
        },
        {
          path: "/Recommand",
          component: recommand,
          redirect: "/Recommand/Dynamic",

          // 推荐页的子页面：书籍、电影、动态
          children: [
            {
              path: "/Recommand/Book",
              component: recommandBook
            },
            {
              path: "/Recommand/Film",
              component: recommandFilm
            },
            {
              path: "/Recommand/Dynamic",
              component: recommandPage
            }
          ]
        }
      ]
    },
    {
      path: "/article/:id",
      component: article
    },
    {
      path: "/WishWall",
      component: WishWall
    },
    {
      path: "/settings",
      component: Settings
    },
    {
      path: "/admin",
      component: admin
    },
    {
      // 重定向
      path: "*",
      redirect: "/login"
    }
  ]
});
// 设置路由导航 防止直接进入Home组件
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   }
//   next()
// })
export default router;
