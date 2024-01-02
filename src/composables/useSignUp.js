import { ref } from "vue";
import { fireAuth } from "@/config/firebase";

const error = ref(null);
const isPending = ref(false);

async function signUp(email, password, fullName) {
  error.value = null;
  isPending.value = true;

  try {
    const response = await fireAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!response) throw new Error("Could not create new user");

    response.user.updateProfile({ displayName: fullName });

    return response;
  } catch (err) {
    error.value = err.message;
    console.log({ err });
  } finally {
    isPending.value = false;
  }
}

export function useSignUp() {
  return { error, isPending, signUp };
}
