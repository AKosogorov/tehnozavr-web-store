<template>
  <main v-if="loadingOrderInfo" class="content container">
    <Preloader />
  </main>
  <main v-else-if="!orderInfo.id" class="content container">
    <h1 class="content__title">Заказ не найден</h1>
  </main>
  <main v-else class="content container">
    <div class="content__top">
      <VBreadcrumbs :breadcrumbs-list="breadcrumbsList" />

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <OrderInfoItem label="Получатель" :text="orderInfo.name" />
            <OrderInfoItem label="Адрес доставки" :text="orderInfo.address" />
            <OrderInfoItem label="Телефон" :text="orderInfo.phone" />
            <OrderInfoItem label="Email" :text="orderInfo.email" />
            <OrderInfoItem label="Способ оплаты" text="картой при получении" />
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem
              v-for="(item, i) of products"
              :key="i"
              class="cart__order"
              :item="item"
            />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b>{{ contentInfoText }}</b> на сумму
              <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import VBreadcrumbs from "@/components/base/VBreadcrumbs";
import OrderInfoItem from "@/components/order/OrderInfoItem";
import OrderItem from "@/components/order/OrderItem";
import Preloader from "@/components/base/Preloader";
import { mapActions, mapState } from "vuex";
import textFormatByCount from "@/helpers/textFormatByCount";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {
    VBreadcrumbs,
    OrderInfoItem,
    OrderItem,
    Preloader,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState(["orderInfo", "loadingOrderInfo"]),

    products() {
      if (!this.orderInfo?.basket?.id) return [];
      return this.orderInfo.basket.items.map((item) => ({
        ...item,
        amount: item.quantity,
      }));
    },

    contentInfoText() {
      return textFormatByCount("товар", this.products.length, "Корзина пуста");
    },

    breadcrumbsList() {
      return [
        { pageName: "Каталог", routeName: "main" },
        { pageName: "Корзина", routeName: "cart" },
        { pageName: "Информация о заказе", routeName: "orderInfo" },
      ];
    },
  },
  created() {
    if (this.orderInfo?.id === this.$route.params.id) {
      return;
    }

    this.loadOrderInfo(this.$route.params.id);
  },
  methods: {
    ...mapActions(["loadOrderInfo"]),
  },
};
</script>
