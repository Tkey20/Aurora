import request from "../utils/request";

// 发布文章
export function findViews(params) {
  request({
    url: "/trendsInfo/findViews",
    method: "get",
    params,
  });
}

export function getTrendsInfo(params) {
  request({
    url: "/trendsInfo/info",
    method: "get",
    params,
  });
}

export function updateFavour(params) {
  request({
    url: "/trends/updateFavour",
    method: "get",
    params,
  });
}
