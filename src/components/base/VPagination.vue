<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': isFirstPage }"
        :disabled="isFirstPage"
        aria-label="Предыдущая страница"
        @click.prevent="paginate(page - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </button>
    </li>
    <li
      class="pagination__item"
      v-for="pageNumber in totalPage"
      :key="pageNumber"
    >
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        href="#"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': isLastPage }"
        :disabled="isLastPage"
        aria-label="Следующая страница"
        @click.prevent="paginate(page + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: "page",
    event: "paginate",
  },

  props: {
    page: Number,
    count: Number,
    perPage: Number,
  },

  computed: {
    totalPage() {
      return Math.ceil(this.count / this.perPage);
    },

    isFirstPage() {
      return this.page === 1;
    },
    isLastPage() {
      return this.page === this.totalPage;
    },
  },

  methods: {
    paginate(page) {
      this.$emit("paginate", page);
    },
  },
};
</script>
