import { GETRequest, GETRequestById } from "@/http";

const URL_PRODUCTS = "products";
const URL_PRODUCT_CATEGORIES = "productCategories";

function GETProducts(params) {
  return GETRequest(URL_PRODUCTS, params);
}

function GETProductsById(id) {
  return GETRequestById(URL_PRODUCTS, id);
}

function GETProductCategories() {
  return GETRequest(URL_PRODUCT_CATEGORIES);
}

export { GETProducts, GETProductsById, GETProductCategories };
