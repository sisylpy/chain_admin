<template>
    <div class="">


        <section>
            <div class="content">
                <div class="row">

                    <div class="col-md-12" v-for="(item) in arr">

                        <div class="box">
                            <div class="box-header  with-border">
                                <h3 class="box-title">{{item.fatherName}}</h3>

                                <!--<div class="box-tools">-->
                                <!--<ul class="pagination pagination-sm no-margin pull-right">-->
                                <!--<li><a href="#">&laquo;</a></li>-->

                                <!--</ul>-->
                                <!--</div>-->
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  no-padding with-border">
                                <table class="table with-border">
                                    <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>商品</th>
                                        <th>采购数量</th>
                                        <th>订货数量</th>
                                        <th>订货店铺</th>
                                        <th style="width: 80px"> </th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="(goods, index) in item.goodsList">
                                        <td>{{index + 1}}</td>
                                        <td>{{goods.goodsName}}</td>
                                        <td>{{goods.planPurchase}}</td>
                                        <td>{{goods.todayQuantity}}{{goods.applyStandardName}}</td>
                                        <td>
                                            <div class="flex-row">

                                            <div v-for="(applys, applysIndex) in goods.ckApplysEntities">
                                               {{applys.storeEntity.storeName}} {{applys.applyNumber}}{{goods.applyStandardName}}
                                            </div>
                                            </div>

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.box-body -->

                            <div class="box-footer">

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>
    </div>


</template>

<script>
    import api from '@/api/goodsManagement/purchase'


    export default {
        name: "HandlingOrder",
        components: {

        },
        data() {
            return {
                arr: [],
                goodsType: 1,

            }
        },
        props:['handlingType'],
        watch: {

            handlingType: function (newVal) {
                if (newVal == "handlingOrder") {
                    console.log("handlinglm????????")
                    this.getPurchaseOrder()
                }
            }


        },

        mounted() {


        },

        methods: {
            getPurchaseOrder:function () {
                this.bus.$emit('loading', true);
                api.purchaseGoods(this.goodsType).then(res => {
                    if (res.data) {
                        console.log(res.data);
                        this.arr = res.data;
                        this.bus.$emit('loading', false);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        padding-left: 0;
    }

</style>

