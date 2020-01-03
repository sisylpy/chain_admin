<template>
    <div class="">

        <PageHeader/>

        <section>
            <div class="row">

                <div class="col-md-12">


                    <div class="content">
                        <div class="nav-tabs-justified">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#dailyGoods" data-toggle="tab"
                                                      @click="changeDailyPanel('dailyGoods')">日采产品</a></li>
                                <li><a href="#purchaseOrder" data-toggle="tab"
                                       @click="changeDailyPanel('purchaseOrder')">采购单</a></li>
                                <li><a href="#purchaseAnalyst" data-toggle="tab"
                                       @click="changeDailyPanel('purchaseAnalyst')">采购分析</a></li>
                            </ul>
                            <div class="tab-content">

                                <div class="active tab-pane" id="dailyGoods">
                                    <DailyGoodsPanel :dailyType="dailyType"/>
                                </div>
                                <!-- /.tab-pane -->

                                <div class="tab-pane" id="purchaseOrder">
                                    <PurchaseOrder :dailyType="dailyType"/>
                                </div>

                                <div class="tab-pane" id="purchaseAnalyst">
                                    <!--<HistoryBillPanel :depId="depId" :depName="depName" ref="child"/>-->
                                    stockBill
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

    import PurchaseOrder from '@/components/GoodsManagement/Daily/PurchaseOrder'
    import DailyGoodsPanel from '@/components/GoodsManagement/Daily/DailyGoodsPanel'

    export default {
        name: "Daily",
        components: {
            PageHeader,
            PurchaseOrder,
            DailyGoodsPanel,
        },
        data() {
            return {
                dailyType : "dailyGoods"
            }
        },

        mounted() {
            // this.$store.state.stock.stockType = 'productsStock';


        },

        methods: {

            //点击出货部门的三大业务
            changeDailyPanel: function (data) {
                console.log(data)
                if (data === "dailyGoods") {
                    this.dailyType = "dailyGoods"
                } else if (data === "purchaseOrder") {
                    this.dailyType = "purchaseOrder"
                } else if (data === "purchaseAnalyst") {
                    this.dailyType = "purchaseOrder"
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

