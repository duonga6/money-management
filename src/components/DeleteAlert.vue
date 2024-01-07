<template>
  <div
    :class="isShowAlert ? 'visible opacity-100' : 'invisible opacity-0'"
    class="fixed top-0 bottom-0 left-0 right-0 bg-gray-600/50 z-10 transition-all ease-in-out duration-300 flex justify-center items-center"
    @click="onCloseAlert()"
  >
    <div
      class="flex flex-col bg-white rounded-md p-4 text-center"
      id="form-alert-delete"
      @click.stop=""
    >
      <div class="row flex justify-center items-center mt-4">
        <font-awesome-icon
          icon="fa-regular fa-circle-xmark"
          class="text-7xl text-red"
        />
      </div>
      <div class="row">
        <p class="text-2xl font-semibold mt-2">Are you sure?</p>
      </div>
      <div class="row">
        <p>Do you realy want to delete this wallet.<br /></p>
        <p>This cannot be to restore.</p>
      </div>
      <div class="row">
        <button
          class="bg-red text-white text-lg font-semibold px-4 py-2 rounded-md mt-4 h-12 w-24"
          @click="onSubmitDelete"
        >
          <span v-if="!isPending">Confirm</span>
          <component v-else :is="'loading-page'"></component>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    showAlert: {
      type: Boolean,
    },
    id: {
      type: String,
    },
    pending: {
      type: Boolean,
    },
  },
  emits: ["closeAlert", "submitDelete"],
  setup(props, { emit }) {
    const isShowAlert = ref(false);
    const isPending = ref(false);

    function onCloseAlert() {
      emit("closeAlert");
    }

    async function onSubmitDelete() {
      if (!props.id) {
        console.error("props.id is undefined");
        return;
      }

      emit("submitDelete", props.id);
    }

    watch(props, (newProps) => {
      isShowAlert.value = newProps.showAlert;
      isPending.value = newProps.pending;
    });

    return { isShowAlert, onCloseAlert, onSubmitDelete, isPending };
  },
};
</script>
