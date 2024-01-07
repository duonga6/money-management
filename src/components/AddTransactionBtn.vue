<template>
  <div
    data-plus-btn-bg
    class="absolute top-0 left-1/2 transform -translate-x-1/2"
  ></div>

  <!-- Button Add Transaction -->
  <div
    @click="isShowAddOptions = !isShowAddOptions"
    class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex justify-center items-center cursor-pointer"
  >
    <i
      class="t2ico t2ico-plus font-bold text-white text-xl transition-all duration-150 ease-linear"
      :class="{ 'rotate-45 ': isShowAddOptions }"
    ></i>

    <ul
      class="absolute bottom-full mb-3 flex flex-col space-y-3 transform transition-all duration-150 ease-linear"
      :class="{
        'translate-y-20 opacity-0 invisible': !isShowAddOptions,
        'translate-y-0 opacity-100 visible': isShowAddOptions,
      }"
    >
      <li class="relative">
        <router-link
          :to="{
            name: 'NewTransaction',
            params: { name: 'Income' },
          }"
          class="flex justify-center items-center w-12 h-12 rounded-full bg-green"
        >
          <i class="t2ico t2ico-plus font-bold text-white text-xl"></i>
        </router-link>
        <span
          class="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-dark text-white px-3 py-1 rounded-md"
          >Income</span
        >
      </li>
      <li class="relative">
        <router-link
          :to="{
            name: 'NewTransaction',
            params: { name: 'Expense' },
          }"
          class="flex justify-center items-center w-12 h-12 rounded-full bg-red"
        >
          <font-awesome-icon icon="fa-solid fa-minus" class="text-white" />
        </router-link>
        <span
          class="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-dark text-white px-3 py-1 rounded-md"
          >Expense</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isShowAddOptions = ref(false);

    return { isShowAddOptions };
  },
};
</script>

<style lang="scss" scoped>
#footer {
  ul {
    li {
      &:nth-child(2) {
        margin-right: 8%;
      }

      &:nth-child(3) {
        margin-left: 8%;
      }
    }
  }

  div[data-plus-btn-bg] {
    @apply absolute bg-dark-light;

    width: 56px;
    height: 28px;

    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
  }
}
</style>
