import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import utilisateur from "@/services/utilisateur";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/attraction',
    name: 'attraction',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import(/* webpackChunkName: "about" */ '../views/AttractionView.vue')
  },  {
    path: '/billetterie',
    name: 'billetterie',
    meta: { requiresAuth: false, group_id: 3 },
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
    meta: { requiresAuth: false, group_id: 3 },

    component: () => import(/* webpackChunkName: "about" */ '../views/BoutiqueVue.vue')
   , children: [
       {
         name:'BoutiqueView',
         path:'/',
         component : () => import('../components/BoutiqueView.vue')
    },
      {
        name: 'articleShop',
        path: '/articles/:id', // Modifiez ici pour inclure 'articles'
        component: () => import('../views/ArticleShop.vue'),
        props: true
      },
      ]
      },

    {
    path: '/login',
    name: 'login',
      meta: { requiresAuth: false, group_id: 3 },
      component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },{
    path:'/register',
    name:'register',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import('../views/InscriptionView.vue')
  },
  {path: '/forget-password',
    name: 'forger-password',
    meta: {requiresAuth: false, group_id: 3},
    component: () => import('../views/MotDePasseOublie.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import('@/views/ResetPassword.vue'),
    beforeEnter: (to, from, next) => {
      utilisateur.VerifyToken(to.params.token)
          .then(() => {
            next();
          })
          .catch((error) => {
            console.error('Erreur de vérification du token:', error);
            next('/login');
          });
    }
  },
  {
    path: '/organisateurs',
    name: 'organisateurs',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import(/* webpackChunkName: "about" */ '../views/OrganisateursView.vue')
  },  {
    path: '/panier',
    name: 'panier',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import(/* webpackChunkName: "about" */ '../views/PanierView.vue')
  },
  {
    path: '/restauration',
    name: 'restauration',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import(/* webpackChunkName: "about" */ '../views/ReservationView.vue')
  },{
    path: '/search',
    name: 'search',
    meta: { requiresAuth: false, group_id: 3 },
    component: () => import('../views/SearchVue.vue')
    },
  {
    path: '/prestataire',
    component: () => import('../views/EspacePrestaire.vue'),
    meta: { requiresAuth: true, group_id: 2 },
    children: [
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
        path: 'map',
        name: 'prestataire.map',
        component: ()=>import ('../components/Map2D/Map2D.vue')

      },
      {
        path:'*',
        name: 'presta.notFound,',
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
    meta: { requiresAuth: true, group_id: 1 },
    children: [
      {
        path: '',
        name: 'amdin.info',
        component: () => import('../components/Admin/AdminInfoTemporaire.vue')
      },
      {
        path: 'prestataires',
        component : () => import('../views/AdminPresta.vue'),
        children:[
          {
            path:'/',
            component: ()=>import ('../components/Admin/AdminPrestataire.vue')
          }, {
          path: ':idprestataire',
            component : () => import('../components/Admin/AdminEditPrestataire.vue')
          }

        ]
      },
      {
        path: 'map',
        name: 'admin.map',
        component: ()=>import ('../views/Map2DAdmin.vue')
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const routeRecord = to.matched.find(record => record.meta.group_id !== undefined);
  const group_id = routeRecord ? routeRecord.meta.group_id : null;


  if (store.state.token) {
    await store.dispatch('getInformationFromToken', store.state.token);
    if (requiresAuth) {
      if (group_id === store.state.group_id) {
        next();
      } else {
        switch (store.state.group_id) {
          case 1:
            next('/admin');
            break;
          case 2:
            next('/prestataire');
            break;
          default:
            next('/');
            break;
        }
      }
    } else {
      await store.dispatch('getInformationFromToken', store.state.token);

      if(store.state.group_id === 1){
        next("/admin")
      } else if(store.state.group_id === 2){
        next("/prestataire")
      }
      next();
    }
  } else {
    if (requiresAuth) {
      next('/login');
    } else {
      next();
    }
  }
});




export default router
