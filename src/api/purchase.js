import request from '@/utils/request'

export default {

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


    /**
     * 修改商品
     */
    saveGoods(data) {
        return request({
            url: 'sys/ckgoods/save',
            method: 'post',
            data
        })
    },

    /**
     * 修改商品
     */
    updateGoods(data) {
      return request({
          url: 'sys/ckgoods/update',
          method: 'post',
          data
      })
    },

    /**
     * 获取选中商品信息
     */
    getGoodsInfo(data) {
        return request({
            url: 'sys/ckgoods/info/'+data,
            method: 'get',
            // data
        })
    },

    /**
     * 获取指定商品列表
     * @param data
     */
    getAssignGoods(data) {
        return request({
            url: 'sys/ckgoods/typeGoods',
            method: 'post',
            data

        })
    },

    /**
     * 获取指定商品列表
     * @param data
     */
    getCateGoodsList(data) {
        return request({
            url: 'sys/ckgoods/cateGoodsList',
            method: 'post',
            data

        })
    },


}
