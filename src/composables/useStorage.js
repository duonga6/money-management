import { fireStorage } from "@/config/firebase";
import { ref } from "vue";
import { useUser } from "@/composables/useUser";

const { getUser } = useUser();
const { user } = getUser();

function useStorage(name) {
  const error = ref(null);
  const filePath = ref(null);
  const url = ref(null);

  async function uploadFile(file) {
    filePath.value = `${name}/${user.value.uid}/${file.name}`;
    const fileRef = fireStorage.ref(filePath.value);

    try {
      const response = await fileRef.put(file);
      url.value = await response.ref.getDownloadURL();

      return url;
    } catch (err) {
      error.value = err.message;
      console.log(err);
    }
  }

  return { error, filePath, url, uploadFile };
}

export default useStorage;
