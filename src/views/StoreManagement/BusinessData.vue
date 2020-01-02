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
                                    <li><a href="#storeGoods" data-toggle="tab" @click="changeStoreType('storeGoods')">产品</a></li>
                                    <li><a href="#turnover" data-toggle="tab" @click="changeStoreType('turnover')">营业额</a></li>
                                    <li><a href="#stock" data-toggle="tab" @click="changeStoreType(stock)">库存</a></li>
                                </ul>
                                <div class="tab-content">


                                    <div class="tab-pane active" id="inBill">
                                        <InBill :storeId="storeId" :storeName="storeName" :businessType="businessType"/>
                                    </div>

                                    <div class="tab-pane" id="storeGoods">
                                        <StoreGoodsPanel :storeId="storeId" :storeName="storeName" :businessType="businessType"/>
                                    </div>

                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" id="turnover">
                                        <TurnoverPanel/>
                                    </div>

                                    <div class="tab-pane" id="stock">
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

    import StoreGoodsPanel from '@/components/StoreManagement/BusinessData/StoreGoodsPanel'
    import TurnoverPanel from '@/components/StoreManagement/BusinessData/TurnoverPanel'
    import InBill from '@/components/StoreManagement/BusinessData/InBill'
    export default {
        name: "BusinessData",

        data() {
            return {
                storeList: [],
                isactive: 0,
                storeId: "",
                storeName: "",
                businessType: "inBill"

            }
        },

        mounted() {

            api.getStoreListAll().then(res => {
                if (res) {
                    console.log(res)
                    this.storeList = res.data;
                    this.storeId = res.data[0].storeId;
                    this.storeName = res.data[0].storeName;


                }
            })
        },

        components: {
            PageHeader,
            StoreGoodsPanel,
            TurnoverPanel,
            InBill,
        },
        methods: {

            //点击产品类别
            onclick(index, storeId, storeName) {
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;
                // this.$store.state.store.storeId = storeId;
                // this.$store.state.store.storeName = storeName;


            },


            //点击出货部门的三大业务
            changeStoreType: function (data) {
                if (data === "inBill") {
                    this.businessType = "inBill"
                } else if (data === "storeGoods") {
                    this.businessType = "storeGoods"
                }
                else if (data === "turnover") {
                    this.businessType = "turnover"
                } else if (data === "stock") {
                    this.businessType = "stock"
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

