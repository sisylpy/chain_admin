import request from '@/utils/request'

export default {


    /**
     * update
     */
    updatePrice(data) {
        return request({
            url: 'sys/ckstockrecord/update',
            method: 'post',
            data
        })
    },
    /**
     *
     */

    deliverOrderStores() {
        return request({
            url: 'sys/ckstockrecord/getDeliveryOrderStores',
            method: 'get',
        })
    },

    /**
     * 获取店铺出货单
     * @param data
     */
    storeDeliverOrder(data) {
        return request({
            url: 'sys/ckstockrecord/listByDepId',
            method: 'post',
            data
        })
    },











}
