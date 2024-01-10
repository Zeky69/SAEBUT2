import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

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
    path: '/billetterie',
    name: 'billetterie',
    component: () => import(/* webpackChunkName: "about" */ '../views/BilletterieView.vue'),
    children: [
      {
        path: '/billetterie/:idselect',
        name: 'billetterieid',
        component: () => import('../views/BilletterieView.vue'),
        props: true
      }
    ]
  }
  ,  {
    path: '/boutique',
    name: 'boutique',
    component: () => import(/* webpackChunkName: "about" */ '../views/BoutiqueView.vue')
  },  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },{
    path:'/register',
    name:'register',
    component: () => import('../views/InscriptionView.vue')
  },{
    path: '/organisateurs',
    name: 'organisateurs',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrganisateursView.vue')
  },  {
    path: '/panier',
    name: 'panier',
    component: () => import(/* webpackChunkName: "about" */ '../views/PanierView.vue')
  }, {path: '/testMap',
    name: 'testMap',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestMap.vue')
  }, {path: '/MapPresta',
    name: 'MapPresta',
    component: () => import(/* webpackChunkName: "about" */ '../views/TempMapPresta.vue')
  },
  {path: '/Map2DAdmin',
    name: 'Map2DAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Map2DAdmin.vue')
  },
  {
    path: '/restauration',
    name: 'restauration',
    component: () => import(/* webpackChunkName: "about" */ '../views/ReservationView.vue')
  },{
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchVue.vue')
    },
  {
    path: '/prestataire',
    component: () => import('../views/EspacePrestaire.vue'),    children: [
      {
        path: '',
        name: 'prestataire.info',
        component: () => import('../components/PrestataireInfo.vue')
      },
      {
        path: 'profil',
        component: ()=>import ('../views/PrestataireProfile.vue')
      },
      {
        path: 'mypage',
        component: ()=>import ('../views/MaPage.vue')
      },
      {
        path:'*',
        name: 'admin.notFound,',
        component: () => import('../views/NotFound.vue')
      }
    ]

  },
  {
    path: '/prestate/:id',
    name: 'prestate',
    component: () => import('../views/MaPage.vue'),
    props: true
    },

  {
    path: '/admin',
    component: () => import('../views/EspaceAdmin.vue'),
    children: [
      {
        path: '',
        name: 'amdin.info',
        component: () => import('../components/Admin/AdminInfoTemporaire.vue')
      },
      {
        path: 'prestataires',
        component: ()=>import ('../views/AdminPrestataire.vue')
      },
      {
        path:'*',
        name: 'admin.notFound,',
        component: () => import('../views/NotFound.vue')
      }
    ]

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
  routes,
  scrollBehavior(to , from , savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0 , y:0 , behavior:'smooth'}
    }
  }
})

router.beforeEach(async (to, from, next) => {
  if(store.state.token)await store.dispatch('getInformationFromToken', store.state.token);

  if ((to.path.startsWith('/admin'))) {
    if(store.state.group_id===1){
      next()
    }else {
      next('/');
    }
  }

  if ((to.path.startsWith('/prestataire'))) {
    if(store.state.group_id===2){
      next()
    }else {
      next('/');
    }
  }

  next();


});




export default router
