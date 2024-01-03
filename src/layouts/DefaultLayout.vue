<template>
  <navigation-header />
  <slot />
  <navigation-bottom v-if="!meta.isHideBottom" />
</template>

<script>
import NavigationBottom from "@/components/NavigationBottom.vue";
import NavigationHeader from "@/components/NavigationHeader.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    const route = useRoute();

    return { meta: computed(() => route.meta) };
  },
  components: {
    NavigationBottom,
    NavigationHeader,
  },
};
</script>
