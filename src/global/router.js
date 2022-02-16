import { createRouter, createWebHistory } from 'vue-router'

import Form from '../controllers/Form/Form.vue'
const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "about" */ '../controllers/Table/Table.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router