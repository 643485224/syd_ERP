/**
 *  登录相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 用户登录-接口
export const UserLogin = (params = {}) => {
  return http
    .post(`${baseURL}/Login/UserLogin`, params)
    .then((res) => res.data);
};

// 获取登录信息-接口
export const GetLoginState = (params = {}) => {
  return http
    .post(`${baseURL}/Login/GetLoginState`, params)
    .then((res) => res.data);
};

// 用户身份验证-接口
export const UserVerify = (params = {}) => {
  return http
    .post(`${baseURL}/Login/UserVerify`, params)
    .then((res) => res.data);
};

// 修改密码-接口
export const UpdatePassword = (params = {}) => {
  return http
    .post(`${baseURL}/Login/UpdatePassword`, params)
    .then((res) => res.data);
};

// 退出登录-接口
export const LoginOut = (params = {}) => {
  return http
    .post(`${baseURL}/Login/LoginOut`, params)
    .then((res) => res.data);
};
