// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import swal from 'sweetalert'
import Cookies from './assets/js/cookie'
import _g from './assets/js/global'
import store from './vuex/store'
import moment from 'moment';
import filter from './assets/js/filter'
import {i18n, vueI18n} from './lang/lang'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/base.scss';
import './assets/css/global.scss';

import {serverUrl} from './assets/js/deviceProperty'
window.axios = axios;
window.swal = swal;
window.cookie = Cookies;
window._g = _g;
window.store = store;
window.router = router;
window.moment = moment;

axios.interceptors.request.use((config) => {
     // before send request
    if(config.url.indexOf("/vuethink/php/index.php/") < 0 ){
        if(config.method === "put"){
            config.headers.timeout = 1000*40;
        }else{
            config.headers.timeout = 1000*10;
        }
        config.headers.accesstoken = cookie.getCookie("token");
    }
    return config;
 }, function (error){
    return Promise.reject(error);
 });

Vue.use(ElementUI)

vueI18n(Vue)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    filter,
    i18n,
    template: '<router-view></router-view>'
})
