import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import VotantesFormView from '../views/VotantesFormView.vue'
import VotantesListView from '../views/VotantesListView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/votante',
    name: 'votante',
    component: VotantesFormView
  }, {
    path: '/list',
    name: 'list',
    component: VotantesListView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
