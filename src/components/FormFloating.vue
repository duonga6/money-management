<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 bg-gray-600/50transition-all ease-in-out duration-300 flex items-center justify-center"
  >
    <form @submit.prevent="onSubmit"></form>
  </div>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>
