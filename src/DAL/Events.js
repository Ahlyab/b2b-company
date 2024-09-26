import { invokeApi } from "../Hooks/InvokeAPI";

export const _getEvents = async () => {
  let requestObj = {
    path: "events",
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _getEvent = async (id) => {
  let requestObj = {
    path: `events/${id}`,
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _addEvent = async (data) => {
  let requestObj = {
    path: "events",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _updateEvent = async (data) => {
  let requestObj = {
    path: `events/${data.id}`,
    method: "PUT",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _deleteEvent = async (id) => {
  let requestObj = {
    path: `events/${id}`,
    method: "DELETE",
  };
  return invokeApi(requestObj);
};
