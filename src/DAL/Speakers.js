import { invokeApi } from "../Hooks/InvokeAPI";

export const _getSpeakers = async () => {
  let requestObj = {
    path: "api/speaker/list_speaker",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};

export const _getSpeaker = async (id) => {
  let requestObj = {
    path: `api/speaker/detail_speaker/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};

export const _addSpeaker = async (data) => {
  let requestObj = {
    path: "api/speaker/add_speaker",
    method: "POST",
    postData: data,
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
      "Content-Type": "multipart/form-data",
    },
  };
  return invokeApi(requestObj);
};

export const _updateSpeaker = async (data) => {
  const id = data.get("_id");
  data.delete("_id");
  let requestObj = {
    path: `api/speaker/update_speaker/${id}`,
    method: "PUT",
    postData: data,
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
      "Content-Type": "multipart/form-data",
    },
  };
  return invokeApi(requestObj);
};

export const _deleteSpeaker = async (id) => {
  let requestObj = {
    path: `api/speaker/delete_speaker/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("authToken"),
    },
  };
  return invokeApi(requestObj);
};
