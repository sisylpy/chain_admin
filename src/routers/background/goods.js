export default {

    path: '/products',
    name: 'products',
    component: () => import('@/views/Background/Products'),
    children: [
        {
            path: 'addGoods',
            name: '/products/addGoods',
            component: () => import('@/components/Background/Add_Goods'),

        },
        {
            path: 'addGoods/:goodsId',
            component: () => import('@/components/Background/Add_Goods'),

        }



    ]


}
