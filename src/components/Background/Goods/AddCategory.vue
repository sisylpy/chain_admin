<template>

    <div >
        <PageHeader/>

        <section class="content container-fluid">

            <div class="panel panel-default" id="rrapp" v-cloak>
                <div class="panel-heading">添加{{typeName}}类别</div>
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-4 control-label">{{typeName}}类别名称</div>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="ckGoods.goodsName" placeholder="类别名称" value="name"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-4 control-label">商品排序</div>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="ckGoods.gSort" placeholder="商品排序" value="sort"/>
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
    import api from '../../../api/background/goods'
    import PageHeader from '@/components/PageHeader.vue'

    export default {
        name: "addCategory",
        data(){
          return{
              ckGoods: {
                  fatherId: 0,
                  type: this.$route.params.type

              },
              typeName: this.$route.params.typeName
          }
        },

        components:{
            PageHeader,
        },

        methods:{

            saveOrUpdate: function () {
                console.log("saveOrUpdate api ")
                console.log(this.ckGoods);
                console.log(JSON.stringify(this.ckGoods))

                api.saveGoods(this.ckGoods).then(res => {
                    this.$router.go(-1)
                })

            },

            back: function () {
                console.log("back");

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
