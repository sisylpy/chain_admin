import request from '@/utils/request'

export default {

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
