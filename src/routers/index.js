import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

import GoodsRouter from '../routers/background/goods'
import StoreListRouter from '../routers/background/store'
import CkLineRouter from '../routers/background/ckLine'
import OutDepRouter from '../routers/background/outDep'
import PurDepRouter from '../routers/background/purDep'
import StoreBuindessDataRouter from '../routers/store/businessData'



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
        CkLineRouter,
        OutDepRouter,
        PurDepRouter,
        StoreBuindessDataRouter,
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
            component: () => import('@/components/Background/Products/AddCategory'),
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








    ]
})
