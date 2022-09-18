<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" v-for="(item, i) of breadcrumbsList" :key="i">
      <router-link
        class="breadcrumbs__link"
        :to="{ name: item.routeName, params: item.params }"
      >
        {{ item.pageName }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "VBreadcrumbs",
  props: {
    breadcrumbsList: {
      type: Array,
      required: true,
    },
  },
};
</script>
