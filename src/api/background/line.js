import request from '@/utils/request'

export default {

    /**
     * 获取指定商品列表
     * @param data
     */
    getLineList(data) {
        return request({
            url: 'sys/ckline/list',
            method: 'post',
            data

        })
    },

    /**
     * 获取指定商品列表
     * @param data
     */
    save(data) {
        return request({
            url: 'sys/ckline/save',
            method: 'post',
            data

        })
    },




}
