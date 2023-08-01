import request from "../utils/request";

// 记录 点击喜爱
export function updateFavour(params) {
  request({
    url: "/trends/updateFavour",
    method: "get",
    params,
  });
}
// 记录点赞的次数
export function updateViews(params) {
  request({
    url: "/trends/updateViews",
    method: "get",
    params,
  });
}
