import request from "../utils/request";

// 公开社区 用户信息
export function getUserInfo(params) {
  request({
    url: "PublicPaper/publicUser",
    method: "get",
    params,
  });
}
// 公开社区 用户动态
export function getPublicTrends(params) {
  request({
    url: "PublicPaper/showAllTrends",
    method: "get",
    params,
  });
}

// 个人动态 展示全部数据
export function showAllUserTrends(params) {
  request({
    url: "/userTrendsPaper/showAllUserTrends",
    method: "get",
    params,
  });
}
// 个人动态 删除动态
export function delTrends(params) {
  request({
    url: "/trends/delTrends",
    method: "get",
    params,
  });
}

// 个人中心 修改用户密码
export function upDateUserPwd(data) {
  request({
    url: "/user/upDateUserPwd",
    method: "post",
    data: data,
  });
}
// 个人中心 修改用户昵称
export function upDateUserNickname(data) {
  request({
    url: "/user/upDateUserNickname",
    method: "post",
    data: data,
  });
}
// 个人中心 修改用户头像
export function upImg(data) {
  request({
    url: "/user/upImg",
    method: "post",
    data: data,
  });
}
// 个人中心 修改用户签名
export function upDateSign(data) {
  request({
    url: "/PublicPaper/upDateSign",
    method: "post",
    data: data,
  });
}
