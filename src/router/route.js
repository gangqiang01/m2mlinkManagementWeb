import login from '@/components/account/login'
import refresh from  '@/components/refresh' 
import main from '@/components/home'
import userList from '@/components/user/list'

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
            menuNmae: 'userList'
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
        // beforeEnter: (to, from, next) => {
        //     cookie.setCookie("token",'',0)
        //     next();
        // }
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        // beforeEnter: (to, from, next) => {
        //     if(cookie.getCookie("token") === ""){
        //         next("/")
        //     }else{
        //         next()
        //     }
        // },
        children: childRoute,
        redirect:'/main/device/list'    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

export default route