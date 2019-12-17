import request from '@/utils/request'

export default {

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
            url: 'sys/ckgoods/info/'+ data,
            method: 'get',
            // data
        })
    },



    /**
     * 获取指定商品列表
     * @param data
     */
    getCateGoodsList(data) {
        return request({
            url: 'sys/ckgoods/goodsList',
            method: 'post',
            data

        })
    },

    /**
     * 获取类别商品
     */
    getCateGoods() {
      return request({
          url: "sys/ckgoods/cateList",
          method: 'get',
      })
    },
    /**
     * 删除商品
     */
    deleteGoods(data) {
        return request({
            url: "sys/ckgoods/delete",
            method: 'post',
            data
        })
    },
    /**
     * upload
     */
    uploadExcel(data) {
        return request({
            url: 'sys/ckgoods/uploadExcel',
            method: 'post',
            data

        })
    }



}
