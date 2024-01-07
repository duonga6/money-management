<template>
  <template v-if="isLoaded"
    ><div
      class="row mt-4 overflow-y-scroll"
      style="height: 80vh"
      id="wallet-container"
    >
      <div class="container mx-auto">
        <ul>
          <li
            v-for="w in wallets"
            :key="w.id"
            class="bg-white mx-2 px-4 py-2 rounded-md border border-gray-100 my-2"
          >
            <div class="flex justify-between">
              <div class="flex flex-col justify-center">
                <span class="text-xl font-semibold">{{ w.name }}</span>
                <span class="text-sm text-gray-500">{{
                  w.createdAt.toLocaleDateString()
                }}</span>
                <span class="text-sm text-gray-700">Note: {{ w.note }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span
                  class="font-semibold text-lg text-right"
                  :class="w.amount >= 0 ? 'text-green' : 'text-red'"
                  >{{ w.amount.toLocaleString() }} đ</span
                >
                <div class="flex justify-end space-x-2">
                  <router-link to="/" v-if="wallets.length > 1">
                    <font-awesome-icon
                      class="text-dark p-2 text-sm bg-gray-100 rounded-md"
                      icon="fa-solid fa-right-left"
                    />
                  </router-link>
                  <router-link to="/">
                    <font-awesome-icon
                      class="text-dark p-2 text-sm bg-gray-100 rounded-md"
                      icon="fa-solid fa-eye"
                    />
                  </router-link>
                  <div class="row relative">
                    <button
                      class="cursor-pointer"
                      @click.stop="w.isShowMore = !w.isShowMore"
                    >
                      <font-awesome-icon
                        class="text-dark py-2 px-2.5 text-sm bg-gray-100 rounded-md"
                        icon="fa-solid fa-ellipsis"
                      />
                    </button>
                    <div
                      :class="
                        w.isShowMore
                          ? 'visible opacity-100'
                          : 'invisible opacity-0'
                      "
                      class="absolute w-28 top-full right-0 bg-white rounded-md border border-gray-100 transition-all"
                    >
                      <ul>
                        <li
                          class="py-2 px-3 cursor-pointer"
                          @click="onShowUpdateWallet(w), (w.isShowMore = false)"
                        >
                          Edit
                        </li>
                        <li
                          class="text-red py-2 px-3 cursor-pointer"
                          @click="onShowAlertDelete(w), (w.isShowMore = false)"
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <AddWalletBtn @createWallet="handleCreatedWallet"></AddWalletBtn>
    <DeleteAlert
      :showAlert="isShowAlertDelete"
      :id="idOfItemDelete"
      :pending="isPendingDelete"
      @closeAlert="onCloseAlertDelete"
      @submitDelete="onSubmitDelete"
    ></DeleteAlert>
    <UpdateWallet
      :isShow="isShowUpdate"
      :data="dataUpdateWallet"
    ></UpdateWallet>
  </template>
  <component v-else :is="'loading-page'"></component>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import useCollection from "@/composables/useCollection";
import { useUser } from "@/composables/useUser";
import AddWalletBtn from "@/components/AddWalletBtn.vue";
import DeleteAlert from "@/components/DeleteAlert.vue";
import UpdateWallet from "@/components/Wallet/UpdateWallet.vue";
import { formatDate } from "@/utils";

export default {
  components: {
    AddWalletBtn,
    DeleteAlert,
    UpdateWallet,
  },
  setup() {
    const { getRecords, addRecord, deleteRecord } = useCollection("wallet");
    const { getUser } = useUser();
    const { user } = getUser();
    const wallets = reactive([]);

    const isLoaded = ref(false);

    const dataDeleteWallet = reactive({});
    const isShowAlertDelete = ref(false);
    const idOfItemDelete = ref(null);
    const isPendingDelete = ref(false);

    const dataUpdateWallet = reactive({});
    const isShowUpdate = ref(false);

    // Handle get wallet
    async function getWallet() {
      wallets.length = 0;
      let respone = await getRecords([
        {
          field: "uid",
          operator: "==",
          value: user.value.uid,
        },
      ]);

      respone = respone.map((item) => {
        item.createdAt = formatDate(item.createdAt);
        item.updatedAt = formatDate(item.createdAt);
        item.isShowMore = false;
        return item;
      });

      wallets.push(...respone);
    }

    // Handle create wallet
    async function handleCreatedWallet(item) {
      const wallet = {
        name: item.name,
        amount: item.amount,
        note: item.note,
        createdAt: new Date(),
        updatedAt: new Date(),
        uid: user.value.uid,
      };

      const response = await addRecord(wallet);
      if (response) {
        response.createdAt = formatDate(response.createdAt);
        response.updatedAt = formatDate(response.updatedAt);
        response.isShowMore = false;
        wallets.push(response);
      }
    }

    // Handle show alert delete wallet
    function onShowAlertDelete(wallet) {
      isShowAlertDelete.value = true;
      idOfItemDelete.value = wallet.id;
    }

    // Handle close alert delete wallet
    function onCloseAlertDelete() {
      isShowAlertDelete.value = false;
    }

    // Handle submit delete wallet
    async function onSubmitDelete(id) {
      console.log(id);
      isPendingDelete.value = true;

      const resultDeleteWallet = await deleteRecord(id);

      if (resultDeleteWallet) {
        const { deleteBy } = useCollection("transaction");
        await deleteBy([
          {
            field: "walletId",
            operator: "==",
            value: id,
          },
        ]);

        await getWallet();
      }

      isPendingDelete.value = false;
      onCloseAlertDelete();
    }

    // Handle show update wallet
    function onShowUpdateWallet(wallet) {
      dataUpdateWallet.id = wallet.id;
      dataUpdateWallet.name = wallet.name;
      dataUpdateWallet.amount = wallet.amount;
      dataUpdateWallet.note = wallet.note;

      isShowUpdate.value = true;
    }

    async function loadAllData() {
      await getWallet();
      isLoaded.value = true;
    }

    onMounted(async () => {
      await loadAllData();
    });

    return {
      AddWalletBtn,
      DeleteAlert,
      handleCreatedWallet,
      formatDate,
      onShowAlertDelete,
      onCloseAlertDelete,
      onSubmitDelete,
      onShowUpdateWallet,
      isLoaded,
      isShowAlertDelete,
      isPendingDelete,
      idOfItemDelete,
      dataDeleteWallet,
      dataUpdateWallet,
      isShowUpdate,
      wallets,
    };
  },
};
</script>

<style lang="scss" scoped>
#wallet-container {
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
}
</style>
