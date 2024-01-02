import { ref } from "vue";
import { fireAuth } from "@/config/firebase";

const error = ref("");
const isPending = ref(false);

async function signIn(email, password) {
  error.value = null;
  isPending.value = true;
  try {
    const response = await fireAuth.signInWithEmailAndPassword(email, password);
    return response;
  } catch (err) {
    console.log({ err });
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignIn() {
  return { error, isPending, signIn };
}
