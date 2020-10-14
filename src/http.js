 /** http配置 */
// 引入axios
import axios from 'axios'
import store from './store'
import router from './router'

// Cookie
import {getCookie} from './libs/cookieUtils'

// 超时时间
axios.defaults.timeout = 100000;
// 接口地址
//axios.defaults.baseURL = 'http://dlg.dalinggong.com/v_2_4/';
//axios.defaults.baseURL = 'http://localhost:9081/vmell';
//axios.defaults.baseURL = 'http://localhost/';
//axios.defaults.baseURL = 'http://bpmcdevweb.jqdev.saic-gm.com/';
axios.defaults.baseURL = '';

// var loadinginstace
// http请求拦截器
axios.interceptors.request.use(config => {
    console.log("request", config)
    console.log("store.state.token", getCookie('token'))

    if(config.method=='get') {
        config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
        }
    }

    /*if(config.method=='post'){
        config.data = {
            ...config.data,
            _t: Date.parse(new Date())/1000,
        }
    }else if(config.method=='get'){
        config.params = {
            _t: Date.parse(new Date())/1000,
            ...config.params
        }
    }*/

    // if(!getCookie('user')){
    //     store.commit("LOGOUT");
    //     router.replace({
    //         path: '/',
    //         // query: {redirect: router.currentRoute.fullPath}
    //     })
    // }

    config.headers.common['x-access-token'] = getCookie('token');
   /* store.commit('changeSpinShow', true);    //用的是iview的加载状态在Vuex里*/
    return config
}, error => {
    store.commit('changeSpinShow', false);
    return Promise.reject(error)
});

// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading

    console.log("response", data)
    store.commit('changeSpinShow', false);
    if (data.data) {
        return data.data
    }
    return data
}, error => {

    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                store.commit("LOGOUT");
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })

            default:
                store.commit('changeSpinShow', false);
        }
    }

    return Promise.reject(error.response)
});

export default axios
