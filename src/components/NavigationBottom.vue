<template>
  <footer
    id="footer"
    class="fixed w-full bottom-0 left-0 bg-white pt-4 p-b-safe-4"
  >
    <div class="container mx-auto px-8 h-full">
      <ul class="flex justify-between h-full items-center">
        <li v-for="navItem in navItems" :key="navItem.name">
          <router-link :to="navItem.route" class="p-2">
            <i class="t2ico text-xl" :class="navItem.icon"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Button Add Transaction -->
    <template v-if="routeName == 'Wallet'"></template>
    <component v-else :is="'add-transaction-btn'"></component>
  </footer>
</template>

<script>
import { computed, reactive } from "vue";
import { NAV_ITEMS_BOTTOM } from "@/constants";
import { useRoute } from "vue-router";
export default {
  setup() {
    const navItems = reactive(NAV_ITEMS_BOTTOM);
    const route = useRoute();

    return { navItems, routeName: computed(() => route.name) };
  },
};
</script>

<style lang="scss" scoped>
#footer {
  ul {
    li {
      &:nth-child(2) {
        margin-right: 8%;
      }

      &:nth-child(3) {
        margin-left: 8%;
      }
    }
  }
}
</style>
