<template>
  <VFormField :label="label" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
    />
  </VFormField>
</template>

<script>
import mixinFormField from "@/mixins/mixinFormField";
export default {
  mixins: [mixinFormField],
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>
