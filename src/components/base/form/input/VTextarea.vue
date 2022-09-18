<template>
  <VFormField :label="label" :error="error">
    <textarea
      v-model="dataValue"
      class="form__input form__input--area"
      :name="name"
      :placeholder="placeholder"
    />
  </VFormField>
</template>

<script>
import mixinFormField from "@/mixins/mixinFormField";

export default {
  mixins: [mixinFormField],
};
</script>
