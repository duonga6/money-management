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

  async function getRecords(conditions) {
    try {
      let query = fireStore.collection(name);

      if (conditions && conditions.length > 0) {
        conditions.forEach((item) => {
          query = query.where(item.field, item.operator, item.value);
        });
      }

      const response = await query.get();

      const result = response.docs.map((x) => {
        return { id: x.id, ...x.data() };
      });

      return result;
    } catch (err) {
      error.value = err;
      console.log(err);
    }
  }

  async function getOneBy(conditions) {
    try {
      let query = fireStore.collection(name);

      if (conditions && conditions.length > 0) {
        conditions.forEach((item) => {
          query = query.where(item.field, item.operator, item.value);
        });
      }

      const response = await query.get();

      return {
        id: response.docs[0].id,
        ...response.docs[0].data(),
      };
    } catch (err) {
      error.value = err;
      console.log(err);
    }
  }

  async function getById(id) {
    try {
      const response = await fireStore.collection(name).doc(id);

      return {
        id: response.id,
        ...response.data(),
      };
    } catch (err) {
      error.value = err;
      console.log(err);
    }
  }

  return { error, addRecord, getRecords, getById, getOneBy };
}

export default useCollection;
