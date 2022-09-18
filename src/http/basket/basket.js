import { BASE_URL_API, GETRequest, POSTRequest } from "@/http";
import axios from "axios";

const URL_BASKETS = "baskets";
const URL_BASKETS_PRODUCTS = "baskets/products";

function GETBaskets(params) {
  return GETRequest(URL_BASKETS, params);
}

function POSTBasketsProducts(data, params) {
  return POSTRequest(URL_BASKETS_PRODUCTS, data, params);
}
function PUTBasketsProducts(data, params) {
  return axios.put(`${BASE_URL_API}/${URL_BASKETS_PRODUCTS}`, data, { params });
}
function DELETEBasketsProducts(id, params) {
  const data = {
    productId: id,
  };

  return axios.delete(`${BASE_URL_API}/${URL_BASKETS_PRODUCTS}`, {
    data,
    params,
  });
}

export {
  GETBaskets,
  POSTBasketsProducts,
  PUTBasketsProducts,
  DELETEBasketsProducts,
};
