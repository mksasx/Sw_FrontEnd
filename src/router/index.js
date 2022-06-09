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
        children: [ {
            path: '/FirstPage',
            name: 'FirstPage',
            component: () =>
                import ('../views/FirstPage')
        },
         {
            path: '/search',
            name: 'User',
            component: () =>
                import ('../views/User/search.vue')
        }, {
            path: '/user',
            name: 'user',
            component: () =>
            import ('../views/User/user.vue')
        },{
            path: '/service',
            name: 'service',
            
            component: () =>
            import ('../views/User/service.vue')
        } ,{
            path: '/order',
            name: 'order',
            component: () =>
            import ('../views/User/order.vue')
        } ,{
            path: '/collection',
            name: 'collection',
            component: () =>
            import ('../views/User/collection.vue')
        },{
            path: '/information',
            name: 'information',
            component: () =>
            import ('../views/User/information.vue')
        },{
            path: '/info_order',
            name: 'info_order',
            component: () =>
            import ('../views/User/info_order.vue')
        },{
            path: '/complain',
            name: 'complain',
            component: () =>
            import ('../views/User/complain.vue')
        },{
            path: '/payment',
            name: 'payment',
            component: () =>
            import ('../views/User/payment.vue')
        },{
            path: '/bond',
            name: 'bond',
            component: () =>
                import ('../views/User/bond.vue'),
        },{
            path: '/info_complain',
            name: 'info_complain',
            component: () =>
                import ('../views/User/info_complain.vue'),
        },{
            path: '/connection',
            name: 'connection',
            component: () =>
                import ('../views/User/connection.vue'),
        }]},
        {
               path: '/Login',
                name: 'Login',
                component: () =>
                    import ('../views/Login')
    
        },
        {
            
                path: '/Register',
                name: 'Register',
                component: () =>
                import ('../views/Register/register.vue')
           
        },
        {
            path: '/Commander_Home',
            name: 'Commander_Home',
            component: () =>
                import ('../views/CommanderHome.vue'),
            children: [{
                path: '/Commander_FirstPage',
                name: 'Commander_FirstPage',
                component: () =>
                    import ('../views/Commander/ComFirstPage.vue'),
            }, {
                path: '/Manage_User',
                name: 'Manage_User',
                component: () =>
                    import ('../views/Commander/ManageUser.vue'),
            }, {
                path: '/Manage_House',
                name: 'Manage_House',
                component: () =>
                    import ('../views/Commander/ManageHouse.vue'),
            }, {
                path: '/Manage_RM',
                name: 'Manage_RM',
                component: () =>
                    import ('../views/Commander/ManageRM.vue'),
            }, {
                path: '/Manage_Complain',
                name: 'Manage_Complain',
                component: () =>
                    import ('../views/Commander/ManageComplain.vue'),
            }, {
                path: '/Managed_Complain',
                name: 'Managed_Complain',
                component: () =>
                    import ('../views/Commander/ManagedComplain.vue'),
            }, {
                path: '/Manage_Contract',
                name: 'Manage_Contract',
                component: () =>
                    import ('../views/Commander/ManageContract.vue'),
            }, {
                path: '/UnManaged_Contract',
                name: 'UnManaged_Contract',
                component: () =>
                    import ('../views/Commander/UnManagedContract.vue'),
            },{
                path: '/Commander_Connection',
                name: 'Commander_Connection',
                component: () =>
                    import ('../views/Commander/Commander_Connection'),
            },{
                path: '/Commander_info_complain',
                name: 'Commander_info_complain',
                component: () =>
                    import ('../views/Commander/Commander_info_complain'),
            },]
    },{
        path: '/RepairMan_Home',
        name: 'Rp_Man_Home',
        component: () =>
            import ('../views/RepairMan_home.vue'),
        children: [{
            path: '/RepairMan_SelfInfo',
            name: 'RepairMan_SelfInfo',
            component: () =>
                import ('../views/RepairMan/Self_Info.vue'),
        }, {
            path: '/History_Work',
            name: 'History_Work',
            component: () =>
                import ('../views/RepairMan/History_Work.vue'),
        }, {
            path: '/Todo_Work',
            name: 'Todo_Work',
            component: () =>
                import ('../views/RepairMan/Todo_Work.vue'),
        }, {
            path: '/RepairMan_Connection',
            name: 'RepairMan_Connection',
            component: () =>
                import ('../views/RepairMan/RepairMan_Connection.vue'),
        }, {
            path: '/RepairMan_info_complain',
            name: 'RepairMan_info_complain',
            component: () =>
                import ('../views/RepairMan/RepairMan_info_complain.vue'),
        }]
    }

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