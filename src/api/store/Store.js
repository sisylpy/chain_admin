import request from '@/utils/request'

export default {


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
