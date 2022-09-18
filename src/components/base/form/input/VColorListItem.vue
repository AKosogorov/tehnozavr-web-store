<template>
  <li class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        name="color"
        :value="color.id"
        @change="onChange($event.target.value)"
      />
      <span class="colors__value" :style="{ 'background-color': color.code }">
      </span>
    </label>
  </li>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onChange(value) {
      this.$emit("onChange", value);
    },
  },
};
</script>
