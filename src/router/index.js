// 引入 Vue
import Vue from 'vue'
// 引入路由
import Router from 'vue-router'

// 使用路由
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: '/', meta: {title: 'STC'}, component: resolve => require(['@/pages/workspace/workspace'], resolve),

            children: [

                {path: '/overview', meta: {title: '首页', name: 'index'}, component: resolve => require(['@/pages/workspace/overview'], resolve)},

                {path: '/toDoList', meta: {title: '首页', name: 'index'}, component: resolve => require(['@/pages/workspace/toDoList'], resolve)},

                {path: '/relation', meta: {title: '联系', name: 'relation'}, component: resolve => require(['@/pages/workspace/relation'], resolve)},

                {path: '/employeeManage', meta: {title: '人员管理页面', name: 'employeeManage'}, component: resolve => require(['@/pages/systemManage/EmployeeManage'], resolve)},


            ]
        },
        {path: '/login', meta: {title: 'login', requireAuth: false}, component: resolve => require(['@/pages/workspace/login'], resolve)},

        {path: '/activate', meta: {title: 'activate', requireAuth: false}, component: resolve => require(['@/pages/workspace/activate'], resolve)},

    ]
})
