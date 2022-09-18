<template>
  <main class="content container">
    <div class="content__top">
      <VBreadcrumbs :breadcrumbs-list="breadcrumbsList" />

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ contentInfoText }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="item in products"
              :key="item.productId"
              :item="item"
            />
          </ul>
        </div>

        <div v-if="products.length" class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link
            :to="{ name: 'order' }"
            class="cart__button button button--primery"
            tag="button"
            type="button"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from "@/components/cart/CartItem";
import { mapGetters } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import VBreadcrumbs from "@/components/base/VBreadcrumbs";
import textFormatByCount from "@/helpers/textFormatByCount";

export default {
  components: {
    VBreadcrumbs,
    CartItem,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      cartAmount: "cartAmount",
    }),

    contentInfoText() {
      return textFormatByCount("товар", this.cartAmount, "Корзина пуста");
    },
    breadcrumbsList() {
      return [
        { pageName: "Каталог", routeName: "main" },
        { pageName: "Корзина", routeName: "cart" },
      ];
    },
  },
};
</script>
