<template>
  <div
    :class="isShowForm ? 'visible opacity-100' : 'invisible opacity-0'"
    class="fixed top-0 bottom-0 left-0 right-0 bg-gray-600/50 z-10 transition-all ease-in-out duration-300 flex justify-center items-center"
  >
    <form
      @submit.prevent="onSubmit"
      class="bg-white w-80 p-4 rounded-lg relative"
    >
      <div class="row">
        <p class="font-semibold text-xl mb-2 text-center py-2">Update Wallet</p>
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
            <p class="">Amount</p>
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
        <div class="text-red inline-block" v-for="error in errors" :key="error">
          <font-awesome-icon class="text-red" icon="fa-solid fa-circle-xmark" />
          {{ error }}
        </div>
      </div>
      <div class="row flex justify-center">
        <button
          type="submit"
          class="bg-primary mt-4 text-white text-lg font-semibold px-6 py-2 rounded-md"
        >
          Confirm
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
export default {
  props: {
    isShow: {
      type: Boolean,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isShowForm = ref(false);
    const wallet = reactive({
      id: null,
      name: null,
      amount: 0,
      note: null,
    });

    const errors = reactive([]);

    // Validate data
    function validateForm() {
      errors.length = 0;
      if (wallet.name === "") {
        errors.push("Name can't be empty");
        return false;
      }
      return true;
    }

    // Handle submit data
    function onSubmit() {
      if (!validateForm()) {
        return;
      }
    }

    watch(props, (newProps) => {
      isShowForm.value = newProps.isShow;

      wallet.id = newProps.data.id;
      wallet.name = newProps.data.name;
      wallet.amount = newProps.data.amount;
      wallet.note = newProps.data.note;
    });

    return { isShowForm, wallet, errors, onSubmit };
  },
};
</script>
