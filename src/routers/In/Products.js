export default {

    path: '/products',
    name: 'products',
    component: () => import('@/views/In/Products'),
    children: [

        // {
        //     path: 'addGoods/:goodsId',
        //     component: () => import('@/components/Background/Add_Goods'),
        //
        // }



    ]


}
