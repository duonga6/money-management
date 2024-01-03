import { fireStore } from "@/config/firebase";
import { ref } from "vue";

function useCollection(name) {
  const error = ref(null);

  async function addRecord(record) {
    try {
      const response = await fireStore.collection(name).add(record);
      return response;
    } catch (err) {
      error.value = err.message;
      console.log(err);
    }
  }

  return { error, addRecord };
}

export default useCollection;
