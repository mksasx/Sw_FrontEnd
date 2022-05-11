import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import user from "@/store/user";
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('../views/HomePage.vue'),
        children: [{
            path: '/Login',
            name: 'Login',
            component: () =>
                import ('../views/Login')
        }, {
            path: '/FirstPage',
            name: 'FirstPage',
            component: () =>
                import ('../views/FirstPage')
        }, {
            path: '/Mall',
            name: 'Mall',
            component: () =>
                import ('../views/mall.vue')
        }, {
            path: '/UserManage',
            name: 'User',
            component: () =>
                import ('../views/User')
        }, {
            path: '/filter',
            name: 'Filter',
            component: () =>
                import ('../views/filter.vue')
        },{
            path: '/Register',
            name: 'Register',
            component: () =>
            import ('../views/Register/register.vue')
        } ]
    },

    // {
    //     path: '/self',
    //     name: 'Self',
    //     component: () =>
    //         import ('../views/self.vue'),
    //     meta: {
    //         requireAuth: true
    //     }
    // },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    // 通过 Vuex 获取用户登录信息
    const userInfo = user.getters.getUser(user.state());

    // 若前往的是登录路由，则保存当前路由到 preRoute 的键值对中，以便登录成功后跳转
    if (to.path === '/login') {
        localStorage.setItem("preRoute", router.currentRoute.fullPath);
    }

    // 若用户未登录且访问的页面需要登录，则跳转至登录页面
    if (!userInfo && to.meta.requireAuth) {
        next({
            name: 'login',
        })
    }

    next()
})
export default router