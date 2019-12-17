<template>

    <div class="my_panel">

        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                        店铺申请
                    </h4>

                    <!--<div class="pull-right">-->
                        <!--<div class="dropdown ">-->
                            <!--<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"-->
                                    <!--data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">-->
                                <!--按销售额排名-->
                                <!--<span class="caret"></span>-->
                            <!--</button>-->
                            <!--<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">-->
                                <!--<li><a href="#">按销售额排名</a></li>-->
                                <!--<li><a href="#">按出货数量排名</a></li>-->
                                <!--<li><a href="#"></a></li>-->
                                <!--<li role="separator" class="divider"></li>-->
                                <!--<li><a href="#">Separated link</a></li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>


        <div class="panel-body no-padding">
            <div class="box-body table-responsive no-padding">

                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>商品</th>
                        <th>申请数量</th>
                        <th>状态</th>
                        <th>出货数量</th>
                        <th>出货单价</th>
                        <th>出货成本</th>
                    </tr>
                    <tr v-for="(item, index) in  applyArr">
                        <td>{{index + 1}}</td>
                        <td>{{item.ckGoodsEntity.goodsName}}</td>
                        <td>{{item.applyNumber}} {{item.applyStandardname}}</td>
                        <td v-if="item.applyStatus === 0">新申请</td>
                        <td v-else-if="item.applyStatus === 1 ">出货中</td>
                        <td v-else-if="item.applyStatus ===2 ">出货完成</td>
                        <td v-if="item.applyStatus > 0">{{}}</td>
                        <td v-if="item.applyStatus > 0">{{}}</td>
                        <td v-if="item.applyStatus > 0">{{}}</td>
                    </tr>

                    </tbody>
                </table>

            </div>

        </div>

        </div>


    </div>




</template>

<script>

  import api from '../../../api/store/Store'
    export default {
        name: "StoreOrderPanel",
        data() {
            return {
                applyArr: [],

            }
        },
        computed: {
            storeId: {
                get() {
                    return this.$store.state.store.storeId
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                }
            },
            storeName: {
                get() {
                    return this.$store.state.store.storeName
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },

            },
            storeType: {
                get() {
                    return this.$store.state.store.storeType
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },
            },

        },

        watch: {
            storeId: function (newVal, oldVal) {
                this.storeId = newVal;
                if (this.storeType === "storeOrders") {
                    this.getStoreApplys();
                }
            },

            storeName: function (newVal, oldVal) {
                this.storeName = newVal;
            },
            storeType: function (newVal, oldVal) {
                if (newVal === "storeOrders") {

                }
            },


        },

        mounted() {

            this.getStoreApplys();

        },

        methods: {

            getStoreApplys:function () {
                console.log(this.storeId)

                api.getApplysByStoreId(this.storeId)
                    .then(res => {
                        if(res) {
                            this.applyArr = res.data
                        }
                    })
            }

        },



    }

</script>

<style scoped>
    /*.content{*/
    /*background: #fff;*/
    /*}*/


    .panel-title {
        height: 40px;
    }




</style>
