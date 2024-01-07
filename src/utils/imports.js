import { defineAsyncComponent } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import LoadingPage from "@/components/LoadingPage";

library.add(fas, far);

export function registerGlobalComponents(app) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layouts/AuthLayout"))
  );
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/DefaultLayout"))
  );
  app.component(
    "add-transaction-btn",
    defineAsyncComponent(() => import("@/components/AddTransactionBtn"))
  );
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.component("loading-page", LoadingPage);
}
