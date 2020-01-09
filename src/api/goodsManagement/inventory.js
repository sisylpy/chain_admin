import request from '@/utils/request'

export default {




    /**
     * 出货部门获取商品列表
     */

    getOutDepTypeGoodsList(data) {
        console.log(data)
        console.log("kankandata??")
        return request({
            url: 'sys/ckgoods/getGoodsByParams',
            method: 'post',
            data
        })
    },


    /**
     * 查询sorts
     */
    getOutDepAndCate(data){
    return request({
        url: 'sys/ckgoods/getGoodsStorsByType/'+data,
        method: 'get',

    })
    },




    /**
     * 查询商品
     * @param data
     */
    queryGoodsWithPinyin(data) {
        return request({
            url: 'sys/ckgoods/queryPinyin/' +data,
            method: 'get',
        })
    },


    /**
     * 入库单入库
     */
    inDepBillReceive(data){
        return request ({
            url: 'sys/ckinbill/update' ,
            method: 'post',
            data
        })
    },

    /**
     * 查询未入库的入库单
     */
    queryInDepBills(data) {
        return request ({
            url: 'sys/ckinbill/listByInDepId/' + data,
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
    },







}
