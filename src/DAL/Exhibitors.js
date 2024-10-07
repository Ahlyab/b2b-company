import { invokeApi } from "../Hooks/InvokeAPI";

export const _getExhibitors = async () => {
  let requestObj = {
    path: "api/exhibitor/list_exhibitor",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};

export const _addExhibitor = async (data) => {
  let requestObj = {
    path: "api/exhibitor/add_exhibitor",
    method: "POST",
    postData: data,
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
      "content-type": "multipart/form-data",
    },
  };
  return invokeApi(requestObj);
};

export const _updateExhibitor = async (id, data) => {
  let requestObj = {
    path: `api/exhibitor/update_exhibitor/${id}`,
    method: "PUT",
    postData: data,
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
      "content-type": "multipart/form-data",
    },
  };
  return invokeApi(requestObj);
};

export const _deleteExhibitor = async (id) => {
  let requestObj = {
    path: `api/exhibitor/delete_exhibitor/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};
