import { invokeApi } from "../Hooks/InvokeAPI";

export const _login = async (data) => {
  let requestObj = {
    path: "api/app_api/login",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};
