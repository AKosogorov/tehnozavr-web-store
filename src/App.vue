<template>
  <div>
    <TheHeader />

    <router-view />

    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter";
import TheHeader from "@/components/TheHeader";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  created() {
    const userAccessKey = localStorage.getItem("userAccessKey");
    if (userAccessKey) {
      this.$store.commit("setUserAccessKey", userAccessKey);
    }

    this.$store.dispatch("loadCart");
  },
};
</script>
