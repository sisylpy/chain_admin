import request from '@/utils/request'

export default {


    /**
     * 获取今日订货申请
     */
    getApplysByStoreId(data) {
        return request({
            url: 'sys/ckapplys/getApplys/'+ data,
            method: 'get',
        })
    },



    /**
     * 保存订货数据
     */
    saveReplaceApplys(data) {
        console.log("api/////")
        console.log(data)
        return request({
            url: 'sys/ckapplys/replaceOrder',
            method: 'post',
            data
        })
    }







}
