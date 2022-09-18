import axios from "axios";

const BASE_URL_API = "https://vue-study.skillbox.cc/api";

function GETRequest(url, params = {}) {
  return axios.get(`${BASE_URL_API}/${url}`, { params });
}

function GETRequestById(url, id, params = {}) {
  return axios.get(`${BASE_URL_API}/${url}/${id}`, { params });
}

function POSTRequest(url, data = {}, params = {}) {
  return axios.post(`${BASE_URL_API}/${url}`, data, { params });
}

const PUTRequest = (url, { id, data = {}, params = {} }) => {
  return axios.put(`${BASE_URL_API}/${url}/${id}`, data, { params });
};

const DELETERequest = (url, id) => {
  return axios.delete(`${BASE_URL_API}/${url}/${id}`);
};

export {
  BASE_URL_API,
  GETRequest,
  GETRequestById,
  POSTRequest,
  PUTRequest,
  DELETERequest,
};
