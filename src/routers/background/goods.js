export default {

    path: '/Products',
    name: 'products',
    component: () => import('@/views/Background/Products'),
    children: [
        {
            path: 'addGoods',
            name: '/Products/addGoods',
            component: () => import('@/components/Background/Products/AddGoods'),

        },
        {
            path: 'addGoods/:goodsId',
            component: () => import('@/components/Background/Products/AddGoods'),

        }



    ]


}
