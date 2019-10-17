import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

import BackgrounGoodsRouter from '../routers/background/goods'
import BackgroundStoreListRouter from '../routers/background/storeList'
import BackgroundCkLineRouter from '../routers/background/ckLine'

import Add_Category from '../components/Background/Add_Category'
import Add_Line from '../components/Background/Add_Line'

Vue.use(Router)

export default new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    beforeRouteEnter(to, from, next){

        console.log(to);
        console.log(from);


    },
    routes: [
        BackgrounGoodsRouter,
        BackgroundStoreListRouter,
        BackgroundCkLineRouter,
        {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/index.html',
            component: Home
        },
        {
            path: '/add_Category',
            component: Add_Category
        },
        {
            path: '/addLine',
            component: Add_Line
        }








    ]
})
