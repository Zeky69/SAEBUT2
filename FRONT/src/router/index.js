import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/attraction',
    name: 'attraction',
    component: () => import(/* webpackChunkName: "about" */ '../views/AttractionView.vue')
  },  {
    path: '/billeterie',
    name: 'billeterie',
    component: () => import(/* webpackChunkName: "about" */ '../views/BilleterieView.vue')
  },  {
    path: '/boutique',
    name: 'boutique',
    component: () => import(/* webpackChunkName: "about" */ '../views/BoutiqueView.vue')
  },  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },  {
    path: '/organisateurs',
    name: 'organisateurs',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrganisateursView.vue')
  },  {
    path: '/panier',
    name: 'panier',
    component: () => import(/* webpackChunkName: "about" */ '../views/PanierView.vue')
  },  {
    path: '/restauration',
    name: 'restauration',
    component: () => import(/* webpackChunkName: "about" */ '../views/RestaurationView.vue')
  },{
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchVue.vue')
    },
    {
      path: '*',
        name: 'notFound',
        component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
