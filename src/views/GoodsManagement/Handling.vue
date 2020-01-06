<template>
    <div class="">

        <PageHeader/>

        <section>
            <div class="row">

                <div class="col-md-12">


                    <div class="content">
                        <div class="nav-tabs-justified">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#handlingGoods" data-toggle="tab"
                                                      @click="changeHandlingPanel('handlingGoods')">加工商品</a></li>
                                <li><a href="#handlingOrder" data-toggle="tab"
                                       @click="changeHandlingPanel('handlingOrder')">采购单</a></li>
                                <li><a href="#handlingAnalyst" data-toggle="tab"
                                       @click="changeHandlingPanel('handlingAnalyst')">采购分析</a></li>
                            </ul>
                            <div class="tab-content">

                                <div class="active tab-pane" id="handlingGoods">
                                    <HandlingGoodsPanel :handlingType="handlingType"/>
                                </div>
                                <!-- /.tab-pane -->

                                <div class="tab-pane" id="handlingOrder">
                                    <HandlingOrder :handlingType="handlingType"/>
                                </div>

                                <div class="tab-pane" id="handlingAnalyst">
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

    import HandlingOrder from '@/components/GoodsManagement/Handling/HandlingOrder'
    import HandlingGoodsPanel from '@/components/GoodsManagement/Handling/HandlingGoodsPanel'

    export default {
        name: "Handling",
        components: {
            PageHeader,
            HandlingOrder,
            HandlingGoodsPanel,
        },
        data() {
            return {
                handlingType : "handlingGoods"
            }
        },

        mounted() {
            // this.$store.state.stock.stockType = 'productsStock';


        },

        methods: {

            //点击出货部门的三大业务
            changeHandlingPanel: function (data) {
                if (data === "handlingGoods") {
                    this.handlingType = "handlingGoods"
                } else if (data === "handlingOrder") {
                    this.handlingType = "handlingOrder"
                } else if (data === "handlingAnalyst") {
                    this.handlingType = "handlingAnalyst"
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

