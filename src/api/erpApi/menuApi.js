/**
 *  菜单相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 查询全部快捷菜单-接口
export const UserLogin = (params = {}) => {
  return http
    .post(`${baseURL}/Login/UserLogin`, params)
    .then((res) => res.data);
};

// 查询账户快捷菜单-接口
export const SelectShortcut = (params = {}) => {
  return http
    .post(`${baseURL}/Shortcuts/SelectShortcut`, params)
    .then((res) => res.data);
};

// 修改账号快捷菜单-接口
export const UpdateShortcut = (params = {}) => {
  return http
    .post(`${baseURL}/Shortcuts/UpdateShortcut`, params)
    .then((res) => res.data);
};
