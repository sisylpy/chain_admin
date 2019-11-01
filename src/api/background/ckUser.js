import request from '@/utils/request'

export default {

    /**
     * 获取员工列表
     * @param data
     */
    getCkUserList(data) {
        return request({
            url: 'sys/ckuser/list',
            method: 'post',
            data

        })
    },

    /**
     * 获取指定商品列表
     * @param data
     */
    saveUser(data) {
        return request({
            url: 'sys/ckuser/save',
            method: 'post',
            data
        })
    },

    getRole() {
        return request({
            url: 'sys/role/listAll',
            method: 'get',

        })
    },






}
