import numberFormat from "@/helpers/numberFormat";

export default {
  props: {
    item: Object,
  },

  filters: {
    numberFormat,
  },
};
