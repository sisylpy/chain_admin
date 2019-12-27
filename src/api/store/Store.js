import request from '@/utils/request'

export default {


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

    /**
     *
     */
    getApplysByFatherId(data) {
    return request({
        url: 'sys/ckapplys/queryOutGoodsByFatherId/'+data,
        method: 'get',
    })
},

    /**
     * 获取今天订货的店铺
     */
    getTodayApplysStores() {
        return request({
            url: 'sys/ckapplys/getTodayApplysStores',
            method: 'get',
        })
    },

    /**
     * queryApplysAndSorts
     */
    getApplysAndSorts(data){
        return request({
            url: 'sys/ckapplys/queryApplysAndSorts/'+ data,
            method: 'get',
        })
    },


    /**
     * 获取今日订货申请
     */
    getApplysByStoreId(data) {
        return request({
            url: 'sys/ckapplys/storeGetApplysByLimit',
            method: 'post',
            data
        })
    },



    /**
     * 保存订货数据
     */
    saveReplaceApplys(data) {
        return request({
            url: 'sys/ckapplys/replaceOrder',
            method: 'post',
            data
        })
    },

    /**
     * 删除申请
     */
    delateApplyById(data) {
        return request({
            url: 'sys/ckapplys/deleteOne/'+data,
            method: 'get',
        })
    }







}
