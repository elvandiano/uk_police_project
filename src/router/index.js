import Vue from 'vue'
import Router from 'vue-router'
import UkPolice from '@/components/UkPolice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UkPolice',
      component: UkPolice
    }
  ],
  mode: 'history'
})
