<template>
    <div class="">

        <PageHeader/>

        <section>

            <div class="nav-tabs-custom no-border pull-left" style="width: 100%;">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#replaceOrder" data-toggle="tab" @click='changeTodayOrderType("replace")'>代下单</a></li>
                    <li><a href="#storeOrder" data-toggle="tab" @click='changeTodayOrderType("today")'>今日申请</a></li>
                </ul>
            </div>

            <div class="tab-content  no-border" style="float: left; width: 100%;">

                <div class="active tab-pane no-border" id="replaceOrder" style="padding: 20px;">
                    <ReplaceOrder :orderType="orderType"/>

                </div>

                <div class="tab-pane no-border table-responsive mailbox-messages " id="storeOrder">
                    <StoreApplys :orderType="orderType"/>

                </div>



            </div>


        </section>
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

