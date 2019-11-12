import request from '@/utils/request'

export default {




    /**
     *
     */
    getPirntMax() {
        return request({
            url: 'sys/ckapplys/getPintMax',
            method: 'get',
        })
    },


    /**
     *
     */
    getPrintTimes() {
        return request({
            url: 'sys/ckapplys/getPintTimes',
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


    /**
     *
     */
    outDepQuerySorts(data) {
        return request({
            url: 'sys/ckapplys/outDepQuerySorts',
            method: 'post',
            data
        })
    },

    /**
     * 获取订单申请状态列表
     * @param data
     */
    outDepQueryApplys(data) {
        return request({
            url: 'sys/ckapplys/outDepQueryApplys',
            method: 'post',
            data
        })
    },











}
