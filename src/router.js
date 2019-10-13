import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Ordering from './views/shopOrder/ordering'
import SupplyProducts from './views/shopOrder/supplyProducts'
import AssignGoods from './views/Purchase/AssignGoods'
import MultGoods from './views/Purchase/MultGoods'
import AddAssignGoods from './views/Purchase/Add_assignGoods'
import ModalWarning from './components/ModalWarning'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/so_ordering',
            component: Ordering
        },
        {
            path: '/so_supplyProducts',
            component: SupplyProducts
        },
        {
            path: '/op_assignGoods',
            component: AssignGoods,
            children:[
                {
                    path: 'madal_warning',
                    component: ModalWarning,
                    name: '/op_assignGoods/madal_warning'
                },
            ]
        },
        {
            path: '/add_assignGoods',
            component: AddAssignGoods,

        },
        {
            path: '/add_assignGoods/:goodsId',
            component: AddAssignGoods,
            props: true
        },

        {
            path: '/op_multGoods',
            component: MultGoods
        },


        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
