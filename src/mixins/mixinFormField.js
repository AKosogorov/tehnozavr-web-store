import VFormField from "@/components/base/form/input/VFormField";

export default {
  components: { VFormField },
  props: {
    label: String,
    error: String,
    placeholder: String,
    name: String,
    value: String,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
