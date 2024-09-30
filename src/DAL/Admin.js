import { invokeApi } from "../Hooks/InvokeAPI";

export const _login = async (data) => {
  let requestObj = {
    path: "api/app_api/login",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _logout = async () => {
  let requestObj = {
    path: "api/app_api/logout",
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};

export const _email_verification = async (data) => {
  let requestObj = {
    path: "api/app_api/email_verification",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _verify_code = async (data) => {
  let requestObj = {
    path: "api/app_api/code_verification",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _reset_password = async (data) => {
  let requestObj = {
    path: "api/app_api/reset_password",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};
