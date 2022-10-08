/**
 *  日志相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 查询日志-接口
export const SelectLog = (params = {}) => {
  return http
    .post(`${baseURL}/Log/SelectLog`, params)
    .then((res) => res.data);
};
