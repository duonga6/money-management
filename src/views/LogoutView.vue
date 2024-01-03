<template>
  <h1>Logout page</h1>
</template>

<script>
import { useSignOut } from "@/composables/useSignout";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, signOut } = useSignOut();
    const router = useRouter();
    async function onLogout() {
      await signOut();
      if (!error.value) router.push({ name: "Login", params: {} });
    }

    onLogout();

    return { error };
  },
};
</script>
