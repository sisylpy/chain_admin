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
                                <!-- 出库部门的三大业务 -->
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#newApply" @click="changeType('newApply')"
                                                          data-toggle="tab">新申请</a></li>
                                    <li><a href="#outStocking" @click="changeType('outStocking')"
                                           data-toggle="tab">出库中</a></li>
                                    <li><a href="#pastApply" @click="changeType('pastApply')" data-toggle="tab">历史申请</a>
                                    </li>
                                </ul>

                                <div class="tab-content">

                                    <div class="active tab-pane" id="newApply">
                                        <NewApplyPanel :outDepName="depName"/>
                                    </div>
                                    <!-- /.tab-pane -->

                                    <div class="tab-pane" id="outStocking">
                                        <OutStockingPanel/>
                                    </div>

                                    <div class="tab-pane" id="pastApply">
                                        历史订货

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
    import api from '../../api/background/ckDep'

    import NewApplyPanel from '@/components/Out/OrderApplication/NewApplyPanel'
    import OutStockingPanel from '@/components/Out/OrderApplication/OutStockingPanel'

    export default {
        name: "OrderApplication",

        data() {
            return {
                outDepList: [],
                isactive: 0,
                page: 1,
                limit: 20,

                depName: "",
                depId: "",
                applyType: "",

            }
        },


        mounted() {
            var type = 1;
            api.getOutDepList(type).then(res => {
                if (res) {
                    this.outDepList = res.data;
                    this.depName = res.data[0].depName;
                    this.$store.state.orders.orders_depId  = res.data[0].depId;
                    this.$store.state.orders.applyType  = 'newApply';
                }
            })
        },

        components: {
            PageHeader,
            NewApplyPanel,
            OutStockingPanel,

        },

        methods: {

            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.$store.dispatch('orders/set_ORDERSDEPID', depId)

            },

            //点击出货部门的三大业务
            changeType: function (data) {
                if (data === "newApply") {
                    this.$store.dispatch('orders/set_APPLYTYPE', data)

                } else if (data === "outStocking") {
                    console.log("buzhidao???")
                    this.$store.dispatch('orders/set_APPLYTYPE', data)

                }

            }


        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

