import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import VotantesFormView from "../views/VotantesFormView.vue";
import VotantesListView from "../views/VotantesListView.vue";
import useAuth from "@/store/Auth";
// import useAuth from '@/store/Auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/votante",
    name: "votante",
    component: VotantesFormView,
    meta: {
      requireAuth: true,
      role: "usuario",
    },
  },
  {
    path: "/list",
    name: "list",
    component: VotantesListView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuth();
  const isAuth = auth.token;

  if (to.meta.requireAuth && isAuth === null) {
    next("login");
  } else {
    next();
  }
});

export default router;
