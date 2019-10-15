import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

import BackgroundRouter from '../routers/background'

Vue.use(Router)

export default new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    beforeRouteEnter(to, from, next){

        console.log(to);
        console.log(from);


    },
    routes: [
        BackgroundRouter,
        {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/index.html',
            component: Home
        },
        // {
        //     path: '/products',
        //     name: 'products',
        //     component: () => import('@/views/Background/Products'),
        // },
        {
            path: '/pur_assignGoods',
            name: 'pur_assignGoods',
            component: () => import('@/views/Purchase/AssignGoods'),
        },
        {
            path: '/add_Category',
            name: 'add_Category',
            component: () => import('@/components/Background/Add_Category'),
        },
        {
            path: '/add_Category/:goodsId',
            component: () => import('@/components/Background/Add_Category'),
        },
        {
            path: '/pur_multGoods',
            name: 'pur_multGoods',
            component: () => import('@/views/Purchase/MultGoods'),
        },
        {
            path: '/pur_marketGoods',
            name: 'pur_marketGoods',
            component: () => import('@/views/Purchase/MarketGoods'),
        }






    ]
})
