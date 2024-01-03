<template>
  <!-- Start Info -->
  <div class="row" v-if="user">
    <div class="container mx-auto p-8">
      <div class="text-center">
        <div class="w-24 h-24 rounded-full overflow-hidden mx-auto">
          <img
            src="https://www.bellybelly.com.au/wp-content/uploads/2015/12/shutterstock_1514629235-1.jpg"
            alt="User's avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="font-bold text-xl text-primary mt-4">
          {{ user.displayName }}
        </div>
        <div class="text-gray-500">{{ user.email }}</div>
      </div>
    </div>
  </div>

  <!-- Start Menu -->
  <div class="row">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1">
        <span class="text-left font-bold text-primary text-xl">General</span>
      </div>
      <div class="grid grid-cols-1">
        <ul>
          <li
            class="last:text-red"
            v-for="profileOption in profileOptions"
            :key="profileOption.name"
          >
            <router-link
              :to="profileOption.route"
              class="flex items-center justify-between py-2"
            >
              <div class="flex items-center">
                <i class="t2ico text-xl" :class="profileOption.icon"></i>
                <h5 class="ml-3">{{ profileOption.name }}</h5>
              </div>
              <div>
                <i class="t2ico t2ico-arrow-right"></i>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { PROFILE_OPTIONS } from "@/constants";
import { useUser } from "@/composables/useUser";
export default {
  setup() {
    const profileOptions = reactive(PROFILE_OPTIONS);
    const { getUser } = useUser();
    const { user } = getUser();

    return { profileOptions, user };
  },
};
</script>
