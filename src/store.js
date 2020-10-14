import Vue from 'vue'
import Vuex from 'vuex'
var config = require('../config');

import {setCookie} from './libs/cookieUtils'
import {delCookie} from './libs/cookieUtils'

Vue.use(Vuex);

const state = {

	spinShow: false,                       //加载页状态
	userId:null,
	name : null,
	user: null,                             //用户
	pageSizes: [5, 10, 50, 100],        //列表页面每页多少条设置
	wspServer: null,
	webServer: null,
	umServer: null,
	oauthLoginUrl: null,
	oauthLogoutUrl: null,
    permissions : null,
    tableHeight: null,
	webSocketUrl:null,                   //websocketUrl路径
	email: null,
	bkwebRelationData:null,
};

const mutations = {
	USER_SIGN_IN (state, data){
		state.name=data.name;
		state.userId=data.userId;
		state.userName=data.userName;
		state.email=data.email;
		setCookie("name",data.name);
		setCookie("userId",data.userId);
		setCookie("userName",data.userName);
		setCookie("email",data.email);
	},
	USER_SIGN_OUT (state, data){
        delCookie('user');
        delCookie('token');
        delCookie('userId');

        state.user = null;
        state.token = null;
        state.userId = null;
        state.name = null;
        state.permissions = null;
	},
	changeSpinShow (state, data) {
		// localStorage.spinShow = data;
		state.spinShow = data
	},
	setEmail(state, data){
		setCookie("token",data);
		state.token = data;
	},
	setUserId (state, data) {
        setCookie('userId', data);
		state.userId = data
	},
	setName(state, data) {
        setCookie('name', data);
		state.name = data
	},
	setToken (state, data) {
        setCookie('token', data);
		state.token = data;
	},
	setBkwebRelationData (state, data) {
		setCookie('bkwebRelationData', data);
		state.bkwebRelationData = data;
	},
	setPermissions (state, data) {
        setCookie('permissions', data);
		state.permissions = data;
	},
	LOGOUT (state) {
        delCookie('token');
        state.token = null;
        delCookie('userId');
        state.userId = null;
        delCookie('user');
        state.user = null;
	},
	setWspServer (state, data) {
		state.wspServer = data;
	},
	setWebServer (state, data) {
		state.webServer = data;
	},
	setUmServer (state, data) {
		state.umServer = data;
	},
	setOauthLoginUrl (state, data) {
		state.oauthLoginUrl = data;
	},
	setOauthLogoutUrl (state, data) {
		state.oauthLogoutUrl = data;
	},

	setTableHeight (state, data) {
		state.tableHeight = data;
	},
	setWebSocketUrl(state, data){
		state.webSocketUrl =  data;
	}

}

export default new Vuex.Store({
	state,
	mutations,
})
