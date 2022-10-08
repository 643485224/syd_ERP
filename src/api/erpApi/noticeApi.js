/**
 *  通知相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 查询通知-接口
export const SelectInform = (params = {}) => {
  return http
    .post(`${baseURL}/Inform/SelectInform`, params)
    .then((res) => res.data);
};

// 查询用户通知-接口
export const SelectUserInform = (params = {}) => {
  return http
    .post(`${baseURL}/Inform/SelectUserInform`, params)
    .then((res) => res.data);
};

// 发布通知-接口
export const InsertInform = (params = {}) => {
  return http
    .post(`${baseURL}/Inform/InsertInform`, params)
    .then((res) => res.data);
};

// 审核通知-接口
export const CheckInform = (params = {}) => {
  return http
    .post(`${baseURL}/Inform/CheckInform`, params)
    .then((res) => res.data);
};

// 删除通知-接口
export const DeleteInform = (params = {}) => {
  return http
    .post(`${baseURL}/Inform/DeleteInform`, params)
    .then((res) => res.data);
};

// 通知已读-接口
export const InsertInformRead = (params = {}) => {
  return http
    .post(`${baseURL}/Inform/InsertInformRead`, params)
    .then((res) => res.data);
};
