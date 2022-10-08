/**
 *  权限相关接口v1.0  -> 业务接口
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 添加角色模板-接口
export const InsertRole = (params = {}) => {
  return http
    .post(`${baseURL}/Role/InsertRole`, params)
    .then((res) => res.data);
};

// 查询角色模板-接口
export const SelectRole = (params = {}) => {
  return http
    .post(`${baseURL}/Role/SelectRole`, params)
    .then((res) => res.data);
};

// 角色模板详情-接口
export const GetRoleDetails = (params = {}) => {
  return http
    .post(`${baseURL}/Role/GetRoleDetails`, params)
    .then((res) => res.data);
};

// 修改角色模板-接口
export const UpdateRole = (params = {}) => {
  return http
    .post(`${baseURL}/Role/UpdateRole`, params)
    .then((res) => res.data);
};

// 删除角色模板-接口
export const DeleteRole = (params = {}) => {
  return http
    .post(`${baseURL}/Role/DeleteRole`, params)
    .then((res) => res.data);
};

// 查询模块-接口
export const SelectModule = (params = {}) => {
  return http
    .post(`${baseURL}/Role/SelectModule`, params)
    .then((res) => res.data);
};
