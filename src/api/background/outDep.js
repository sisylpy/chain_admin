import request from '@/utils/request'

export default {

    /**
     * 获取出货部门列表
     * @param data
     */
    getOutDepList() {
        return request({
            url: 'sys/ckoutdep/list',
            method: 'get',

        })
    },
    /**
     * 保存出货部门
     */
    saveOutDep(data) {
        return request({
            url: 'sys/ckoutdep/save',
            method: 'post',
            data
        })
    }




}
