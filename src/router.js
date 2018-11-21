import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'session',
          name: 'SessionList',
          component: () => import('@/views/Sessions'),
          children: [
            {
              path: 'detail/:id',
              name: 'SessionDetail',
              component: () => import('@/views/SessionDetail'),
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login')
    }
  ]
})
