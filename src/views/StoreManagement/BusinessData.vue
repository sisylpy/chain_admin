<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">

                    <div class="box box-primary">

                        <div class="box-header with-border">
                            <h3 class="box-title">店铺</h3>
                        </div>

                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
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
                            <h3 class="box-title">美林湾华联</h3>
                        </div>

                        <div class="box-body">
                            <div class="nav-tabs-justified">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#storeGoods" data-toggle="tab">产品</a></li>
                                    <li><a href="#turnover" data-toggle="tab">营业额</a></li>
                                    <li><a href="#promotion" data-toggle="tab">库存</a></li>
                                </ul>
                                <div class="tab-content">

                                    <div class="active tab-pane" id="storeGoods">
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
    import StoreGoodsPanel from '@/components/StoreManagement/BusinessData/StoreGoodsPanel'
    import TurnoverPanel from '@/components/StoreManagement/BusinessData/TurnoverPanel'

    export default {
        name: "BusinessData",

        data() {
            return {
                storeList: [],
                isactive: 0,
                fatherId: "",
                fatherName: "",
                page: 1,
                limit: 20,
                type: 1,


            }
        },

        mounted() {
            var data = "page=" + this.page + "&limit=" + this.limit;
            api.getStoreList(data).then(res => {
                if (res) {
                    console.log(res);

                    this.storeList = res.page.list;
                    // this.fatherId = res.data[0].goodsId;
                    // console.log(res.data[0].goodsName);

                    // this.fatherName = res.data[0].goodsName;
                }
            })
        },

        components: {
            PageHeader,
            StoreGoodsPanel,
            TurnoverPanel,
        },
        methods: {

            //点击产品类别
            onclick(index, storeId, storeName) {
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;
            },






        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

