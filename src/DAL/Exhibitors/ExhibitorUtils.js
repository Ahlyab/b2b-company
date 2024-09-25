import { invokeApi } from "../../Hooks/InvokeAPI";

// Sample API call
export const _admin_logout = async () => {
  let requestObj = {
    path: "api/app_api/logout",
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const _getExhibitors = async () => {
  let requestObj = {
    path: "/exhibitors",
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _addExhibitor = async (data) => {
  let requestObj = {
    path: "/exhibitors",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _editExhibitor = async (data) => {
  let requestObj = {
    path: `/exhibitors/${data.id}`,
    method: "PUT",
    postData: data,
  };
  return invokeApi(requestObj);
};
