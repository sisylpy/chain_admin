import request from '@/utils/request'

export default {



     /**======= Weigh 接口=======
    /**
     * 根据fatherId获取gather申请
     */
    getApplysForWeighByFatherId(data){
        return request({
            url: 'sys/ckapplys/getWeighByFatherId/'+data,
            method: 'get',
        })

    },

    /**
     * 初始化weigh
     */
    initWeightData() {
        return request({
            url: 'sys/ckapplys/getWeigh',
            method: 'get',
        })

    },




    /** ====== prepare 接口 =========
    /**
     * getApplysAndSorts
     */
    initPrepareData() {
        return request({
            url: 'sys/ckapplys/getPrepare',
            method: 'get',
        })
    },


    /**
     * 记录第几次打印
     */
    getPirntMax() {
        return request({
            url: 'sys/ckapplys/getPintMax',
            method: 'get',
        })
    },


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
    saveOutQuantity(data) {
        return request({
            url: 'sys/ckstockrecord/save',
            method: 'post',
            data
        })
    },








}
