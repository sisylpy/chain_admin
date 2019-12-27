import request from '@/utils/request'

export default {

    /**
     * 修改商品
     */
    saveStore(data) {
        return request({
            url: 'sys/ckstore/save',
            method: 'post',
            data
        })
    },

    /**
     * 获取分店列表
     */
    getStoreListAll() {

        return request({
            url: 'sys/ckstore/queryLineStore',
            method: 'get',
        })
    },
    /**
     * 获取分店列表
     */
    getStoreList(data) {

        return request({
            url: 'sys/ckstore/list',
            method: 'post',
            data
        })
    },





}
