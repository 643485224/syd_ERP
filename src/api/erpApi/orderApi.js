/**
 *  订单相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 生成订单-接口
export const InsertOrders = (params = {}) => {
  return http
    .post(`${baseURL}/Order/InsertOrders`, params)
    .then((res) => res.data);
};

// 审核订单-接口
export const CheckOrders = (params = {}) => {
  return http
    .post(`${baseURL}/Order/CheckOrders`, params)
    .then((res) => res.data);
};

// 查询订单-接口
export const SelectOrders = (params = {}) => {
  return http
    .post(`${baseURL}/Order/SelectOrders`, params)
    .then((res) => res.data);
};
