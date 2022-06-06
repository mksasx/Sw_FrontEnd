import Vue from 'vue'
import Vuex from 'vuex'
// import user from "./user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: JSON.parse(sessionStorage.getItem("user")) || {
            userId: '',
            username: '',
        },
        justhouseid: JSON.parse(sessionStorage.getItem("justhouseid")) || {
            houseid: '',
        },
        user_work: JSON.parse(sessionStorage.getItem("user_work")) || {
            userId: '',
            workId: '',
        },
        justrenttime: JSON.parse(sessionStorage.getItem("justrenttime")) || {
            begin_time: '',
            finish_time: '',
        },
        justorderid: JSON.parse(sessionStorage.getItem("justorderid")) || {
            orderid: '',
        },
    },
    mutations: {
        $_setStorage(state, value) {

            sessionStorage.setItem('user', JSON.stringify(value))
            state.user = value
        },
        /* 清空数据，将状态恢复初始值，并从 localStorage 中移除对象 */
        $_removeStorage(state) {

            sessionStorage.removeItem('user')
            state.user = null
        },
        $_setjusthouse(state, value) {
            sessionStorage.setItem('justhouseid', JSON.stringify(value))
            state.justhouseid = value
        },
        $_removejusthouse(state) {
            sessionStorage.removeItem('justhouseid')
            state.justhouseid = null
        },
        $_setuser_workStorage(state, value) {

            sessionStorage.setItem('user_work', JSON.stringify(value))
            state.user_work = value
        },
        $_removeuser_workStorage(state) {

            sessionStorage.removeItem('user_work')
            state.user_work = null
        },

        $_setjustrenttime(state, value) {

            sessionStorage.setItem('justrenttime', JSON.stringify(value))
            state.justrenttime = value
        },
        $_removejustrenttime(state) {

            sessionStorage.removeItem('justrenttime')
            state.justrenttime = null
        },
        $_setjustorder(state, value) {
            sessionStorage.setItem('justorderid', JSON.stringify(value))
            state.justorderid = value
        },
        $_removejustorder(state) {
            sessionStorage.removeItem('justorderid')
            state.justorderid = null
        },
    },
    actions: {
        /* 定义清空 localStorage 的方法 */
        saveUserInfo({ commit }, data) {
            commit('$_setStorage', data)
        },
        /* 调用 _removeStorage 方法清空数据 */
        clearUserInfo({ commit }) {
            commit('$_removeStorage');
        },
        savejusthouseid({ commit }, data) {
            commit('$_setjusthouse', data)
        },
        clearjusthouseid({ commit }) {
            commit('$_removejusthouse');
        },
        saveuser_workInfo({ commit }, data) {
            commit('$_setuser_workStorage', data)
        },
        clearuser_workInfo({ commit }) {
            commit('$_removeuser_workStorage')
        },
        savejustrenttime({ commit }, data) {
            commit('$_setjustrenttime', data)
        },
        clearjustrenttime({ commit }) {
            commit('$_removejustrenttime')
        },
        savejustorder({ commit }, data) {
            commit('$_setjustorder', data)
        },
        clearjustorder({ commit }) {
            commit('$_removejustorder')
        },
        clear({ commit }) {
            commit("$_removeStorage");
        },

    },
    // modules: {
    //     user
    // }
})