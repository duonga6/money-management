<template>
  <form @submit.prevent="onSubmit">
    <div class="row mt-8">
      <!-- Main Form -->
      <div class="bg-white rounded-lg">
        <div class="container mx-auto px-8">
          <div class="row">
            <label for="total" class="flex py-3">
              <div class="w-16 flex items-end justify-end mb-3 pr-4">
                <span
                  class="border border-dark rounded-md font-bold px-1 leading-6"
                  >VND</span
                >
              </div>
              <div class="flex flex-col flex-1 border-b border-gray-300">
                <div class="font-semibold text-sm mb-1">Total</div>
                <input
                  id="total"
                  class="text-4xl w-full outline-none"
                  type="number"
                  placeholder="0"
                  v-model="total"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="category" class="flex py-3">
              <div class="w-16 flex items-center justify-end pr-4">
                <div class="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <div class="flex flex-col flex-1 border-b border-gray-300">
                <input
                  id="category"
                  class="text-2xl w-full outline-none"
                  type="text"
                  placeholder="Select a category"
                  v-model="category"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="note" class="flex py-3">
              <div class="w-16 flex items-center justify-end pr-4">
                <i class="t2ico t2ico-document text-2xl"></i>
              </div>
              <div class="flex flex-col flex-1 border-b border-gray-300">
                <input
                  id="note"
                  class="text-lg w-full outline-none"
                  type="text"
                  placeholder="Note"
                  v-model="note"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="time" class="flex py-3">
              <div class="w-16 flex items-center justify-end pr-4">
                <i class="t2ico t2ico-calendar text-2xl"></i>
              </div>
              <div class="flex flex-col flex-1 border-b border-gray-300">
                <input
                  id="time"
                  class="text-lg w-full outline-none"
                  type="date"
                  v-model="time"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="total" class="flex py-3">
              <div class="w-16 flex items-center justify-end pr-4">
                <i class="t2ico t2ico-wallet text-2xl"></i>
              </div>
              <div class="flex flex-col flex-1">
                <input
                  class="text-lg w-full outline-none"
                  type="text"
                  value="My wallet"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- More Details -->
      <div class="row mt-6" v-if="!isShowAdvancedForm">
        <button
          @click="showAdvancedForm"
          class="bg-white rounded-lg w-full text-primary py-3 font-semibold text-xl"
        >
          More Details
        </button>
      </div>

      <!-- Advanced Form -->
      <template v-if="isShowAdvancedForm">
        <div class="row mt-6">
          <div class="bg-white rounded-lg">
            <div class="container mx-auto px-8">
              <div class="row">
                <label for="total" class="flex py-3">
                  <div class="w-16 flex items-center justify-end pr-4">
                    <i class="t2ico t2ico-location text-2xl"></i>
                  </div>
                  <div class="flex flex-col flex-1 border-b border-gray-300">
                    <input
                      class="text-lg w-full outline-none"
                      type="text"
                      placeholder="Select a location"
                      v-model="location"
                    />
                  </div>
                </label>
              </div>
              <div class="row">
                <label for="total" class="flex py-3">
                  <div class="w-16 flex items-center justify-end pr-4">
                    <i class="t2ico t2ico-users text-2xl"></i>
                  </div>
                  <div class="flex flex-col flex-1">
                    <input
                      class="text-lg w-full outline-none"
                      type="text"
                      placeholder="With person"
                      v-model="withPersons"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-6">
          <div class="bg-white rounded-lg">
            <div class="container mx-auto px-8">
              <div class="row">
                <label for="file-uploads" class="flex py-3 text-primary">
                  <div class="w-16 flex items-center justify-end pr-4">
                    <i class="t2ico t2ico-camera text-2xl"></i>
                  </div>
                  <div class="flex items-center flex-1 w-full">
                    <label for="file-uploads" class="font-semibold text-lg"
                      >Upload photos (.jpg, .jpeg, .png, .gif)</label
                    >
                    <input
                      type="file"
                      id="file-uploads"
                      accept=".jpg, .jpeg, .png, .gif"
                      hidden
                      @change="onChangeFiles"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Button Add -->
    <div class="row mt-8">
      <div class="container mx-auto px-8">
        <button
          class="text-center w-full bg-primary text-white text-xl py-3 rounded-xl font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useUser } from "@/composables/useUser";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";

export default {
  setup() {
    const { error, addRecord } = useCollection("transactions");
    const { uploadFile, url } = useStorage("transactions");
    const total = ref(null);
    const category = ref("");
    const note = ref("");
    const time = ref(new Date());
    const location = ref("");
    const withPersons = ref("");
    const file = ref(null);
    const errorFile = ref(null);
    const isShowAdvancedForm = ref(false);

    function showAdvancedForm() {
      isShowAdvancedForm.value = !isShowAdvancedForm.value;
    }

    function onChangeFiles(event) {
      errorFile.value = null;
      const fileSelected = event.target.files[0];

      if (fileSelected) {
        file.value = fileSelected;
      } else {
        errorFile.value = "Please select a file";
      }
    }

    async function onSubmit() {
      const { getUser } = useUser();
      const { user } = getUser();

      if (file.value) {
        await uploadFile(file.value);
        console.log(url.value);
      }

      const transactionModel = {
        total: parseInt(total.value),
        category: category.value,
        note: note.value,
        time: time.value,
        location: location.value,
        withPersons: withPersons.value,
        uid: user.value.uid,
        thumbnail: url.value,
      };

      await addRecord(transactionModel);
    }

    return {
      isShowAdvancedForm,
      total,
      category,
      note,
      time,
      location,
      withPersons,
      showAdvancedForm,
      onSubmit,
      onChangeFiles,
      error,
    };
  },
};
</script>
