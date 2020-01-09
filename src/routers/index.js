import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

import Home from '../views/Home'

//后台数据管理
import GoodsRouter from '../routers/background/goods'
import StoreListRouter from '../routers/background/store'
import LineRouter from '../routers/background/line'
import CkDepRouter from '../routers/background/ckDep'
import StaffRouter from './background/ckUser'

//产品管理
import InventoryRouter from './goodsManagement/inventory'
import DailyRouter from './goodsManagement/daily'
import HandlingRouter from './goodsManagement/handling'


//店铺管理
import TodayOrderRouter from './goodsManagement/todayOrder'
import OutGoodsRouter from './goodsManagement/outGoods'
import StoreBuindessDataRouter from './StoreManagement/businessData'
import CostControlDataRouter from './StoreManagement/costControl'

//供货商
import SupplierRouter from './supplier/supplier'
//
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error=> error)
// }


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
        CkDepRouter,
        StaffRouter,


        StoreBuindessDataRouter,
        CostControlDataRouter,
        TodayOrderRouter,
        OutGoodsRouter,

        InventoryRouter,
        HandlingRouter,
        DailyRouter,

        SupplierRouter,

        {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/index.html',
            name: 'home',
            component: Home
        },
        {
            path: '/addCategory',
            name: 'addCategory',
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
            component: () => import('@/components/Background/CkDep/AddOutDep'),
        },
        {
            path: '/addUser',
            name: 'addUser',
            component: () => import('@/components/Background/CkUser/AddUser'),
        },







    ]
})
