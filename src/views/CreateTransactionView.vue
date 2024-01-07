<template>
  <template v-if="isLoaded">
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
                    min="0"
                    placeholder="0"
                    v-model="transaction.total"
                  />
                </div>
              </label>
            </div>
            <div class="row">
              <label for="category" class="flex py-3">
                <div class="w-16 flex items-center justify-end pr-4">
                  <div
                    class="w-10 h-10 rounded-full overflow-hidden"
                    :class="categoryBG"
                  >
                    <img
                      v-if="categorySelected.iconUrl"
                      class="w-full h-full p-1 object-cover"
                      :src="categorySelected.iconUrl"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  class="flex flex-col flex-1 border-b border-gray-300 relative"
                >
                  <div
                    class="h-full text-xl cursor-pointer flex items-center"
                    @click.stop="isShowCategory = true"
                  >
                    {{ categorySelected.name }}
                  </div>

                  <!-- Menu Category -->
                  <div id="category-container">
                    <div
                      class="absolute top-0 w-full h-72 bg-white rounded-md border border-gray-400 overflow-y-scroll z-2 category-scroll"
                      v-show="dataCategories.length > 0 && isShowCategory"
                    >
                      <ul
                        class="py-1 bg-white"
                        v-if="dataCategories.length > 0"
                      >
                        <li
                          class="bg-white p-2 mx-2 cursor-pointer"
                          v-for="category in dataCategories"
                          :key="category.id"
                          :class="{
                            'hover:bg-cyan-50 rounded-md transition-all duration-150 ease-in-out cursor-pointer':
                              category.subCategories.length == 0,
                          }"
                          @click="
                            (category.isOpen = !category.isOpen),
                              onChooseCategory(category)
                          "
                        >
                          <div class="flex items-center">
                            <div
                              class="w-10 h-10 rounded-full overflow-hidde z-2"
                              :class="categoryBG"
                            >
                              <img
                                class="w-full h-full p-1 object-cover"
                                :src="category.iconUrl"
                                alt=""
                              />
                            </div>
                            <div
                              class="flex-1 flex justify-between items-center"
                            >
                              <div class="font-semibold ml-2">
                                {{ category.name }}
                              </div>
                              <font-awesome-icon
                                class="transform text-sm transition-all duration-300 ease-in-out"
                                icon="fa-solid fa-chevron-down"
                                v-show="category.subCategories.length > 0"
                                :class="
                                  category.isOpen ? 'rotate-0' : '-rotate-90'
                                "
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
                            v-show="category.subCategories.length > 0"
                          >
                            <li
                              class="bg-white my-1 py-1 pl-2 ml-8 child-category cursor-pointer hover:bg-cyan-50 rounded-md transition-all duration-150 ease-in-out"
                              v-for="subCategory in category.subCategories"
                              :key="subCategory.id"
                              @click.stop="onChooseCategory(subCategory)"
                            >
                              <div class="flex items-center">
                                <div
                                  class="w-10 h-10 rounded-full overflow-hidden z-2"
                                >
                                  <img
                                    class="w-full h-full p-1 object-cove"
                                    :class="categoryBG"
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
            class="text-center w-full h-14 bg-primary text-white text-xl py-3 rounded-xl font-semibold"
          >
            <span v-if="!isPendingAddTransaction">Add</span>
            <template v-else>
              <component :is="'loading-page'"></component>
            </template>
          </button>
        </div>
      </div>
    </form>
  </template>
  <div v-else class="w-100 h-100">
    <component :is="'loading-page'"></component>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useUser } from "@/composables/useUser";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { useRoute } from "vue-router";
import { handleClickOutSide } from "@/composables/useHandle";

export default {
  setup() {
    const { addRecord, isPending: isPendingAddTransaction } =
      useCollection("transactions");
    const { getOneBy: getTransactionType } = useCollection("transactionType");
    const { getRecords: getCategories } = useCollection("category");

    const { uploadFile, url } = useStorage("transaction");
    const file = ref(null);
    const errorFile = ref(null);

    const isLoaded = ref(false);

    const route = useRoute();

    const isShowAdvancedForm = ref(false);

    const isShowCategory = ref(false);
    const categorySelected = reactive({
      id: null,
      iconUrl: null,
      name: "Select a category",
    });
    const categoryBG = ref("");

    const dataCategories = reactive([]);

    // Model form
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

    // Handle show advance form
    function showAdvancedForm() {
      isShowAdvancedForm.value = !isShowAdvancedForm.value;
    }

    // Handle close category box
    function clickOutSide(event) {
      handleClickOutSide(event, isShowCategory, "category-container");
    }

    // Handle change file
    function onChangeFiles(event) {
      errorFile.value = null;
      const fileSelected = event.target.files[0];

      if (fileSelected) {
        file.value = fileSelected;
      } else {
        errorFile.value = "Please select a file";
      }
    }

    // Handle submit form
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

    // Handle choose category
    function onChooseCategory(category) {
      if (
        (category.subCategories && category.subCategories.length == 0) ||
        !category.subCategories
      ) {
        categorySelected.id = category.id;
        categorySelected.iconUrl = category.iconUrl;
        categorySelected.name = category.name;

        isShowCategory.value = false;
      }
    }

    // Load data category
    async function loadCategory() {
      const transactionTypes = await getTransactionType([
        { field: "name", operator: "==", value: route.params.name },
      ]);

      categoryBG.value = transactionTypes.bgColor;

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

      dataCategories.push(...categories);
    }

    // Load data wallet
    // async function loadWallet() {

    // }

    async function loadAllData() {
      await loadCategory();
      isLoaded.value = true;
    }

    // loadAllData();

    onBeforeMount(() => {
      document.removeEventListener("click", clickOutSide);
    });

    onMounted(async () => {
      await loadAllData();
      document.addEventListener("click", clickOutSide);
    });

    return {
      transaction,
      dataCategories,
      categorySelected,
      categoryBG,
      showAdvancedForm,
      onSubmit,
      onChangeFiles,
      onChooseCategory,
      isShowCategory,
      isShowAdvancedForm,
      isLoaded,
      isPendingAddTransaction,
    };
  },
};
</script>

<style lang="scss" scoped>
.category-scroll {
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 2px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #888;
  }

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
}
</style>
