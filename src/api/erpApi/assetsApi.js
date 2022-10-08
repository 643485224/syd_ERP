/**
 *  资产相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 添加资产-接口
export const InsertProperty = (params = {}) => {
  return http
    .post(`${baseURL}/Property/InsertProperty`, params)
    .then((res) => res.data);
};

// 审核资产-接口
export const CheckProperty = (params = {}) => {
  return http
    .post(`${baseURL}/Property/CheckProperty`, params)
    .then((res) => res.data);
};

// 查询资产库存-接口
export const SelectProperty = (params = {}) => {
  return http
    .post(`${baseURL}/Property/SelectProperty`, params)
    .then((res) => res.data);
};

// 查询资产领用-接口
export const SelectPropertyReceive = (params = {}) => {
  return http
    .post(`${baseURL}/Property/SelectPropertyReceive`, params)
    .then((res) => res.data);
};

// 查询资产异常-接口
export const SelectPropertyAnomaly = (params = {}) => {
  return http
    .post(`${baseURL}/Property/SelectPropertyAnomaly`, params)
    .then((res) => res.data);
};

// 查询资产申请记录-接口
export const SelectPropertyCheck = (params = {}) => {
  return http
    .post(`${baseURL}/Property/SelectPropertyCheck`, params)
    .then((res) => res.data);
};

// 申请资产-接口
export const InsertPropertyDetail = (params = {}) => {
  return http
    .post(`${baseURL}/Property/InsertPropertyDetail`, params)
    .then((res) => res.data);
};

// 查询资产仓库-接口
export const SelectPropertyWarehouse = (params = {}) => {
  return http
    .post(`${baseURL}/Property/SelectPropertyWarehouse`, params)
    .then((res) => res.data);
};

// 查询资产类别-接口
export const SelectPropertyType = (params = {}) => {
  return http
    .post(`${baseURL}/Property/SelectPropertyType`, params)
    .then((res) => res.data);
};
