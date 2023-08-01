import axios from "axios";
import { Message } from "element-ui";
import Storage from "@/utils/storage";

const storage = new Storage();
// const baseUrl = process.env.VUE_APP_BASEURL
// export const prefix = baseUrl + process.env.VUE_APP_PREFIX
let baseURL =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:8080/debug" : "";
const request = function(config = {}) {
  // 创建axios
  const axiosService = axios.create({
    // 判断请求头是否是否自定义携带，否则就使用默认的请求头
    // @ts-ignore
    baseURL: config.baseURL || baseURL, //请求域名
    // @ts-ignore
    url: config.url, //请求域名路径
    // @ts-ignore
    method: config.method || "POST", //请求方法
    // @ts-ignore
    data: config.data || null, //请求传参
    // @ts-ignore
    params: config.params || null, //请求传参
    // @ts-ignore
    timeout: config.timeout || 10000 //请求时长
  });

  // 请求拦截器
  axiosService.interceptors.request.use(
    config => {
      const access_token = storage.getItem("token");
      // @ts-ignore
      config.headers.client_id = process.env.VUE_APP_ID;
      // @ts-ignore
      config.headers.client_secret = process.env.VUE_APP_ID;
      if (access_token) {
        // @ts-ignore
        config.headers.Authorization = "Bearer " + access_token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  // 响应拦截器
  axiosService.interceptors.response.use(
    response => {
      //拦截响应，做统一处理
      if (response.data.code == 401) {
        Message.warning(response.data.msg);
        return Promise.reject(response);
      }
      return response.data;
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      switch (error.request.status) {
        case 400:
          Message.error("请求错误,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 401:
          Message.error("未授权,即将跳转到登录页");
          setTimeout(() => {
            logOut();
          }, 2000);
          break;
        case 403:
          Message.error("拒绝访问,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 404:
          Message.error(
            "请求地址出错,请稍后重试。若仍然无响应，请联系技术人员"
          );
          break;
        case 408:
          Message.error("请求超时,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 500:
          Message.error(
            "服务器内部错误,请稍后重试。若仍然无响应，请联系技术人员"
          );
          break;
        case 501:
          Message.error("服务未实现,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 502:
          Message.error("网关错误,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 503:
          Message.error("服务不可用,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 504:
          Message.error("网关超时,请稍后重试。若仍然无响应，请联系技术人员");
          break;
        case 505:
          Message.error(
            "HTTP版本不受支持,请稍后重试。若仍然无响应，请联系技术人员"
          );
          break;
        default:
          break;
      }

      return Promise.reject(error.request.status); // 返回接口返回的错误信息
    }
  );

  const logOut = () => {
    localStorage.clear();
    location.href = "/login";
  };
  return axiosService(config);
};
// let request = axios.create({})

export default request;

// export const instance = request;
