export default {

    path: '/order',
    name: 'order',
    component: () => import('@/views/StoreManagement/Order'),
    children: [

        // {
        //     path: 'addGoods/:goodsId',
        //     component: () => import('@/components/Background/Add_Goods'),
        //
        // }



    ]


}
