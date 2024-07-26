import axios from "axios";
export const BASE_URL = "http://localhost:8080/v1";

export enum HTTPS_METHODS {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
  PATCH = "patch",
}

export const restClient = async (method: HTTPS_METHODS, url: string, body = {}, contentType = "application/json", params?: unknown) => {
  const token = localStorage.getItem("token");

  return await axios({
    method,
    baseURL: BASE_URL,
    url,
    data: body,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: contentType,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
