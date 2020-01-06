export default {

    path: '/products',
    name: 'products',
    component: () => import('@/views/GoodsManagement/Stock'),
    children: [

        // {
        //     path: 'addGoods/:goodsId',
        //     component: () => import('@/components/Background/Add_Goods'),
        //
        // }



    ]


}
