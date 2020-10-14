// 引入 Vue
import Vue from 'vue'
// 入口文件
import App from './App'
// 引入路由
import router from './router'

import store from './store'
import $ from 'jquery'
// 提供增强ajax服务，可以增加拦截器
import axios from './http'
import qs from 'qs'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
//引入element组件及样式
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
//引入Echarts
import echarts from 'echarts'
import {getCookie} from "./libs/cookieUtils";

require('!vue-style-loader!css-loader!less-loader!./assets/css/main.less')

Vue.prototype.$ajax = axios;
window.qs = qs;
window.JSON = JSON;

Vue.prototype.$echarts = echarts

//Vue.use(iView);
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 根据环境的不同，赋予变量不同的值
var env = require('./env/' + process.env.NODE_ENV + '.env.js');

store.commit("setWspServer", env.wspServer);
store.commit("setWebServer", env.webServer);
store.commit("setOauthLoginUrl", env.oauthLoginUrl);
store.commit("setOauthLogoutUrl", env.oauthLogoutUrl);
store.commit("setWebSocketUrl",env.webSocketUrl);

//日期格式
Vue.filter('toDate', function (val) {
    if(val){
        var oDate = new Date(val);
        var year = oDate.getFullYear();
        var month = oDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = oDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return year + '-' + month + '-' + day;
    }else{
        return "";
    }


});
//日期格式
Vue.filter('toDateTime', function (val) {
    var oDate = new Date(val);
    var year = oDate.getFullYear();
    var month = oDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = oDate.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hours = oDate.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = oDate.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = oDate.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    // return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+ oDate.getHours()+':'+oDate.getMinutes()+':'+oDate.getSeconds()
});
//时间格式
Vue.filter('difTime', function (val) {
    if (val) {
        var date1 = val;  //开始时间(必须是时间戳，不是就要转换)
        var date2 = new Date();    //结束时间
        var date3 = date2.getTime() - date1;   //时间差的毫秒数
        var myseconds = date3 / 1000;            //时间差（秒）
        var mymintues = myseconds / 60;          //时间差（分钟）
        var myhousrs = mymintues / 60;          //时间差（小时）

        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000);       //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);

        if (myseconds <= 60) {
            return "刚刚";
        } else if (mymintues <= 60) {
            return Math.floor(minutes) + "分钟前";
        } else if (1 < myhousrs <= 24) {
            return Math.floor(myhousrs) + "小时前";
        } else if (24 < myhousrs <= 48) {
            return "昨天 " + val.getHours() + ':' + val.getMinutes() + ':' + val.getSeconds()
        } else if (48 < myhousrs) {
            return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate() + ' ' + val.getHours() + ':' + val.getMinutes() + ':' + val.getSeconds()
        }
    }
});
//时间过滤器
Vue.filter('toTime', function (val) {
    var oDate = new Date(val);
    return oDate.getHours() + ':' + oDate.getMinutes() + ':' + oDate.getSeconds()
});
//星期过滤器
Vue.filter('toDay', function (val) {
    var day = val;
    switch (day) {
        case 1:
            return "一";
            break;
        case 2:
            return "二";
            break;
        case 3:
            return "三";
            break;
        case 4:
            return "四";
            break;
        case 5:
            return "五";
            break;
        case 6:
            return "六";
            break;
        default:
            return "日";
    }
});

//遮盖手机号码过滤器
Vue.filter('tophone', function (val) {
    if (val) {
        var val = val.toString();
        return val.substr(0, 3) + "****" + val.substr(7, 4);
    }
});

// 页面刷新时，重新赋值state
if(getCookie('name')){
    store.commit("setName",getCookie('name'))
}
if(getCookie('userId')){
    store.commit("setUserId",getCookie('userId'))
}
if(getCookie('token')){
    store.commit("setToken",getCookie('token'))
}
if(getCookie('bkwebRelationData')){
    store.commit("setBkwebRelationData",getCookie('bkwebRelationData'))
}

/*if (getCookie('token')) {
    store.commit("setToken",getCookie('token'))
}
if (getCookie('userId')) {
    store.commit("setUserId", getCookie('userId'))
}
if (getCookie('mobilePhone')) {
    store.commit("setMobilePhone", getCookie('mobilePhone'))
}
if (getCookie('logo')) {
    store.commit("changeLogo", getCookie('logo'))
}
if (getCookie('name')) {
    store.commit("setName", getCookie('name'))
}
if (getCookie('isAgent')) {
    store.commit("setIsAgent", getCookie('isAgent'))
}
if (getCookie('rememberMe')) {
    store.commit("storageUser", getCookie('rememberMe'))
}
if (getCookie('user')) {
    store.commit("USER_SIGN_IN", JSON.parse(getCookie('user')))
}*/
/*
if (window.localStorage.getItem('token')) {
    store.commit("setToken", window.localStorage.getItem('token'))
}
if (window.localStorage.getItem('userId')) {
    store.commit("setUserId", window.localStorage.getItem('userId'))
}
if (window.localStorage.getItem('mobilePhone')) {
    store.commit("setMobilePhone", window.localStorage.getItem('mobilePhone'))
}
if (window.localStorage.getItem('logo')) {
    store.commit("changeLogo", window.localStorage.getItem('logo'))
}
if (window.localStorage.getItem('name')) {
    store.commit("setName", window.localStorage.getItem('name'))
}
if (window.localStorage.getItem('isAgent')) {
    store.commit("setIsAgent", window.localStorage.getItem('isAgent'))
}
if (window.localStorage.getItem('rememberMe')) {
    store.commit("storageUser", window.localStorage.getItem('rememberMe'))
}
if (window.localStorage.getItem('user')) {
    store.commit("USER_SIGN_IN", JSON.parse(window.localStorage.getItem('user')))
}*/

// 全局导航钩子
// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title;
//     // 判断该路由是否需要登录权限
//     if (to.meta.requireAuth) {
//         // 通过vuex state获取当前的token是否存在
//         // console.log(isEmptyObject(store.state.user))
//         // if (!isEmptyObject(store.state.token)) {
//         //     next();
//         // } else {
//         //     next({
//         //         path: '/',
//         //         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         //     })
//         // }
//         next();
//     } else {
//         next();
//     }
// });

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

new Vue({
    el: '#app',
    router,
    store,
    axios,
    render: h => h(App)
});
