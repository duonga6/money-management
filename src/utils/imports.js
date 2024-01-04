import { defineAsyncComponent } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export function registerGlobalComponents(app) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layouts/AuthLayout"))
  );
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/DefaultLayout"))
  );
  app.component("font-awesome-icon", FontAwesomeIcon);
}
