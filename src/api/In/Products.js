import request from '@/utils/request'

export default {


    /**
     * 出货部门获取商品列表
     */

    getOutDepGoodsList(data) {
        return request({
            url: 'sys/ckgoods/outDepGoodsList',
            method: 'post',
            data
        })
    },
     /**
     * 出货部门产品类别
     */
    getOutDepCateList(data) {
        return request({
            url: 'sys/ckgoods/outDepCateList/' + data,
            method: 'get',
        })
    },

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
