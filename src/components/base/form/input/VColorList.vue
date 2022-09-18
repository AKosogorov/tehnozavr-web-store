<template>
  <ul class="colors">
    <VColorListItem
      v-for="color in colors"
      :key="color.id"
      :color="color"
      @onChange="setCurrentColor"
    />
  </ul>
</template>

<script>
import VColorListItem from "@/components/base/form/input/VColorListItem";

export default {
  model: {
    prop: "currentColorId",
    event: "setCurrentColor",
  },
  components: { VColorListItem },
  props: {
    colors: Array,
    currentColorId: Number,
  },
  methods: {
    setCurrentColor(colorId) {
      this.$emit("setCurrentColor", colorId);
    },
  },
};
</script>
