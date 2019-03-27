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
import uploader from 'vue-simple-uploader'
import SparkMD5 from 'spark-md5'

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

Vue.prototype.$sparkMD5 = SparkMD5;

axios.interceptors.request.use((config) => {
     // before send request
    if(config.method === "post"){
        config.headers.timeout = 1000*60*30;
    }else{
        config.headers.timeout = 1000*10;
    }
    config.headers.accesstoken = cookie.getCookie("token");  
    return config;
 }, function (error){
    return Promise.reject(error);
 });

Vue.use(ElementUI)
Vue.use(uploader)

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
