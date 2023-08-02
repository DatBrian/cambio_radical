import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import VotantesFormView from '../views/VotantesFormView.vue'
import VotantesListView from '../views/VotantesListView.vue'
import VotantesDetailsView from '../views/VotanteDetailsView.vue'
import RegisterFormView from '../views/RegisterFormView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/votantesForm',
    name: 'votantesForm',
    component: VotantesFormView
  }, {
    path: '/list',
    name: 'list',
    component: VotantesListView
  },
  {
    path: '/details',
    name: 'details',
    component: VotantesDetailsView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterFormView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
