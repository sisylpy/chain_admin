<template>
    <div class="">

        <PageHeader/>

        <section>
            <div class="content">
                <div class="row">

                    <div class="col-md-6" v-for="(item) in arr">

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
                                        <th>计划采购数量</th>
                                        <th>申请店铺</th>
                                        <th style="width: 80px"> </th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="(goods, index) in item.goodsList">
                                        <td>{{index + 1}}</td>
                                        <td>{{goods.goodsName}}</td>
                                        <td>{{goods.planPurchase}}{{goods.purStandardName}}</td>
                                        <td>
                                            <div class="flex-row">

                                            <div v-for="(applys, applysIndex) in goods.ckApplysEntities">
                                               {{applys.storeEntity.storeName}} {{applys.applyNumber}}{{goods.purStandardName}}
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
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/goodsManagement/plan'

    import NewBillPanel from '@/components/GoodsManagement/Products/NewBillPanel'
    import HistoryBillPanel from '@/components/GoodsManagement/Products/HistoryBillPanel'
    import ProductsStockPanel from '@/components/GoodsManagement/Products/ProductsStockPanel'

    export default {
        name: "Plan",
        components: {
            PageHeader,

        },
        data() {
            return {
                arr: []
            }
        },

        mounted() {
            api.planGoods("0").then(res => {
                if (res.data) {
                    console.log(res.data);
                    this.arr = res.data;
                }
            })

        },

        methods: {}
    }
</script>

<style scoped>
    .content {
        padding-left: 0;
    }

</style>

