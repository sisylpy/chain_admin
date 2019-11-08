import request from '@/utils/request'

export default {

    /**
     * 获取出货部门列表
     * @param data
     */
    getOutDepList(data) {
        return request({
            url: 'sys/ckdep/list/'+ data,
            method: 'get',
        })
    },
    /**
     * 保存出货部门
     */
    saveOutDep(data) {
        return request({
            url: 'sys/ckdep/save',
            method: 'post',
            data
        })
    }




}
