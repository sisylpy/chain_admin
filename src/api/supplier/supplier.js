import request from '@/utils/request'

export default {


    /**
     * 获取全部供货商
     */
    getAll() {
        return request({
            url: 'sys/cksupplier/listAll',
            method: 'get',
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
