import Vue from "vue";
import Vuex from "vuex";
import {
  DELETEBasketsProducts,
  GETBaskets,
  POSTBasketsProducts,
  PUTBasketsProducts,
} from "@/http/basket/basket";
import { GETOrderById } from "@/http/orders/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: "",
    cartProducts: [],
    cartProductsData: [],
    loadingAddToCart: false,
    loadingOrderInfo: false,
    orderInfo: {},
  },
  getters: {
    cartAmount(state) {
      return state.cartProducts.length;
    },
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        ).product;

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const product = state.cartProducts.find(
        (product) => product.productId === productId
      );
      if (product) {
        product.amount = amount;
      }
    },
    removeCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (i) => i.productId !== productId
      );
    },
    resetCartProduct(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    setUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    setCartProductsData(state, data) {
      state.cartProductsData = data;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    setLoadingAddToCart(state, bool) {
      state.loadingAddToCart = bool;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    async loadOrderInfo({ commit, state }, orderId) {
      state.loadingOrderInfo = true;
      try {
        // 3626
        const response = await GETOrderById(orderId);
        commit("updateOrderInfo", response.data);
      } catch (e) {
        console.error(e);
      } finally {
        state.loadingOrderInfo = false;
      }
    },
    async loadCart({ state, commit, dispatch }) {
      try {
        const response = await GETBaskets({
          userAccessKey: state.userAccessKey,
        });
        if (!state.userAccessKey) {
          localStorage.setItem("userAccessKey", response.data.user.accessKey);
          commit("setUserAccessKey", response.data.user.accessKey);
        }
        dispatch("updateProductsData", response.data.items);
      } catch (e) {
        console.error(e);
      }
    },
    async addProductToCart({ state, dispatch, commit }, { productId, amount }) {
      commit("setLoadingAddToCart", true);
      try {
        const response = await POSTBasketsProducts(
          {
            productId,
            quantity: amount,
          },
          {
            userAccessKey: state.userAccessKey,
          }
        );

        dispatch("updateProductsData", response.data.items);
      } catch (e) {
        console.error(e);
      } finally {
        commit("setLoadingAddToCart", false);
      }
    },
    async updateProductCartAmount({ state, commit }, { productId, amount }) {
      commit("updateCartProductAmount", { productId, amount });

      if (amount < 1) return;
      try {
        const response = await PUTBasketsProducts(
          {
            productId,
            quantity: amount,
          },
          {
            userAccessKey: state.userAccessKey,
          }
        );

        commit("setCartProductsData", response.data.items);
      } catch (e) {
        console.error(e);
        commit("syncCartProducts");
      }
    },
    async deleteCartProduct({ state, commit }, id) {
      commit("removeCartProduct", id);
      try {
        await DELETEBasketsProducts(id, {
          userAccessKey: state.userAccessKey,
        });
      } catch (e) {
        console.error(e);
        commit("syncCartProducts");
      }
    },
    updateProductsData({ commit }, data) {
      commit("setCartProductsData", data);
      commit("syncCartProducts");
    },
  },
});
