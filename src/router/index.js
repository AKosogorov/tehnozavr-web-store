import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/pages/MainPage"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/pages/ProductPage"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/pages/CartPage"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/OrderPage"),
  },
  {
    path: "/order/:id",
    name: "orderInfo",
    component: () => import("@/pages/OrderInfoPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("@/pages/NotFoundPage"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
