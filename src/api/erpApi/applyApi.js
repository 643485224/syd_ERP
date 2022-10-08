/**
 *  申请相关接口v1.0  -> 业务接口
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 提交申请-接口
export const InsertApply = (params = {}) => {
  return http
    .post(`${baseURL}/Apply/InsertApply`, params)
    .then((res) => res.data);
};

// 查询申请-接口
export const SelectApply = (params = {}) => {
  return http
    .post(`${baseURL}/Apply/SelectApply`, params)
    .then((res) => res.data);
};

// 一级审核-接口
export const OneCheckApply = (params = {}) => {
  return http
    .post(`${baseURL}/Apply/OneCheckApply`, params)
    .then((res) => res.data);
};

// 二级审核-接口
export const TwoCheckApply = (params = {}) => {
  return http
    .post(`${baseURL}/Apply/TwoCheckApply`, params)
    .then((res) => res.data);
};
