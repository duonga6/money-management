<template>
  <footer
    id="footer"
    class="fixed w-full bottom-0 left-0 bg-white pt-4 p-b-safe-4"
  >
    <div class="container mx-auto px-8 h-full">
      <ul class="flex justify-between h-full items-center">
        <li v-for="navItem in navItems" :key="navItem.name">
          <router-link :to="navItem.route">
            <i class="t2ico text-xl" :class="navItem.icon"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <div
      data-plus-btn-bg
      class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red"
    ></div>
    <router-link
      :to="{ name: 'NewTransaction', params: {} }"
      class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex justify-center items-center"
    >
      <i class="t2ico t2ico-plus font-bold text-white text-xl"></i>
    </router-link>
  </footer>
</template>

<script>
import { reactive } from "vue";
import { NAV_ITEMS_BOTTOM } from "@/constants";
export default {
  setup() {
    const navItems = reactive(NAV_ITEMS_BOTTOM);

    return { navItems };
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

  div[data-plus-btn-bg] {
    @apply absolute bg-dark-light;

    width: 56px;
    height: 28px;

    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
  }
}
</style>
