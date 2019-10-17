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
     * 获取类别商品
     */
    getCateGoods() {
      return request({
          url: "sys/ckgoods/cateGoods",
          method: 'get',
      })
    },
    /**
     * 获取指定商品列表
     * @param data
     */
    getTypeGoods(data) {
        return request({
            url: 'sys/ckgoods/typeGoods',
            method: 'post',
            data

        })
    },
    /**
     * 删除商品
     */
    deleteGoods(data) {
        console.log(data);

        return request({
            url: "sys/ckgoods/delete",
            method: 'post',
            data
        })
    },



}
