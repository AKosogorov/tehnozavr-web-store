<template>
  <ul class="catalog__list">
    <ProductListItem
      v-for="product in products"
      :product="product"
      :key="product.id"
    />
  </ul>
</template>

<script>
import ProductListItem from "@/components/product/ProductListItem";

export default {
  components: {
    ProductListItem,
  },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
