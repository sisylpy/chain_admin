import request from '@/utils/request'

export default {




    /**
     * 获取采购计划商品
     */
    planGoods(data) {
        return request({
            url: 'sys/ckgoods/getPlanGoods/'+data,
            method: 'get',
        })
    },









}
