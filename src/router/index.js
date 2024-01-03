import { useUser } from "@/composables/useUser";
import { createRouter, createWebHistory } from "vue-router";

// Auth Guard
const requireAuth = (to, from, next) => {
  const { getUser } = useUser();
  const { user } = getUser();
  if (!user.value) {
    next({ name: "Login", params: {} });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      text: "Hey, Sky Ambert",
      leading: true,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/IndexView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      text: "Profile",
      leading: false,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/LogoutView.vue"),
  },
  {
    path: "/report",
    name: "Report",
    meta: {
      text: "Report",
      leading: false,
    },
    component: () =>
      import(/* webpackChunkName: "report" */ "../views/ReportView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/budget",
    name: "Budget",
    meta: {
      text: "Budget",
      leading: false,
    },
    component: () =>
      import(/* webpackChunkName: "budget" */ "../views/BudgetView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/new-transaction",
    name: "NewTransaction",
    meta: {
      text: "Add Transaction",
      leading: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "transaction" */ "../views/CreateTransactionView.vue"
      ),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
