<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <div class="content">
            <!--<div class="nav-tabs-justified">-->
            <div class="nav-tabs-custom no-border">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#orderApplicaton" data-toggle="tab" @click="changeType('orderApplicaton')">今日申请</a></li>
                    <li><a href="#outStocking" data-toggle="tab" @click="changeType('outStocking')">拣货单录入</a></li>
                    <li><a href="#deliveryOrder" data-toggle="tab" @click="changeType('deliveryOrder')">出货单</a></li>
                    <li><a href="#historyOrder" data-toggle="tab" @click="changeType('history')">历史申请</a></li>
                </ul>

                <div class="tab-content no-padding">
                    <div class="active tab-pane" id="orderApplicaton">
                        <OrderApplication/>
                    </div>

                    <div class="tab-pane" id="outStocking">
                        <EnterOutStock/>
                    </div>

                    <div class="tab-pane" id="deliveryOrder">
                        <DeliveryOrder/>
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
    import OrderApplication from '@/components/StoreManagement/Orders/OrderApplication'
    import EnterOutStock from '@/components/StoreManagement/Orders/EnterOutStock'
    import DeliveryOrder from '@/components/StoreManagement/Orders/DeliveryOrder'

    export default {
        name: "Order",
        components: {
            PageHeader,
            OrderApplication,
            EnterOutStock,
            DeliveryOrder,
        },
        methods:{

            //点击出货部门的三大业务
            changeType: function (data) {
                if (data === "orderApplicaton") {
                    this.$store.dispatch('orders/set_APPLYTYPE', data)
                } else if (data === "outStocking") {
                    this.$store.dispatch('orders/set_APPLYTYPE', data)
                }
                else if (data === "deliveryOrder") {
                    this.$store.dispatch('orders/set_APPLYTYPE', data)

                } else if (data === "history") {
                    this.$store.dispatch('orders/set_APPLYTYPE', data)
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

