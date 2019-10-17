import request from '@/utils/request'

export default {

    /**
     * 修改商品
     */
    getStoreList(data) {

        return request({
            url: 'sys/ckstore/list',
            method: 'post',
            data
        })
    },





}
