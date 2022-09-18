import { GETRequestById, POSTRequest } from "@/http";
import store from "@/store";

const URL_ORDERS = "orders";

function GETOrderById(id) {
  return GETRequestById(URL_ORDERS, id, {
    userAccessKey: store.state.userAccessKey,
  });
}

function POSTOrders(data) {
  return POSTRequest(URL_ORDERS, data, {
    userAccessKey: store.state.userAccessKey,
  });
}

export { GETOrderById, POSTOrders };
