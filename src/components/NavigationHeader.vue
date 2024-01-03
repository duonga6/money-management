<template>
  <header id="header">
    <div class="container mx-auto p-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div
            v-if="meta.leading"
            class="w-10 h-10 rounded-full overflow-hidden"
          >
            <img
              class="w-full h-full object-cover"
              src="https://www.bellybelly.com.au/wp-content/uploads/2015/12/shutterstock_1514629235-1.jpg"
              alt="User's avatar"
            />
          </div>
          <div class="font-bold text-xl ml-4">{{ meta.text }}</div>
        </div>
        <div class="flex">
          <ul>
            <li>
              <i class="t2ico t2ico-notification text-2xl"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    return {
      meta: computed(() => route.meta),
    };
  },
};
</script>
