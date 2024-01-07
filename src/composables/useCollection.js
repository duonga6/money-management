import { fireStore } from "@/config/firebase";
import { ref } from "vue";

function useCollection(name) {
  const error = ref(null);
  const isPending = ref(false);

  async function addRecord(record) {
    error.value = null;
    isPending.value = true;
    try {
      const response = await fireStore.collection(name).add(record);
      const addedRecord = await fireStore
        .collection(name)
        .doc(response.id)
        .get();
      return {
        id: addedRecord.id,
        ...addedRecord.data(),
      };
    } catch (err) {
      error.value = err.message;
      console.log(err);
    } finally {
      isPending.value = false;
    }
  }

  async function deleteRecord(id) {
    error.value = null;
    isPending.value = true;
    try {
      const record = await fireStore.collection(name).doc(id);

      if (!record) throw new Error("Not found");

      await record.delete();
      return true;
    } catch (err) {
      error.value = err.message;
      console.log(err);
      return false;
    } finally {
      isPending.value = false;
    }
  }

  async function deleteBy(conditions) {
    error.value = null;
    isPending.value = true;
    try {
      let query = fireStore.collection(name);

      if (conditions && conditions.length > 0) {
        conditions.forEach((item) => {
          query = query.where(item.field, item.operator, item.value);
        });
      }

      const records = await query.get();
      if (records && records.length > 0) {
        const batch = fireStore.batch();
        records.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      return true;
    } catch (err) {
      error.value = err;
      console.log(err);

      return false;
    } finally {
      isPending.value = false;
    }
  }

  async function getRecords(conditions) {
    error.value = null;
    isPending.value = true;
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
    } finally {
      isPending.value = false;
    }
  }

  async function getOneBy(conditions) {
    error.value = null;
    isPending.value = true;
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
    } finally {
      isPending.value = false;
    }
  }

  async function getById(id) {
    error.value = null;
    isPending.value = true;
    try {
      const response = await fireStore.collection(name).doc(id);

      return {
        id: response.id,
        ...response.data(),
      };
    } catch (err) {
      error.value = err;
      console.log(err);
    } finally {
      isPending.value = false;
    }
  }

  return {
    error,
    isPending,
    addRecord,
    getRecords,
    getById,
    getOneBy,
    deleteRecord,
    deleteBy,
  };
}

export default useCollection;
