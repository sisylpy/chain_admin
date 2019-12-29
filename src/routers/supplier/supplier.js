export default {

    path: '/supplier',
    name: 'supplier',
    component: () => import('@/views/Supplier/list'),
    children: [

        // {
        //     path: 'addGoods/:goodsId',
        //     component: () => import('@/components/Background/Add_Goods'),
        //
        // }



    ]


}
