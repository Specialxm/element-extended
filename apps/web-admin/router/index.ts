import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

const aaa = {
  a: 1
}

function a() {
  console.log()
}

export default router
