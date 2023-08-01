import request from "../utils/request";

// 登录
export function login(data){
  request({
    url: '/user/loginUser',
    method: 'post',
    data: data
  })
}

export function register(data){
  request({
    url: '/user/registerUser',
    method: 'post',
    data: data
  })
}



