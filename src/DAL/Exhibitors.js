import { invokeApi } from "../Hooks/InvokeAPI";

export const _getExhibitors = async () => {
  let requestObj = {
    path: "exhibitors",
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _addExhibitor = async (data) => {
  let requestObj = {
    path: "exhibitors",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _updateExhibitor = async (data) => {
  let requestObj = {
    path: `exhibitors/${data.id}`,
    method: "PUT",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _deleteExhibitor = async (id) => {
  let requestObj = {
    path: `exhibitors/${id}`,
    method: "DELETE",
  };
  return invokeApi(requestObj);
};
