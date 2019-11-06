<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">

                    <div class="box box-primary">

                        <div class="box-header with-border">
                            <h3 class="box-title">出货部门</h3>
                        </div>

                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in outDepList" v-bind:key="item.id" :id="item.outDepId"
                                    :class="isactive == index ? 'active' : '' "
                                    @click='onclick(index, item.depId, item.depName)'>

                                    <a>{{item.depName}}</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>

                </div>

                <div class="col-md-10">

                    <div class="box box-primary">

                        <div class="box-header with-border">
                            <h3 class="box-title">{{depName}}</h3>
                        </div>

                        <div class="box-body">
                            <div class="nav-tabs-justified">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#productsStock" data-toggle="tab">产品库存</a></li>
                                    <li><a href="#inStock" data-toggle="tab">产品入库</a></li>
                                    <li><a href="#stockLog" data-toggle="tab">出入库日志</a></li>
                                    <li><a href="#stockCount" data-toggle="tab">盘库</a></li>
                                </ul>
                                <div class="tab-content">

                                    <div class="active tab-pane" id="productsStock">
                                        <ProductsStockPanel :depId="depId" :depName="depName"/>
                                    </div>
                                    <!-- /.tab-pane -->

                                    <div class="tab-pane" id="inStock">
                                        <NewBillPanel :depId="depId" :depName="depName"/>
                                    </div>

                                    <div class="tab-pane" id="stockLog">
                                        <!--<HistoryBillPanel :depId="depId" :depName="depName" ref="child"/>-->
                                    </div>


                                    <div class="tab-pane" id="stockCount">
                                        stockCount

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
    // import api from '../../api/background/store'
    import api from '../../api/background/outDep'

    import NewBillPanel from '@/components/In/Products/NewBillPanel'
    import HistoryBillPanel from '@/components/In/Products/HistoryBillPanel'
    import ProductsStockPanel from '@/components/In/Products/ProductsStockPanel'

    export default {
        name: "Products",

        data() {
            return {
                outDepList: [],
                isactive: 0,
                depId: "",
                depName: "",
                page: 1,
                limit: 20,
                type: 1,


            }
        },

        mounted() {
            var type = 1;

            api.getOutDepList(type).then(res => {
                if (res) {
                    console.log(res);

                    this.outDepList = res.data;
                    this.depId = res.data[0].depId;

                    this.depName = res.data[0].depName;
                }
            })
        },

        components: {
            PageHeader,
            NewBillPanel,
            HistoryBillPanel,
            ProductsStockPanel,
        },
        methods: {

            //点击产品类别
            onclick(index, depId,depName) {
                this.isactive = index;
                this.depId = depId;
                this.depName = depName;

                this.$refs.child.searchBill(this.depId)

            },




        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

