import request from '@/utils/request'

export default {




    /**
     * 获取采购计划商品
     */
    purchaseGoods(data) {
        return request({
            url: 'sys/ckgoods/getTypePurchase/'+data,
            method: 'get',
        })
    },









}
