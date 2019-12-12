<template>
    <div class="">

        <PageHeader/>

        <section>
            <div class="row">

                <div class="col-md-12">


                    <div class="content">
                        <div class="nav-tabs-justified">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#productsStock" data-toggle="tab" @click="changeStockPanel('productsStock')">产品库存</a></li>
                                <li><a href="#inStock" data-toggle="tab"  @click="changeStockPanel('inStock')">产品入库</a></li>
                                <li><a href="#stockBill" data-toggle="tab"  @click="changeStockPanel('stockBill')">入库单据</a></li>
                                <li><a href="#stockLog" data-toggle="tab"  @click="changeStockPanel('stockLog')">店铺出货日志</a></li>
                                <li><a href="#stockCount" data-toggle="tab"  @click="changeStockPanel('stockCount')">盘库</a></li>
                            </ul>
                            <div class="tab-content">

                                <div class="active tab-pane" id="productsStock">
                                    <ProductsStockPanel/>
                                </div>
                                <!-- /.tab-pane -->

                                <div class="tab-pane" id="inStock">
                                    <NewBillPanel/>
                                </div>

                                <div class="tab-pane" id="stockBill">
                                    <!--<HistoryBillPanel :depId="depId" :depName="depName" ref="child"/>-->
                                    stockBill
                                </div>

                                <div class="tab-pane" id="stockLog">
                                    <!--<HistoryBillPanel :depId="depId" :depName="depName" ref="child"/>-->
                                    stockLog
                                </div>


                                <div class="tab-pane" id="stockCount">
                                    stockCount
                                </div>


                            </div>
                            <!-- /.tab-pane -->


                        </div>

                    </div>

                    <!--</div>-->

                </div>


            </div>
        </section>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'

    import NewBillPanel from '@/components/GoodsManagement/Products/NewBillPanel'
    import HistoryBillPanel from '@/components/GoodsManagement/Products/HistoryBillPanel'
    import ProductsStockPanel from '@/components/GoodsManagement/Products/ProductsStockPanel'

    export default {
        name: "Products",
        components: {
            PageHeader,
            NewBillPanel,
            HistoryBillPanel,
            ProductsStockPanel,
        },

        mounted() {
            this.$store.state.stock.stockType = 'productsStock';

        },

        methods: {

            //点击出货部门的三大业务
            changeStockPanel: function (data) {
                if (data === "productsStock") {
                    this.$store.dispatch('stock/set_STOCKTYPE', data)
                } else if (data === "inStock") {
                    this.$store.dispatch('stock/set_STOCKTYPE', data)
                }
                else if (data === "stockBill") {
                    this.$store.dispatch('stock/set_STOCKTYPE', data)
                } else if (data === "stockLog") {
                    this.$store.dispatch('stock/set_STOCKTYPE', data)
                } else if (data === "stockCount") {
                    this.$store.dispatch('stock/set_STOCKTYPE', data)
                }
            },


        }
    }
</script>

<style scoped>
    .content {
        padding-left: 0;
    }

</style>

