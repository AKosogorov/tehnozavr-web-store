<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ contentInfoText }} </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :priceFrom.sync="filterPriceFrom"
        :priceTo.sync="filterPriceTo"
        :categoryId.sync="filterCategoryId"
        :color.sync="filterColorId"
      />

      <section class="catalog">
        <Preloader v-if="loading" />

        <div v-if="requestError">Произошла ошибка при загрузке товаров!</div>

        <button
          v-if="requestError"
          class="button button--primery"
          @click="loadProducts"
        >
          Попробовать еще
        </button>

        <ProductList v-if="products.length" :products="products" />

        <VPagination
          v-if="products.length"
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from "@/components/product/ProductFilter";
import ProductList from "@/components/product/ProductList";
import VPagination from "@/components/base/VPagination";
import Preloader from "@/components/base/Preloader";
import { GETProducts } from "@/http/product/product";
import textFormatByCount from "@/helpers/textFormatByCount";

export default {
  components: {
    Preloader,
    ProductFilter,
    ProductList,
    VPagination,
  },

  data: () => ({
    filterPriceFrom: 0,
    filterPriceTo: 0,
    filterCategoryId: 0,
    filterColorId: 0,
    page: 1,
    productsPerPage: 6,
    productsData: null,
    loading: false,
    requestError: false,
  }),

  computed: {
    products() {
      return (
        this.productsData?.items.map((item) => ({
          ...item,
          image: item.image.file.url,
        })) || []
      );
    },

    countProducts() {
      return this.productsData?.pagination?.total || 0;
    },
    contentInfoText() {
      return textFormatByCount("товар", this.countProducts);
    },
    queryParams() {
      return {
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo,
        categoryId: this.filterCategoryId,
        colorId: this.filterColorId,
      };
    },
  },
  methods: {
    async loadProducts() {
      clearTimeout(this.timeoutLoadProducts);
      this.loading = true;
      this.requestError = false;
      this.productsData = null;
      this.timeoutLoadProducts = setTimeout(async () => {
        try {
          const response = await GETProducts(this.queryParams);
          this.productsData = response.data;
        } catch (e) {
          this.requestError = true;
        } finally {
          this.loading = false;
        }
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
