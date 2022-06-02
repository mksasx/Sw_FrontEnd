const key = 'user'
const user = {
    /* 定义 user 数据对象和它的初始值 */
    state() {
        return {
            user:JSON.parse(sessionStorage.getItem("user")) || {
                userId:'',
                username:'',
            }
        }
    },
    /* 定义读取方法 getUser，从 localStorage 中读取 user 数据并转换成 JSON 格式 */
    getters: {
        getUser: function(state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user
        }
    },
    /* 定义更改 store 状态的事件 */
    mutations: {
        /* 存数据，将 JSON 格式的数据转化为字符串形式存储到以 localStorage 中以 `user` 为键的值中 */
        $_setStorage(state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        /* 清空数据，将状态恢复初始值，并从 localStorage 中移除对象 */
        $_removeStorage(state) {
            state.user = null
            localStorage.removeItem(key)
        }
    },
    /* 定义调用 mutations 的方法，向上提供调用接口 */
    actions: {
        /* 调用 _setStorage 方法存储数据 */
        saveUserInfo({ commit }, data) {
            commit('$_setStorage', data)
        },
        /* 调用 _removeStorage 方法清空数据 */
        clearUserInfo({ commit }) {
            commit('$_removeStorage');
        }
    }
};

export default user