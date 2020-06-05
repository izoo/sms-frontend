import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/Auth.vue'
import Dashboard from '@/components/Dashboard.vue'
import Contacts from '@/components/Admin/Contacts.vue'
import Groups from '@/components/Admin/Groups.vue'
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component:Dashboard
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts
  },
  {
    path:'/groups',
    name:'groups',
    component: Groups
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
//  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
