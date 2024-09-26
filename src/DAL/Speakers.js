import { invokeApi } from "../Hooks/InvokeAPI";

export const _getSpeakers = async () => {
  let requestObj = {
    path: "speakers",
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _getSpeaker = async (id) => {
  let requestObj = {
    path: `speakers/${id}`,
    method: "GET",
  };
  return invokeApi(requestObj);
};

export const _addSpeaker = async (data) => {
  let requestObj = {
    path: "speakers",
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _updateSpeaker = async (data) => {
  let requestObj = {
    path: `speakers/${data.id}`,
    method: "PUT",
    postData: data,
  };
  return invokeApi(requestObj);
};

export const _deleteSpeaker = async (id) => {
  let requestObj = {
    path: `speakers/${id}`,
    method: "DELETE",
  };
  return invokeApi(requestObj);
};
