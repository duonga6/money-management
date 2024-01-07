import { ref } from "vue";
import { fireAuth } from "@/config/firebase";
import useCollection from "./useCollection";

const error = ref(null);
const isPending = ref(false);
const { addRecord } = useCollection("wallet");

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
    await addRecord({
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Wallet",
      uid: response.user.uid,
      initialAmount: 0,
      note: "",
    });

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
