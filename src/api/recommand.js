import request from "../utils/request";

// 推荐系统
export function getBooks(){
  request({
    url: '/recommend/books',
    method: 'get',
  })
}

export function likeBooks(data){
  request({
    url: '/recommend/praiseBook',
    method: 'post',
    data:data
  })
}


export function getFilms(){
  request({
    url: '/recommend/films',
    method: 'get',
  })
}

export function likeFilms(data){
  request({
    url: '/recommend/praiseFilm',
    method: 'post',
    data:data
  })
}


export function getTrends(){
  request({
    url: 'recommend/trends',
    method: 'get',
  })
}


export function updateViews(data){
  request({
    url: '/trends/updateViews',
    method: 'get',
    params:data
  })
}

export function updateFavour(data){
  request({
    url: '/trends/updateFavour',
    method: 'get',
    params: data
  })
}
