export default {

    path: '/goods',
    name: 'goods',
    component: () => import('@/views/Background/Goods'),
    children: [
        {
            path: 'addGoods',
            name: 'addGoods',
            component: () => import('@/components/Background/Goods/AddGoods'),

        },
        {
            path: 'addGoods/:goodsId',
            component: () => import('@/components/Background/Goods/AddGoods'),

        },




    ]


}
