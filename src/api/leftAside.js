import request from "../utils/request";

export function publicUser(params) {
  request({
    url: "/PublicPaper/publicUser",
    method: "get",
    params,
  });
}
