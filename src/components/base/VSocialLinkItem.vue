<template>
  <li class="social__item">
    <a class="social__link" :href="social.href" :aria-label="social.ariaLabel">
      <svg
        :width="social.icon.width"
        :height="social.icon.height"
        fill="currentColor"
      >
        <use :xlink:href="`#icon-${social.icon.name}`"></use>
      </svg>
    </a>
  </li>
</template>

<script>
import { SOCIAL_DATA, SOCIAL_NAME_LIST } from "@/data/social";

export default {
  props: {
    socialName: {
      type: String,
      validator(value) {
        return SOCIAL_NAME_LIST.includes(value);
      },
    },
  },
  computed: {
    social() {
      return SOCIAL_DATA[this.socialName];
    },
  },
};
</script>
