import login from '@/components/account/login'
import refresh from  '@/components/refresh' 
import main from '@/components/home'
import userList from '@/components/user/list'
import appmagrList from "@/components/appmagr/list"
import repoList from "@/components/repo/list"
import bspmagrList from "@/components/bspmagr/list"
import bspmagrAdd from "@/components/bspmagr/add"

let childRoute = [
    {
        path: 'refresh',
        component: refresh,
        name: "refresh",
        meta:{}
    },
    {
        path: 'user/list',
        component: userList,
        name: 'userList',
        meta:{
            menuName: 'userList'
        }
    },
    {
        path: 'appmagr/list',
        component: appmagrList,
        name: 'appmagrList',
        meta: {
            menuName: 'appmagrList'
        }
    },
    {
        path: 'bspmagr/list',
        component: bspmagrList,
        name: 'bspmagrList',
        meta: {
            menuName: 'bspmagrList'
        }
    },
    {
        path: 'bspmagr/add',
        component: bspmagrAdd,
        name: 'bspmagrAdd',
        meta: {
            menuName: 'bspmagrAdd'
        }
    },
    {
        path: 'repo/list',
        component: repoList,
        name: 'repoList',
        meta: {
            menuName: 'repoList'
        }
    },

    {
        path: '*',
        redirect:'user/list'
    }
]
let route = [
    {
        path: '/',
        component: login,
        name: 'login',
        beforeEnter: (to, from, next) => {
            cookie.setCookie("token",'',0)
            next();
        }
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        beforeEnter: (to, from, next) => {
            if(cookie.getCookie("token") === ""){
                next("/")
            }else{
                next()
            }
        },
        children: childRoute,
        redirect:'/main/device/list'    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

export default route