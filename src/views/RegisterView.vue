<template>
  <div class="register-container">
    <div class="mt-8">
      <div class="container mx-auto px-8">
        <!-- Start Form -->
        <form class="flex flex-col space-y-6" @submit.prevent="onSubmit">
          <div class="row">
            <label class="flex flex-col" for="full-name">
              <span class="font-semibold">Full name</span>
              <input
                id="full-name"
                class="px-4 py-3 rounded-lg border border-gray-200 mt-1"
                type="text"
                placeholder="iMoney... "
                v-model="fullName"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col" for="email-address">
              <span class="font-semibold">Email address</span>
              <input
                id="email-address"
                class="px-4 py-3 rounded-lg border border-gray-200 mt-1"
                type="email"
                placeholder="example@gmail.com"
                autocomplete="current-email"
                v-model="email"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col" for="password">
              <span class="font-semibold">Password</span>
              <input
                id="password"
                class="px-4 py-3 rounded-lg border border-gray-200 mt-1"
                type="password"
                autocomplete="current-password"
                v-model="password"
              />
            </label>
          </div>
          <div class="row">
            <button
              class="py-3 text-center bg-primary text-white font-bold rounded-lg w-full"
              type="submit"
              :class="{
                'bg-gray-700': isPending,
                'cursor-not-allowed': isPending,
              }"
              :disabled="isPending"
            >
              <span v-if="!isPending">Sign Up</span>
              <span v-else>Loading...</span>
            </button>
          </div>
        </form>
        <!-- End Form -->

        <!-- Start Error -->
        <div class="text-left mt-2 text-red" v-if="error">
          <span> {{ error }}</span>
        </div>
        <!-- End Error -->

        <!-- Start Direction -->
        <div class="text-center w-full mt-6">
          <span class="font-semibold">I'm already a member. </span>
          <span class="font-semibold text-primary">
            <router-link :to="{ name: 'Login', params: {} }"
              >Sign In</router-link
            >
          </span>
        </div>
        <!-- End Direction -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignUp } from "@/composables/useSignUp";
export default {
  setup() {
    const router = useRouter();
    const { error, isPending, signUp } = useSignUp();

    const fullName = ref("");
    const email = ref("");
    const password = ref("");

    async function onSubmit() {
      await signUp(email.value, password.value, fullName.value);
      if (!error.value) router.push({ name: "Home", params: {} });
    }
    return { onSubmit, fullName, email, password, isPending, error };
  },
};
</script>
