import { createRouter, createWebHistory } from 'vue-router'

// import Form from '../controllers/Form/Form.vue'
const routes = [
  // {
  //   path: '/',
  //   name: 'Form',
  //   component: Form
  // },
  // {
  //   path: '/table',
  //   name: 'Table',
  //   component: () => import(/* webpackChunkName: "about" */ '../controllers/Table/Table.vue')
  // }
]

import cruds from '../controllers/routes.js'

cruds.forEach(crud => {
  console.log(crud)
  routes.push({
    path: `/${crud}`,
    name: crud,
    component: () => import(`../controllers/${crud}/${crud}.vue`)
  })
  routes.push({
    path: `/${crud}/editar`,
    name: crud + ' cadastrar',
    component: () => import(`../controllers/${crud}/${crud}_editar.vue`)
  })
  routes.push({
    path: `/${crud}/editar/:id`,
    name: crud + ' editar',
    component: () => import(`../controllers/${crud}/${crud}_editar.vue`)
  })
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router