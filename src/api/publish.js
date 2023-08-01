import request from "../utils/request";

export function addTrends(data) {
  request({
    url: "/trends/addTrends",
    method: "post",
    data: data,
  });
}

export function addTrendsPic(data) {
  request({
    url: "/trends/upPicture",
    method: "post",
    data: data,
  });
}
