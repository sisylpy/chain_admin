import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

//后台数据管理
import GoodsRouter from '../routers/background/goods'
import StoreListRouter from '../routers/background/store'
import LineRouter from '../routers/background/line'
import OutDepRouter from '../routers/background/outDep'
import StaffRouter from './background/ckUser'
import ProductsRouter from './In/Products'
import OutOrderApplicationRouter from '../routers/Out/OrderApplication'
import DeliveryOrderRouter from '../routers/Out/DeliveryOrder'


//店铺管理
import StoreBuindessDataRouter from '../routers/store/businessData'
import CostControlDataRouter from '../routers/store/costControl'



Vue.use(Router)

export default new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    beforeRouteEnter(to, from, next){

        console.log(to);
        console.log(from);


    },
    routes: [

        GoodsRouter,
        StoreListRouter,
        LineRouter,
        OutDepRouter,
        StaffRouter,
        ProductsRouter,

        StoreBuindessDataRouter,
        CostControlDataRouter,

        OutOrderApplicationRouter,
        DeliveryOrderRouter,


        {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/index.html',
            component: Home
        },
        {
            path: '/addCategory',
            component: () => import('@/components/Background/Goods/AddCategory'),
        },
        {
            path: '/addStore',
            name:'addStore',
            component: () => import('@/components/Background/Store/AddStore'),

        },
        {
            path: '/addLine',
            name:'addLine',
            component: () => import('@/components/Background/Line/AddLine'),

        },
        {
            path: '/addOutDep',
            name: 'addOutDep',
            component: () => import('@/components/Background/OutDep/AddOutDep'),
        },
        {
            path: '/addUser',
            name: 'addUser',
            component: () => import('@/components/Background/CkUser/AddUser'),
        },







    ]
})
