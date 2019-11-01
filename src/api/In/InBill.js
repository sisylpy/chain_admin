import request from '@/utils/request'

export default {

    /**
     * 获取员工列表
     * @param data
     */
    queryGoodsWithPinyin(data) {
        return request({
            url: 'sys/ckgoods/queryPinyin/' +data,
            method: 'get',
        })
    },

    /**
     * 保存录入单
     */
    saveInBill(data) {
        return request ({
            url: 'sys/ckinbill/save',
            method: 'post',
            data
        })
    },
    /**
     * 历史单据
     */
    billList(data) {
        return request({
            url: 'sys/ckinbill/list',
            method: 'post',
            data

        })
    }







}
