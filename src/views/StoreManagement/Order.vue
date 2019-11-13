<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <div class="content">
            <!--<div class="nav-tabs-justified">-->
            <div class="nav-tabs-custom no-border">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#orderApplicaton" data-toggle="tab">今日申请</a></li>
                    <li><a href="#outStocking" data-toggle="tab">拣货单录入</a></li>
                    <li><a href="#deliveryOrder" data-toggle="tab">出货单</a></li>
                </ul>

                <div class="tab-content no-padding">
                    <div class="active tab-pane" id="orderApplicaton">
                        <OrderApplication/>
                    </div>

                    <div class="tab-pane" id="outStocking">
                        <EnterOutStock/>
                        <!--<NewBillPanel :depId="depId" :depName="depName"/>-->
                    </div>

                    <div class="tab-pane" id="deliveryOrder">
                        <DeliveryOrder/>
                        <!--<HistoryBillPanel :depId="depId" :depName="depName" ref="child"/>-->
                    </div>


                    <div class="tab-pane" id="stockCount">
                        stockCount
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

