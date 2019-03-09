// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { LoadingPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
import '@/iconfont/iconfont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App'
import _Global from '@/components/global'
//Router Init
const p1 = () => import('@/components/page1');
const p2 = () => import('@/components/page2');
const p3 = () => import('@/components/page3');
const p4 = () => import('@/components/page4');
const Login = () => import('@/components/Login');
const Details = () => import('@/components/TokenViewItemDetails');
const SignInDesk = () => import('@/components/SignInDesk');
const RegAccout = () => import('@/components/RegAccout');
const MyTeam = () => import('@/components/MyTeam');
const PromotionActivity = () => import('@/components/PromotionActivity');
const SystemSetting = () => import('@/components/page4Setting');
const Certification = () => import('@/components/Certification');
const WordBook = () => import('@/components/WordBook');
const EditLoginPwd = () => import('@/components/EditLoginPwd');
const EditPayPwd = () => import('@/components/EditPayPwd');
const NewsDetails = () => import('@/components/NewsDetails');
const TransferPage = () => import('@/components/TransferPage');
const TransferList = () => import('@/components/TransferList');

//End Router


Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
window.MVue = Vue;

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
  },
  {
    path: '/SystemSetting',
    component: SystemSetting
  },
  {
    path: '/Certification',
    component: Certification
  },
  {
    path: '/WordBook',
    component: WordBook
  },
  {
    path: '/EditLoginPwd',
    component: EditLoginPwd
  },
  {
    path: '/EditPayPwd',
    component: EditPayPwd
  },
  {
    path: '/NewsDetails',
    component: NewsDetails
  },
  {
    path: '/TransferPage',
    component: TransferPage
  },
  {
    path: '/TransferList',
    component: TransferList
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
