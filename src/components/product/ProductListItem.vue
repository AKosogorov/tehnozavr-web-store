<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <VColorList class="colors--black" :colors="product.colors" />
  </li>
</template>

<script>
import VColorList from "@/components/base/form/input/VColorList";
import numberFormat from "@/helpers/numberFormat";

export default {
  name: 'ProductListItem',
  components: {
    VColorList,
  },
  filters: {
    numberFormat,
  },
  props: {
    product: {
      type: Object,
      default: new Object(),
    },
  },
};
</script>
