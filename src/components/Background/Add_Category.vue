<template>

    <div >
        <PageHeader/>

        <section class="content container-fluid">

            <div class="panel panel-default" id="rrapp" v-cloak>
                <div class="panel-heading">添加新商品类别</div>
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-2 control-label">商品类别名称</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckGoods.goodsName" placeholder="商品类别名称" value="name"/>
                        </div>
                    </div>



                    <div class="form-group">
                        <div class="col-sm-2 control-label"></div>
                        <input type="button" class="btn btn-primary" @click="saveOrUpdate" value="确定" />
                        &nbsp;&nbsp;<input type="button" class="btn btn-warning" @click="back" value="返回"/>
                    </div>
                </form>
            </div>
        </section>

    </div>



</template>

<script>
    import api from '../../api/purchase'
    import PageHeader from '@/components/PageHeader.vue'

    export default {
        name: "add_Category",
        data(){
          return{
              ckGoods: {
                  fatherId: 0,

              }
          }
        },

        components:{
            PageHeader,
        },

        methods:{

            saveOrUpdate: function (event) {
                console.log("saveOrUpdate api ")

                api.saveGoods(JSON.stringify(this.ckGoods)).then(res => {
                    this.$router.go(-1)

                })




            },

            back: function (event) {
                console.log("back");

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
