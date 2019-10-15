export default {

    path: '/products',
    name: 'products',
    component: () => import('@/views/Background/Products'),
    children: [
        {
            path: 'add_assignGoods',
            name: 'add_assignGoods',
            component: () => import('@/views/Purchase/Add_assignGoods'),
        },
        {
            path: 'add_assignGoods/:goodsId',
            component: () => import('@/views/Purchase/Add_assignGoods'),
        },
    ]



}
