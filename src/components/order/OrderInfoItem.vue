<template>
  <li class="dictionary__item">
    <span class="dictionary__key">
      {{ label }}
    </span>
    <span class="dictionary__value">
      {{ text }}
    </span>
  </li>
</template>

<script>
export default {
  props: {
    label: String,
    text: [String, Number],
  },
};
</script>
