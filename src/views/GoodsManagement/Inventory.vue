<template>
    <div class="">

        <PageHeader/>

        <section>
            <div class="row">

                <div class="col-md-12">


                    <div class="content">
                        <div class="nav-tabs-justified">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#productsStock" data-toggle="tab" @click="changeStockPanel('stockGoods')">商品</a></li>
                                <li><a href="#inStock" data-toggle="tab"  @click="changeStockPanel('inStock')">商品入库</a></li>
                                <li><a href="#stockBill" data-toggle="tab"  @click="changeStockPanel('stockBill')">入库单据</a></li>
                                <li><a href="#stockCount" data-toggle="tab"  @click="changeStockPanel('stockCount')">盘库</a></li>
                            </ul>
                            <div class="tab-content">

                                <div class="active tab-pane" id="productsStock">
                                    <StockListPanel :stockType="stockType"/>
                                </div>
                                <!-- /.tab-pane -->

                                <div class="tab-pane" id="inStock">
                                    <NewBillPanel/>
                                </div>

                                <div class="tab-pane" id="stockBill">
                                    <!--<HistoryBillPanel :depId="depId" :depName="depName" ref="child"/>-->
                                    stockBill
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

    import NewBillPanel from '@/components/GoodsManagement/Inventory/NewBillPanel'
    import HistoryBillPanel from '@/components/GoodsManagement/Inventory/HistoryBillPanel'
    import StockListPanel from '@/components/GoodsManagement/Inventory/StockListPanel'

    export default {
        name: "Inventory",
        components: {
            PageHeader,
            NewBillPanel,
            HistoryBillPanel,
            StockListPanel,
        },

        mounted() {

        },
        data(){
            return{
                stockType: "stockGoods"

            }
    },

        methods: {

            //点击出货部门的三大业务
            changeStockPanel: function (data) {
                if (data === "stockGoods") {
                    this.stockType = data;
                } else if (data === "inStock") {
                    this.stockType = data;
                } else if (data === "stockBill") {
                    this.stockType = data;
                } else if (data === "stockCount") {
                    this.stockType = data;
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

