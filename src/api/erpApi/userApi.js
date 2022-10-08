/**
 *  用户相关接口v1.0  -> 业务接口 
 */
import {
  http,
  baseURL
} from "../conf/index-json";
import qs from "qs";

// 添加用户-接口
export const InsertUser = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/InsertUser`, params)
    .then((res) => res.data);
};

// 查询用户-接口
export const SelectUser = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/SelectUser`, params)
    .then((res) => res.data);
};

// 用户详情-接口
export const GetUserDetails = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/GetUserDetails`, params)
    .then((res) => res.data);
};

// 启用/停用用户-接口
export const UpdateUserState = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/UpdateUserState`, params)
    .then((res) => res.data);
};

// 修改用户-接口
export const UpdateUser = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/UpdateUser`, params)
    .then((res) => res.data);
};

// 导入用户信息-接口
export const ExcelToUser = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/ExcelToUser`, params)
    .then((res) => res);
};

// 导出用户信息-接口
export const UserExcel = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/UserExcel`, params, {
      responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
      observe: "response", //要获取到完全的response,在 发起请求时 在option中添加 observe: ‘response’; },
      getResponse: true
    })
    .then((res) => res);
};

// 上传照片-接口
export const UploadPictures = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/UploadPictures`, params)
    .then((res) => res.data);
};

// 加载照片-接口
export const LoadingPhoto = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/LoadingPhoto?path=${params}`, {}, {
      responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
    })
    .then((res) => res.data);
};

// 上传文件-接口
export const UploadFile = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/UploadFile`, params)
    .then((res) => res.data);
};

// 下载文件-接口
export const DownloadFile = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/DownloadFile`, params)
    .then((res) => res.data);
};

// 查询部门-接口
export const SelectDepartment = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/SelectDepartment`, params)
    .then((res) => res.data);
};

// 查询职位-接口
export const SelectPosition = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/SelectPosition`, params)
    .then((res) => res.data);
};

// 学历占比-接口
export const GetEducationProportion = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/GetEducationProportion`, params)
    .then((res) => res.data);
};

// 性别占比-接口
export const GetGenderProportion = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/GetGenderProportion`, params)
    .then((res) => res.data);
};

// 试用/转正用户-接口
export const UpdateUserEmployeeState = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/UpdateUserEmployeeState`, params)
    .then((res) => res.data);
};

// 查询部门负责人-接口
export const SelectDepartmentHead = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/SelectDepartmentHead`, params)
    .then((res) => res.data);
};

// 查询模块审核人-接口
export const SelectModuleCheck = (params = {}) => {
  return http
    .post(`${baseURL}/Manage/SelectModuleCheck`, params)
    .then((res) => res.data);
};
