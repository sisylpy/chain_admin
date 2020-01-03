import request from '@/utils/request'

export default {

    /**===  代下单接口 ====

     /**
     * 1, 获取路线分店列表
     */
    getStoreListAllWithLine() {
        return request({
            url: 'sys/ckstore/queryLineStore',
            method: 'get',
        })
    },


    /**
     * 2,保存订货数据
     */
    saveTomorrowApplys(data) {
        return request({
            url: 'sys/ckapplys/saveTomorrowApplys',
            method: 'post',
            data
        })
    },




    /** === 今日申请接口 ====

     /**
     * 1， 获取今天订货的店铺
     */
    getTodayApplysStores() {
        return request({
            url: 'sys/ckapplys/getTodayApplysStores',
            method: 'get',
        })
    },

    /**
     * 3，删除申请
     */
    delateApplyById(data) {
        return request({
            url: 'sys/ckapplys/deleteOne/' + data,
            method: 'get',
        })
    },

    /**
     * 获取今日订货申请
     */
    getApplysByStoreId(data) {
        return request({
            url: 'sys/ckapplys/getStoreApplysByLimit',
            method: 'post',
            data
        })
    },


}
