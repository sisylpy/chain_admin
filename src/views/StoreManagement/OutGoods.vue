<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <div class="content">
            <!--<div class="nav-tabs-justified">-->
            <div class="nav-tabs-custom no-border">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#orderApplicaton" data-toggle="tab" @click="changeType('orderApplicaton')">订货申请</a></li>
                    <li><a href="#outStocking" data-toggle="tab" @click="changeType('outStocking')">拣货单录入</a></li>
                    <li><a href="#deliveryOrder" data-toggle="tab" @click="changeType('deliveryOrder')">出货单</a></li>
                    <li><a href="#historyOrder" data-toggle="tab" @click="changeType('history')">历史申请</a></li>
                </ul>

                <div class="tab-content no-padding">
                    <div class="active tab-pane" id="orderApplicaton">
                        <NewApplyTable :outType="outType"/>
                    </div>

                    <div class="tab-pane" id="outStocking">
                        <OutStockingTable :outType="outType"/>
                    </div>

                    <div class="tab-pane" id="deliveryOrder">
                        <DeliveryTable :outType="outType"/>
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
    import NewApplyTable from '@/components/StoreManagement/Orders/Table/NewApplyTable'
    import OutStockingTable from '@/components/StoreManagement/Orders/Table/OutStockingTable'
    import DeliveryTable from '@/components/StoreManagement/Orders/Table/DeliveryTable'

    export default {
        name: "OutGoods",
        components: {
            PageHeader,
            NewApplyTable,
            OutStockingTable,
            DeliveryTable,
        },
        data(){
          return {
              outType: "orderApplicaton"

          }
        },

        methods:{

            //点击出货部门的三大业务
            changeType: function (data) {
                if (data === "orderApplicaton") {
                    this.outType = "orderApplicaton";
                } else if (data === "outStocking") {
                    this.outType = "outStocking";
                }
                else if (data === "deliveryOrder") {
                    this.outType = "deliveryOrder";

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

