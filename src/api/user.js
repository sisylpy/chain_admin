import request from '@/utils/request'

export default {
    // 登录
    login(data) {
        return request({
            url: '/sys/login',
            method: 'post',
            data
        })
    },
    // 获取用户信息
    getUserInfo() {
        return request({
            url: '/sys/user/info',
            method: 'get'
        })
    },

    getSideBarList() {
        return request({
            url: '/sys/menu/user',
            method: 'get',
        })
    },

    logout() {
        return request({
            url: '/sys/out',
            method: 'get',

        })
    }


}
