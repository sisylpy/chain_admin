export default {

    path: '/products',
    name: 'products',
    component: () => import('@/views/GoodsManagement/Products'),
    children: [

        // {
        //     path: 'addGoods/:goodsId',
        //     component: () => import('@/components/Background/Add_Goods'),
        //
        // }



    ]


}
