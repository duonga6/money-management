import { ref } from "vue";
import { fireAuth } from "@/config/firebase";

const error = ref("");

async function signOut() {
  error.value = null;
  try {
    const response = await fireAuth.signOut();
    return response;
  } catch (err) {
    console.log({ err });
    error.value = err.message;
  }
}

export function useSignOut() {
  return { error, signOut };
}
