import request from "../utils/request";

// 主页面左侧栏 数据
export function sideContent(params) {
  request({
    url: "/sideContent",
    method: "get",
    params,
  });
}

// 主页面 删除小目标
export function delDesire(params) {
  request({
    url: "/desire/delDesire",
    method: "get",
    params,
  });
}

// 主页面 添加小目标
export function addDesire(data) {
  request({
    url: "/desire/addDesire",
    method: "post",
    data,
  });
}

// 主页面 显示用户所有小目标
export function showAllDesireByUser() {
  request({
    url: "desire/showAllDesireByUser",
    method: "get",
  });
}
