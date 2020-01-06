<template>
    <div class="">

        <PageHeader/>

        <div class="content">

            <div class="nav-tabs-custom no-border">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#replaceOrder" data-toggle="tab" @click='changeTodayOrderType("replace")'>代下单</a></li>
                    <li><a href="#storeOrder" data-toggle="tab" @click='changeTodayOrderType("today")'>今日申请</a></li>
                </ul>


            <div class="tab-content  no-border">

                <div class="active tab-pane no-border" id="replaceOrder">
                    <ReplaceOrder :orderType="orderType"/>

                </div>

                <div class="tab-pane no-border table-responsive mailbox-messages " id="storeOrder">
                    <StoreApplys :orderType="orderType"/>
                </div>

            </div>
            </div>

        </div>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import ReplaceOrder from '@/components/GoodsManagement/TodayOrder/ReplaceOrder'
    import StoreApplys from '@/components/GoodsManagement/TodayOrder/StoreApplys'


    export default {
        name: "TodayOrder",

        data() {
            return {
                orderType: "replace"

            }
        },

        mounted() {


        },

        components: {
            PageHeader,
            ReplaceOrder,
            StoreApplys

        },
        methods: {

            changeTodayOrderType: function(e){
                if(e == "replace"){
                    this.orderType = "replace"
                }else if( e == "today"){
                    this.orderType = "today"
                }

            },




        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

