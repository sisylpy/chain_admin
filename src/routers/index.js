import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

//后台数据管理
import GoodsRouter from '../routers/background/goods'
import StoreListRouter from '../routers/background/store'
import LineRouter from '../routers/background/line'
import OutDepRouter from '../routers/background/outDep'
import StaffRouter from './background/ckUser'
import ProductsRouter from './GoodsManagement/Products'
import OrderRouter from './StoreManagement/order'
import ReplaceOrder from './StoreManagement/replaceOrder'


//店铺管理
import StoreBuindessDataRouter from './StoreManagement/businessData'
import CostControlDataRouter from './StoreManagement/costControl'


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

        OrderRouter,
        ReplaceOrder,


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
            path: '/importGoods',
            component: () => import('@/components/Background/Goods/ImportGoods'),
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
