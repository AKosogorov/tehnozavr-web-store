<template>
  <router-link
    class="header__cart"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>

    <span class="header__count" aria-label="Количество товаров">
      {{ $store.state.cartProducts.length }}
    </span>

    <Preloader v-if="$store.state.loadingAddToCart" class="loader--cart" />
  </router-link>
</template>

<script>
import Preloader from "@/components/base/Preloader";
export default {
  components: {
    Preloader,
  },
};
</script>
