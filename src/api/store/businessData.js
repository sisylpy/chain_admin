import request from '@/utils/request'

export default {


    /**
     * 根据分店id获取最近三次出库单
     * @param data
     */
    getLastThreeStockBill(data) {
        return request({
            url: 'sys/ckstockbill/queryLastThreeInBillByStoreId/'+data,
            method: 'get',
        })
    },













}
