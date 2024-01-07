<template>
  <!-- Button show form -->
  <div
    data-plus-btn-bg
    class="fixed bottom-8 mb-0.5 z-10 right-1/2 translate-x-1/2"
  ></div>

  <div
    @click.stop="isShowAddWallet = !isShowAddWallet"
    :class="isShowAddWallet ? 'bg-red' : 'bg-primary'"
    class="fixed bottom-9 mb-0.5 z-10 right-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-primary flex justify-center items-center cursor-pointer transition-all duration-150 ease-linear transform"
  >
    <i
      class="t2ico t2ico-plus font-bold text-white text-xl transition-all duration-150 ease-linear transform"
      :class="isShowAddWallet ? 'rotate-45' : 'rotate-0'"
    ></i>
  </div>

  <!-- Float Form -->
  <div
    :class="isShowAddWallet ? 'visible opacity-100' : 'invisible opacity-0'"
    class="fixed top-0 left-0 right-0 bottom-0 bg-gray-600/50 transition-all ease-in-out duration-300"
  >
    <div
      class="container mx-auto flex items-center justify-center w-full h-full"
    >
      <form
        @submit.prevent="onSubmit"
        id="form-add-wallet"
        class="bg-white w-80 p-4 rounded-lg relative"
      >
        <div class="row">
          <p class="font-semibold text-xl mb-2 text-center py-2">Add Wallet</p>
        </div>
        <div class="row">
          <label class="my-2 block" for="name">
            <div class="mt-1 border-b border-gray-300">
              <p class="">Name</p>
              <input
                v-model="wallet.name"
                type="text"
                id="name"
                class="text-xl px-2 block w-full rounded-md outline-none border-0 py-1.5"
              />
            </div>
          </label>
        </div>
        <div class="row">
          <label class="my-2 block" for="amount">
            <div class="mt-1 border-b border-gray-300">
              <p class="">Initial amount</p>
              <input
                v-model="wallet.amount"
                type="number"
                id="amount"
                min="0"
                value="0"
                class="text-xl px-2 block w-full rounded-md outline-none border-0 py-1.5"
              />
            </div>
          </label>
        </div>
        <div class="row">
          <label class="my-2 block" for="note">
            <div class="mt-1 border-b border-gray">
              <p class="">Note</p>
              <input
                v-model="wallet.note"
                type="text"
                id="note"
                class="px-2 block w-full rounded-md outline-none border-0 py-1.5"
              />
            </div>
          </label>
        </div>
        <div class="row">
          <div
            class="text-red inline-block"
            v-for="error in errors"
            :key="error"
          >
            <font-awesome-icon
              class="text-red"
              icon="fa-solid fa-circle-xmark"
            />
            {{ error }}
          </div>
        </div>
        <div class="row flex justify-center">
          <button
            type="submit"
            class="bg-primary mt-4 text-white text-lg font-semibold px-6 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { handleClickOutSide } from "@/composables/useHandle";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
export default {
  emits: ["createWallet"],
  setup(_, { emit }) {
    const isShowAddWallet = ref(false);

    const errors = reactive([]);

    const wallet = reactive({
      name: "",
      amount: 0,
      note: "",
    });

    // Validate data
    function validateForm() {
      errors.length = 0;
      if (wallet.name === "") {
        errors.push("Name can't be empty");
        return false;
      }
      return true;
    }

    // Close form when click outside
    function clickOutSideFromAddWallet(event) {
      handleClickOutSide(event, isShowAddWallet, "form-add-wallet");
    }

    // Submit form
    function onSubmit() {
      if (!validateForm()) {
        return;
      }
      emit("createWallet", wallet);
      isShowAddWallet.value = false;
    }

    onBeforeMount(() => {
      document.removeEventListener("click", clickOutSideFromAddWallet);
    });

    onMounted(() => {
      document.addEventListener("click", clickOutSideFromAddWallet);
    });

    return { isShowAddWallet, onSubmit, wallet, errors };
  },
};
</script>

<style lang="scss" scoped>
div[data-plus-btn-bg] {
  @apply absolute bg-dark-light;

  width: 56px;
  height: 28px;

  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}
</style>
