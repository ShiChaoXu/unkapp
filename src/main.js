// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import p1 from './components/page1'
import p2 from './components/page2'
import p3 from './components/page3'
import p4 from './components/page4'
import Login from './components/Login'
import Details from './components/TokenViewItemDetails'
import SignInDesk from './components/SignInDesk'
import PromotionActivity from './components/PromotionActivity'
import RegAccout from './components/RegAccout'
import MyTeam from './components/MyTeam'
import './iconfont/iconfont.css'
import $ from 'jquery'
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import _Global from './components/global'

Vue.config.devtools = true;
Vue.use(VueRouter)
Vue.prototype.Global = _Global;

const routes = [
  {
    path: '/p2',
    component: p2
  },
  {
    path: '/p1',
    component: p1
  },
  {
    path: '/p3',
    component: p3
  },
  {
    path: '/p4',
    component: p4
  }
  ,
  {
    path: '/',
    component: Login
  },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/Details',
    component: Details
  },
  {
    path: '/SignInDesk',
    component: SignInDesk
  },
  {
    path: '/PromotionActivity',
    component: PromotionActivity
  },
  {
    path: '/RegAccout',
    component: RegAccout
  },
  {
    path: '/MyTeam',
    component: MyTeam
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
