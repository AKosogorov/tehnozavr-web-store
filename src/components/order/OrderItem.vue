<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ (item.amount * item.product.price) | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import mixinProductItem from "@/mixins/mixinProductItem";

export default {
  mixins: [mixinProductItem],
};
</script>
