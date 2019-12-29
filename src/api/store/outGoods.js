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
    deliveryStore() {
        return request({
            url: 'sys/ckstockrecord/getDeliveryOrderStores',
            method: 'get',
        })
    },

    getDeliveryBill(data) {
        return request({
            url: 'sys/ckstockrecord/listByStoreId/'+data,
            method: 'get',
        })
    },


    /**
     *
     */
    getPirntMax() {
        return request({
            url: 'sys/ckapplys/getPintMax',
            method: 'get',
        })
    },


    /**
     *
     */
    getPrintTimes(outDepId) {
        return request({
            url: 'sys/ckapplys/getPintTimes/'+ outDepId,
            method: 'get',
        })
    },


    /**
     *
     */
    outDepQuerySorts(data) {
        return request({
            url: 'sys/ckapplys/outDepQuerySorts',
            method: 'post',
            data
        })
    },

    /**
     * 获取订单申请状态列表
     * @param data
     */
    outDepQueryApplys(data) {
        return request({
            url: 'sys/ckapplys/outDepQueryApplys',
            method: 'post',
            data
        })
    },
    /**
     * 获取订单申请状态列表
     * @param data
     */
    outDepQueryApplysByPageNumber(data) {
        return request({
            url: 'sys/ckapplys/outDepQueryApplysByPageNumber',
            method: 'post',
            data
        })
    },










}
