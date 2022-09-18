<template>
  <main class="content container">
    <div class="content__top">
      <VBreadcrumbs :breadcrumbs-list="breadcrumbsList" />

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ contentInfoText }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="sendOrder">
        <div class="cart__field">
          <div class="cart__data">
            <VInput
              v-model="formData.name"
              label="ФИО"
              placeholder="Введите ваше полное имя"
              :error="formError.name"
            />

            <VInput
              v-model="formData.address"
              label="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formError.address"
            />

            <VInput
              v-model="formData.phone"
              label="Телефон"
              placeholder="Введите ваш телефон"
              type="tel"
              :error="formError.phone"
            />

            <VInput
              v-model="formData.email"
              label="Email"
              placeholder="Введите ваш Email"
              type="email"
              :error="formError.email"
            />

            <VTextarea
              v-model="formData.comment"
              label="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
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
              <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            <Preloader v-if="isSending" class="loader--button-primary" />
            <span v-else>Оформить заказ</span>
          </button>
        </div>

        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import VBreadcrumbs from "@/components/base/VBreadcrumbs";
import OrderItem from "@/components/order/OrderItem";
import VInput from "@/components/base/form/input/VInput";
import VTextarea from "@/components/base/form/input/VTextarea";

import { mapGetters, mapMutations } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import textFormatByCount from "@/helpers/textFormatByCount";
import { POSTOrders } from "@/http/orders/orders";
import Preloader from "@/components/base/Preloader";

export default {
  name: "OrderPage",
  components: {
    Preloader,
    VBreadcrumbs,
    OrderItem,
    VInput,
    VTextarea,
  },
  filters: {
    numberFormat,
  },
  data: () => ({
    formData: {},
    formError: {},
    formErrorMessage: "",
    isSending: false,
  }),
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
        { pageName: "Оформление заказа", routeName: "order" },
      ];
    },
  },
  methods: {
    ...mapMutations(["resetCartProduct", "updateOrderInfo"]),

    async sendOrder() {
      this.formError = {};
      this.formErrorMessage = "";
      this.isSending = true;
      try {
        const response = await POSTOrders(this.formData);
        this.resetCartProduct();
        this.updateOrderInfo(response.data);
        this.formData = {};
        await this.$router.push({
          name: "orderInfo",
          params: { id: response.data.id },
        });
      } catch (e) {
        this.formError = e.response?.data?.error?.request || {};
        this.formErrorMessage = e.response?.data?.error?.message || "";
        console.error(e);
      } finally {
        this.isSending = false;
      }
    },
  },
};
</script>
