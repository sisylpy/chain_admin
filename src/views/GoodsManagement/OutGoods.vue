<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <div class="content">
            <!--<div class="nav-tabs-justified">-->
            <div class="nav-tabs-custom no-border">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#prepare" data-toggle="tab" @click="changeType('prepare')">备货</a></li>
                    <li><a href="#weigh" data-toggle="tab" @click="changeType('weigh')">分拣</a></li>
                    <li><a href="#deliveryBill" data-toggle="tab" @click="changeType('deliveryBill')">出货单</a></li>
                    <li><a href="#historyOrder" data-toggle="tab" @click="changeType('history')">历史申请</a></li>
                </ul>

                <div class="tab-content no-padding">
                    <div class="active tab-pane" id="prepare">
                        <Prepare :outType="outType"/>
                    </div>

                    <div class="tab-pane" id="weigh">
                        <Weigh :outType="outType"/>
                    </div>

                    <div class="tab-pane" id="deliveryBill">
                        <deliveryBill :outType="outType"/>
                    </div>


                    <div class="tab-pane" id="stockCount">
                        stockCount
                    </div>
                    <div class="tab-pane" id="historyOrder">
                        historyOrder
                        <!--<OrderApplication/>-->

                    </div>

                </div>
            </div>

        </div>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import Prepare from '@/components/GoodsManagement/OutGoods/Prepare'
    import Weigh from '@/components/GoodsManagement/OutGoods/Weigh'
    import deliveryBill from '@/components/GoodsManagement/OutGoods/DeliveryBill'

    export default {
        name: "OutGoods",
        components: {
            PageHeader,
            Prepare,
            Weigh,
            deliveryBill,
        },
        data(){
          return {
              outType: "prepare"

          }
        },

        methods:{

            //点击出货部门的三大业务
            changeType: function (data) {
                if (data === "prepare") {
                    this.outType = "prepare";
                } else if (data === "weigh") {
                    this.outType = "weigh";
                }
                else if (data === "deliveryBill") {
                    this.outType = "deliveryBill";

                } else if (data === "history") {
                    this.outType = "history";
                }

            },






        },



    }
</script>

<style scoped>
    .category{
        padding-left: 0;
    }
    .tab-content>.active {
        display: block;
        border: none;
    }

</style>

