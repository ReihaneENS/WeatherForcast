import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FavCities from '../views/FavCities.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/favCities',
    name: 'favCities',
    component: FavCities
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
