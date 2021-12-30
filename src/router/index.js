import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Backstage from '@/components/Backstage'
import UserRegister from "@/components/UserRegister"
import AdminRegister from "@/components/AdminRegister"
import Collections from "@/components/Collections"
import ManageChat from "@/components/ManageChat"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/talk',
      name: 'talk',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: "/backstage",
      name: "backstage",
      component: Backstage
    },{
      path: "/userregister",
      name: "userregister",
      component: UserRegister
    },{
      path: "/adminregister",
      name: "adminregister",
      component: AdminRegister
    },{
      path: "/collections",
      name: "collections",
      component: Collections
    },{
      path: "/managechat",
      name: "managechat",
      component: ManageChat
    }
    
  ]
})
