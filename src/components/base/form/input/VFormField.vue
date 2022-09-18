<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ label }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    label: String,
    error: String,
  },
};
</script>
