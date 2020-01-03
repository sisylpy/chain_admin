<template>


    <div class="row">

        <div class="col-md-2">
            <div class="box  box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">订货店铺</h3>
                </div>

                <div class="box-body no-padding">
                    <ul class="nav nav-pills nav-stacked">
                        <!--<li class="active"><a>Inbox</a></li>-->
                        <li v-for="(item,index) in applyStoreArr" v-bind:key="item.storeId" :id="item.storeId"
                            :class="isactive == index ? 'active' : '' "
                            @click='onclick(index, item.storeId,item.stroreName)'>

                            <a>{{item.storeName}}</a></li>
                    </ul>
                </div>
                <!-- /.box-body -->
            </div>

        </div>

        <div class="col-md-9" style="position: relative;">

            <div class="" style="float: left; height: 100%; width:100%;">
<!--<button class="btn btn-default btn-sm checkbox-toggle">aa</button>-->
                <div style="float: right;" v-if="currPage < totalPage">{{(currPage - 1) * limit + 1}}-{{limit *
                    currPage}}/{{totalCount}}
                    <div class="btn-group">

                        <button type="button" class="btn btn-default btn-sm" v-if="currPage > 1"
                                @click="lastPageApplys" style="background: gray;"><i
                                class="fa fa-chevron-left"
                                style="color:#fff;"></i>
                        </button>
                        <button type="button" class="btn btn-default btn-sm" v-else><i
                                class="fa fa-chevron-left"></i></button>

                        <button type="button" class="btn btn-default btn-sm" v-if="currPage < totalPage"
                                @click="getNextStoreApplys" style="background: gray;"><i
                                class="fa fa-chevron-right"
                                style="color:#fff;"></i>
                        </button>
                        <button type="button" class="btn btn-default btn-sm" v-else><i
                                class="fa fa-chevron-right"></i></button>

                    </div>
                    <!-- /.btn-group -->
                </div>

                <div  style="float: right;" v-else-if="currPage >= totalPage && applyArr.length > 0">
                    {{(currPage - 1) * limit + 1}}-{{totalCount}}/{{totalCount}}
                    <div class="btn-group">

                        <button type="button" class="btn btn-default btn-sm" v-if="currPage > 1"
                                @click="lastPageApplys" style="background: gray;"><i
                                class="fa fa-chevron-left"
                                style="color:#fff;"></i>
                        </button>
                        <button type="button" class="btn btn-default btn-sm" v-else>
                            <i class="fa fa-chevron-left"></i></button>

                        <button type="button" class="btn btn-default btn-sm" v-if="currPage < totalPage"
                                @click="getNextStoreApplys" style="background: gray;"><i
                                class="fa fa-chevron-right"
                                style="color:#fff;"></i>
                        </button>
                        <button type="button" class="btn btn-default btn-sm" v-else><i
                                class="fa fa-chevron-right"></i></button>
                    </div>
                    <!-- /.btn-group -->
                </div>

                <!-- /.pull-right -->
            </div>

            <div style="min-height: 400px; float: left; margin-top: 5px; width: 100%;">
                <table v-if="applyArr.length > 0" class="table table-hover  table-striped">
                    <tbody>
                    <tr v-for="(item, index) in  applyArr" v-bind:key="item.applyId">
                        <td style="width: 30px;">{{(currPage - 1) * limit + index + 1}}</td>
                        <td style="width: 120px;">{{item.ckGoodsEntity.goodsName}}</td>
                        <td style="width: 120px;">申请：{{item.applyNumber}} {{item.applyStandardname}}</td>
                        <td v-if="item.applyStatus === 2">
                            出库数量：{{item.stockRecordEntity.quantity}}{{item.ckGoodsEntity.purStandardName}}
                        </td>
                        <td v-else>出库数量：暂无</td>
                        <td v-if="item.applyStatus === 0"><span class="label label-primary">新申请</span></td>
                        <td v-else-if="item.applyStatus === 1 "><span class="label label-warning">出货中</span></td>
                        <td v-else-if="item.applyStatus ===2 "><span class="label label-success">出货完成</span></td>
                        <td>{{(item.applyTime).slice(12)}}</td>
                        <td v-if="item.applyStatus === 0">
                            <i class="fa fa-trash-o" @click="delApply(item.applyId)"></i>
                        </td>
                        <td v-else>
                        </td>
                    </tr>

                    </tbody>
                </table>
                <div style="margin-left: 10px;" v-else>今天没有订货！</div>
            </div>
        </div>


    </div>


</template>

<script>

    import api from '@/api/goodsManagement/todayOrder'

    export default {
        name: "StoreApplys",
        data() {
            return {
                isactive: 0,
                applyStoreArr: [],
                limit: 10,
                totalCount: '',
                currPage: 1,
                totalPage: '',
                applyArr: [],
                storeId: ""
            }

        },
        props: ['orderType'],


        watch: {

            orderType: function (newVal) {
                if (newVal == "today") {
                    this.getApplyStoreList();
                    this.getStoreApplys();
                }
            }

        },


        methods: {

            //获取订货店铺列表
            getApplyStoreList: function () {
                this.bus.$emit('loading', true);

                api.getTodayApplysStores()
                    .then(res => {
                        if (res.data) {
                            this.bus.$emit('loading', false);
                            this.applyStoreArr = res.data;
                            this.storeId = res.data[0].storeId;
                            this.getStoreApplys()
                        }
                    })
            },


            lastPageApplys: function () {
                this.currPage = this.currPage * 1 - 1;
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&storeId=" + this.storeId;
                this.getApplysByData(data);
            },

            getNextStoreApplys: function () {
                this.currPage = this.currPage * 1 + 1;
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&storeId=" + this.storeId;
                this.getApplysByData(data);
            },


            getStoreApplys: function () {
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&storeId=" + this.storeId;
                this.getApplysByData(data);
            },


            getApplysByData: function (data) {
                this.bus.$emit('loading', true);
                api.getApplysByStoreId(data)
                    .then(res => {
                        if (res) {
                            this.bus.$emit('loading', false);
                            this.applyArr = res.data.list;
                            this.currPage = res.data.currPage;
                            this.totalCount = res.data.totalCount;
                            this.currPage = res.data.currPage;
                            this.totalPage = res.data.totalPage;
                        }
                    })
            },

            delApply: function (id) {
                console.log(id);
                this.bus.$emit('loading', true);

                api.delateApplyById(id)
                    .then(res => {
                        if (res) {
                            this.bus.$emit('loading', false);

                            this.getStoreApplys();
                        }
                    })
            },


            next: function () {
                var inputting = $('.inputting')[0];
                $(inputting).parent().parent().parent().next().children().find('.goodsName').focus();
            },


            onclick: function (index, storeId) {
                this.storeId = storeId;
                this.isactive = index;
                this.currPage = 1;
                this.getStoreApplys();
            }


        }


    }

</script>

<style scoped>


</style>
