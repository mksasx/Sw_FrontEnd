import Vue from 'vue'
import Vuex from 'vuex'
// import user from "./user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:JSON.parse(sessionStorage.getItem("user")) || {
            userId:'',
            username:'',
        }
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
        }
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
        clear({ commit }) {
            commit("$_removeStorage");
        }
    },
    // modules: {
    //     user
    // }
})