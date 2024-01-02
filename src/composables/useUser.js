import { ref } from "vue";
import { fireAuth } from "@/config/firebase";
const user = ref(fireAuth.currentUser);

fireAuth.onAuthStateChanged(function (_user) {
  if (_user) user.value = _user;
});

function getUser() {
  return { user };
}

export function useUser() {
  return { getUser };
}
