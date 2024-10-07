import { invokeApi } from "../Hooks/InvokeAPI";

export const _getEvents = async () => {
  let requestObj = {
    path: "api/event/list_event",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};

export const _getEvent = async (id) => {
  let requestObj = {
    path: `api/event/detail_event/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};

export const _addEvent = async (data) => {
  let requestObj = {
    path: "api/event/add_event",
    method: "POST",
    postData: data,
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
      "Content-Type": "multipart/form-data",
    },
  };
  return invokeApi(requestObj);
};

export const _updateEvent = async (id, data) => {
  let requestObj = {
    path: `api/event/update_event/${id}`,
    method: "PUT",
    postData: data,
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
      "Content-Type": "multipart/form-data",
    },
  };
  return invokeApi(requestObj);
};

export const _deleteEvent = async (id) => {
  let requestObj = {
    path: `api/event/delete_event/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};
