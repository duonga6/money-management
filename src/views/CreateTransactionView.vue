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
                  v-model="transaction.total"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="category" class="flex py-3">
              <div class="w-16 flex items-center justify-end pr-4">
                <div class="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <div
                class="flex flex-col flex-1 border-b border-gray-300 relative"
              >
                <input
                  id="category"
                  class="text-xl w-full outline-none bg-white"
                  type="text"
                  name=""
                  disabled
                />
                <div
                  class="absolute top-0 w-full h-72 bg-white rounded-md border border-gray-400 overflow-y-scroll z-2"
                >
                  <ul class="py-1 bg-white" v-if="categoriesShow.length > 0">
                    <li
                      class="bg-white p-2 mx-2"
                      v-for="category in categoriesShow"
                      :key="category.id"
                      :class="{
                        'hover:bg-cyan-50 rounded-md transition-all duration-150 ease-in-out cursor-pointer':
                          category.subCategories.length == 0,
                      }"
                      @click="category.isOpen = !category.isOpen"
                    >
                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 rounded-full overflow-hidden bg-red z-2"
                        >
                          <img
                            class="w-full h-full p-1 object-cover"
                            :src="category.iconUrl"
                            alt=""
                          />
                        </div>
                        <div class="flex-1 flex justify-between items-center">
                          <span class="font-semibold ml-2">{{
                            category.name
                          }}</span>
                          <font-awesome-icon
                            v-if="category.subCategories.length > 0"
                            icon="fa-solid fa-chevron-down"
                            class="transform text-sm transition-all duration-300 ease-in-out"
                            :class="category.isOpen ? 'rotate-0' : '-rotate-90'"
                          />
                        </div>
                      </div>
                      <ul
                        class="mt-2 transition-all duration-300 ease-in-out"
                        :class="
                          category.isOpen
                            ? 'h-auto visible opacity-100'
                            : 'h-0 invisible opacity-0'
                        "
                        v-if="category.subCategories.length > 0"
                      >
                        <li
                          class="bg-white my-1 py-1 pl-2 ml-8 child-category cursor-pointer hover:bg-cyan-50 rounded-md transition-all duration-150 ease-in-out"
                          v-for="subCategory in category.subCategories"
                          :key="subCategory.id"
                          @click.stop=""
                        >
                          <div class="flex items-center">
                            <div
                              class="w-10 h-10 rounded-full overflow-hidden z-2"
                            >
                              <img
                                class="w-full h-full p-1 object-cover bg-red"
                                :src="subCategory.iconUrl"
                                alt=""
                              />
                            </div>
                            <span class="font-semibold ml-2">{{
                              subCategory.name
                            }}</span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
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
                  v-model="transaction.note"
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
                  class="text-lg w-full outline-none bg-white"
                  type="date"
                  v-model="transaction.time"
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
                      v-model="transaction.location"
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
                      v-model="transaction.withPersons"
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
import { reactive, ref } from "vue";
import { useUser } from "@/composables/useUser";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { useRoute } from "vue-router";

export default {
  setup() {
    const { addRecord } = useCollection("transactions");
    const { getOneBy: getTransactionType } = useCollection("transactionType");
    const { getRecords: getCategories } = useCollection("category");

    const { uploadFile, url } = useStorage("transactions");
    const file = ref(null);
    const errorFile = ref(null);

    const route = useRoute();

    const isShowAdvancedForm = ref(false);

    let categoriesShow = reactive([]);

    const transaction = reactive({
      total: null,
      category: null,
      note: null,
      time: null,
      location: null,
      withPersons: null,
      uid: "",
      imageUrl: null,
    });

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
      }

      transaction.uid = user.value.uid;
      transaction.imageUrl = url.value;

      await addRecord(transaction);
    }

    async function loadCategory() {
      const transactionTypes = await getTransactionType([
        { field: "name", operator: "==", value: route.params.name },
      ]);

      const categories = await getCategories([
        {
          field: "transactionType",
          operator: "==",
          value: transactionTypes.id,
        },
        { field: "parentId", operator: "==", value: null },
      ]);

      for (const category of categories) {
        const subCategories = await getCategories([
          { field: "parentId", operator: "==", value: category.id },
        ]);
        category.isOpen = false;
        category.subCategories = subCategories;
      }

      categoriesShow.push(...categories);
    }

    loadCategory();

    return {
      isShowAdvancedForm,
      transaction,
      categoriesShow,
      showAdvancedForm,
      onSubmit,
      onChangeFiles,
    };
  },
};
</script>

<style lang="scss" scoped>
.child-category {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 20px;
    height: 1px;
    @apply -left-3;
    top: calc(50% - 1px);
    @apply bg-dark;
    z-index: 1;
  }

  &::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 52px;
    @apply -left-3;
    top: calc(50% - 52px);
    @apply bg-dark;
    z-index: 1;
  }
}
</style>
