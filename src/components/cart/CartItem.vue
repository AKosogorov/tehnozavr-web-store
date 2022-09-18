<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        alt="item.product.title"
      />
    </div>

    <h3 class="product__title">
      <router-link :to="{ name: 'product', params: { id: item.productId } }">
        {{ item.product.title }}
      </router-link>
    </h3>

    <p class="product__info">Объем: <span>128GB</span></p>

    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <VCounter class="product__counter" v-model.number="amount" />

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="removeItem(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import VCounter from "@/components/base/form/input/VCounter";
import { mapActions } from "vuex";
import mixinProductItem from "@/mixins/mixinProductItem";

export default {
  mixins: [mixinProductItem],
  components: {
    VCounter,
  },

  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateProductCartAmount", {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions({
      removeItem: "deleteCartProduct",
    }),
  },
};
</script>
