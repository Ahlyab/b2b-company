import { invokeApi } from "../../Hooks/InvokeAPI";

export const _deleteRow = async (path, id) => {
  let requestObj = {
    path: `/${path}${id}`,
    method: "DELETE",
  };
  return invokeApi(requestObj);
};

export const _getData = async (path) => {
  let requestObj = {
    path: `/${path}`,
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _addOrUpdateData = async (path, method, data) => {
  let requestObj = {
    path: `${path}`,
    method: method,
    postData: data,
  };
  return invokeApi(requestObj);
};
