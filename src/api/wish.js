import request from "../utils/request";

export function recommendDesire() {
  request({
    url: "/recommend/desire",
    method: "get",
  });
}

export function showAllDesireByUser() {
  request({
    url: "desire/showAllDesireByUser",
    method: "get",
  });
}

// 心愿
export function addWish(data) {
  request({
    url: "/wish/addWish",
    method: "post",
    data: data,
  });
}

export function delWish(data) {
  request({
    url: "/wish/delWish",
    method: "post",
    data: data,
  });
}
