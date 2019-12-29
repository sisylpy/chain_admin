<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">

                    <div class="box" style="max-height: 450px; overflow-y: auto;">

                        <div class="box-header with-border">
                            <h4 class="box-title">店铺: {{storeList.length}}家</h4>
                        </div>

                        <div class="box-body no-padding" >
                            <ul class="nav nav-pills nav-stacked" style="padding-bottom: 20px;">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in storeList" v-bind:key="item.storeId" :id="item.storeId"
                                    :class="isactive == index ? 'active' : '' "
                                    @click='onclick(index, item.storeId,item.storeName)'>

                                    <a>{{item.storeName}}</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>

                </div>

                <div class="col-md-10">

                    <div class="box box-primary">

                        <div class="box-header with-border">
                            <h3 class="box-title">{{storeName}}</h3>
                        </div>

                        <div class="box-body">
                            <div class="nav-tabs-justified">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#inBill" data-toggle="tab" @click="changeStoreType('inBill')">入库单</a></li>
                                    <li><a href="#storeGoods" data-toggle="tab" @click="changeStoreType('products')">产品</a></li>
                                    <li><a href="#turnover" data-toggle="tab" @click="changeStoreType('turnover')">营业额</a></li>
                                    <li><a href="#promotion" data-toggle="tab" @click="changeStoreType(stock)">库存</a></li>
                                </ul>
                                <div class="tab-content">


                                    <div class="tab-pane" id="inBill">
                                        <StoreGoodsPanel/>
                                    </div>

                                    <div class="tab-pane" id="storeGoods">
                                        <StoreGoodsPanel/>
                                    </div>

                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" id="turnover">
                                        <TurnoverPanel/>
                                    </div>

                                    <div class="tab-pane" id="promotion">
                                        promation

                                    </div>
                                </div>
                                <!-- /.tab-pane -->

                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </section>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../api/background/store'
    import apib from  '@/api/store/businessData'

    import StoreGoodsPanel from '@/components/StoreManagement/BusinessData/StoreGoodsPanel'
    import TurnoverPanel from '@/components/StoreManagement/BusinessData/TurnoverPanel'
    export default {
        name: "BusinessData",

        data() {
            return {
                storeList: [],
                isactive: 0,
                page: 1,
                limit: 20,
                type: 1,
                storeName: "",

            }
        },

        mounted() {

            api.getStoreListAll().then(res => {
                if (res) {
                    console.log(res)
                    this.storeList = res.data;
                    this.storeId = res.data[0].storeId;
                    this.storeName = res.data[0].storeName;
                    this.$store.state.store.storeId = res.data[0].storeId;
                    this.$store.state.store.storeName = res.data[0].storeName;
                    this.$store.state.store.storeType = 'inBill'

                    this.getThreeBill();


                }
            })
        },

        components: {
            PageHeader,
            StoreGoodsPanel,
            TurnoverPanel,
        },
        methods: {

            getThreeBill: function(){
                apib.getLastThreeStockBill(this.storeId)
                    .then(res => {
                        if(res) {
                            console.log(res.data)
                        }
                    })
            },

            //点击产品类别
            onclick(index, storeId, storeName) {
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;
                this.$store.state.store.storeId = storeId;
                this.$store.state.store.storeName = storeName;
                this.getThreeBill();


            },


            //点击出货部门的三大业务
            changeStoreType: function (data) {
                if (data === "inBill") {
                    this.$store.dispatch('store/set_storeTYPE', data)
                } else if (data === "products") {
                    this.$store.dispatch('store/set_storeTYPE', data)

                }
                else if (data === "turnover") {
                    this.$store.dispatch('store/set_storeTYPE', data)

                } else if (data === "stock") {
                    this.$store.dispatch('store/set_storeTYPE', data)
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

