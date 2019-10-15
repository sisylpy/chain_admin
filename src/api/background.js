import request from '@/utils/request'

export default {

    /**
     * 删除商品
     */
    getCateGoods() {
        console.log("is here?");

      return request({
          url: "sys/ckgoods/cateGoods",
          method: 'get',
      })
    },




}
